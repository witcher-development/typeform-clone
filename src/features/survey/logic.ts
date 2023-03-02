import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';

import { queryClient } from '@store';

import * as SurveyModel from './model';
import * as SurveyApi from './client';


const surveysKey = (id?: string) => ['surveys', id];

export const useGetSurveys = () => useQuery(surveysKey(), () => SurveyApi.getAll());

export const useGetSurvey = (id: string) => useQuery(
	surveysKey(id),
	() => SurveyApi.getOne(id),
	{
		initialData: () => queryClient.getQueryData<SurveyModel.Survey[]>(surveysKey())?.find((s) => s.id === id)
	}
);

export const useCreateSurvey = () => {
	const { mutate } = useMutation<
		SurveyModel.Survey,
		AxiosError,
		SurveyApi.CreateProps
	>({
		mutationFn: SurveyApi.create,
		onMutate: async ({ survey }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: surveysKey() });

			// Optimistically update to the new value
			queryClient.setQueryData<SurveyModel.Survey[]>(
				surveysKey(),
				(old) => [...(old || []), survey]
			);
			queryClient.setQueryData<SurveyModel.Survey>(
				surveysKey(survey.id),
				survey
			);
		},
		onError: (err, vars, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}

			if (err.response?.status !== 409) {
				// TODO: handle error
			}

			// TODO: handle duplicated ID case

			throw new Error('Unhandled survey create request error');
		},
	});

	const survey = SurveyModel.getNewSurvey();
	return () => {
		mutate({ survey });
		return survey;
	};
};

export const useUpdateSurvey = (id: string) => {
	const { mutate } = useMutation<
		SurveyModel.Survey,
		AxiosError,
		SurveyApi.UpdateProps
	>({
		mutationFn: SurveyApi.update,
		mutationKey: surveysKey(id),
		onMutate: async ({ survey }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: surveysKey() });
			await queryClient.cancelQueries({ queryKey: surveysKey(id) });

			// Optimistically update to the new value
			queryClient.setQueryData<SurveyModel.Survey[]>(
				surveysKey(),
				(old) => (old || []).map((s) => s.id === survey.id ? survey : s)
			);
			queryClient.setQueryData<SurveyModel.Survey>(
				surveysKey(id),
				survey
			);
		},
		onError: () => {
			// TODO: handle error

			throw new Error('Unhandled survey update request error');
		},
	});

	return (survey: SurveyModel.Survey) => mutate({ survey });
};

export const useRemoveSurvey = () => {
	const { mutate } = useMutation<
		unknown,
		AxiosError,
		SurveyApi.RemoveProps,
		{ surveysBackup: SurveyModel.Survey[] }
	>({
		mutationFn: SurveyApi.remove,
		mutationKey: surveysKey(),
		onMutate: async ({ id }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: surveysKey() });
			const surveysBackup = queryClient.getQueryData(surveysKey());

			// Optimistic removal
			queryClient.setQueryData<SurveyModel.Survey[]>(
				surveysKey(),
				(old) => (old || []).filter((s) => s.id !== id)
			);

			return { surveysBackup };
		},
		onError: (err, vars, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}

			// Restore from backup
			queryClient.setQueryData<SurveyModel.Survey[]>(
				surveysKey(),
				context.surveysBackup
			);
			queryClient.invalidateQueries(surveysKey());

			// TODO: Additionally show some toast
		},
	} as UseMutationOptions<unknown, AxiosError, SurveyApi.RemoveProps, { surveysBackup: SurveyModel.Survey[] }>);

	return (id: string) =>
		mutate({ id });
};

