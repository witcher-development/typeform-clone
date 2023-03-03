import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';

import { useNavigate } from '@common/Navigation';
import { queryClient } from '@store';
import { QuestionLogic } from '@question';


import * as SurveyModel from './model';
import * as SurveyApi from './client';
import { isSurvey } from './validators';


const surveysKey = (id?: string) => ['surveys', id];

const setSurveyData = (surveyId: string, survey: SurveyModel.Survey) => {
	queryClient.setQueryData<SurveyModel.Survey>(
		surveysKey(surveyId),
		survey
	);
};

export const useGetSurveys = () => useQuery(surveysKey(), () => SurveyApi.getAll());

export const useGetSurvey = (id: string) => useQuery(
	surveysKey(id),
	() => SurveyApi.getOne(id),
	{
		initialData: () => queryClient.getQueryData<SurveyModel.Survey[]>(surveysKey())?.find((s) => s.id === id)
	}
);

export const useCreateSurvey = () => {
	const redirect = useNavigate();

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
			setSurveyData(survey.id, survey);
			QuestionLogic.setQuestionsData(survey.id, []);

			setTimeout(() => {
				redirect(`/surveys/${survey.id}`);
			}, 200);
		},
		onError: (err, { survey: optimisticSurvey }) => {
			if (!err.response || err.response?.status !== 409) {
				// TODO: handle error
				return;
			}

			const errorData = err.response.data;
			if (!errorData || !errorData.newId || !errorData.newSurvey) {
				throw new Error('Server didnt send new version of survey after conflict occurred');
			}

			const { newSurvey } = errorData;
			if (!isSurvey(newSurvey)) {
				throw new Error('Version of survey received from server to solve conflict isnt a valid survey');
			}
			queryClient.setQueryData<SurveyModel.Survey[]>(
				surveysKey(),
				(old) => (old || []).map((s) => s.id === optimisticSurvey.id ? newSurvey : s)
			);
			setSurveyData(newSurvey.id, newSurvey);
			QuestionLogic.setQuestionsData(newSurvey.id, []);
			queryClient.removeQueries({ exact: true, queryKey: surveysKey(optimisticSurvey.id) });

			setTimeout(() => {
				if (window.location.pathname.includes(optimisticSurvey.id)) {
					redirect(`/surveys/${newSurvey.id}`);
				}
			}, 200);
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

