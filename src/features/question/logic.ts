import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { queryClient } from '@store';

import * as QuestionModel from './model';
import * as QuestionApi from './client';
import { QuestionContentModel } from './QuestionContent';


export const questionsKey = (surveyId: string, id?: string) => [surveyId, 'questions', id];

export const setQuestionsData = (surveyId: string, questions: QuestionModel.Question[]) => {
	queryClient.setQueryData<QuestionModel.Question[]>(
		questionsKey(surveyId),
		questions
	);
};

export const useGetQuestions = (surveyId: string) =>
	useQuery(questionsKey(surveyId), () => QuestionApi.getAll(surveyId));

export const useCreateQuestion = (surveyId: string) => {
	const { mutate } = useMutation<
		QuestionModel.Question,
		AxiosError,
		QuestionApi.CreateProps,
		{ question: QuestionModel.Question }
	>({
		mutationFn: QuestionApi.create,
		onMutate: async ({ surveyId, question }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: questionsKey(surveyId) });

			// Optimistically update to the new value
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) => [...(old || []), question]
			);

			// Return a context object with the snapshotted value
			return { question };
		},
		onError: (err, vars, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}

			if (err.response?.status !== 409) {
				// TODO: handle error
			}

			// TODO: handle duplicated ID case

			throw new Error('Unhandled question create request error');
		},
	});

	return (type: QuestionContentModel.ContentTypes) =>
		mutate({ surveyId, question: QuestionModel.getNewQuestion(type) });
};

export const useUpdateQuestion = (surveyId: string) => {
	const { mutate } = useMutation<
		QuestionModel.Question,
		AxiosError,
		QuestionApi.UpdateProps
	>({
		mutationFn: QuestionApi.update,
		mutationKey: questionsKey(surveyId),
		onMutate: async ({ surveyId, question }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: questionsKey(surveyId) });

			// Optimistically update to the new value
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) => (old || []).map((q) => q.id === question.id ? question : q)
			);
		},
		onError: () => {
			// TODO: handle error

			throw new Error('Unhandled question update request error');
		},
	});

	return (question: QuestionModel.Question) =>
		mutate({ surveyId, question });
};

export const useRemoveQuestion = (surveyId: string) => {
	const { mutate } = useMutation<
		unknown,
		AxiosError,
		QuestionApi.RemoveProps,
		{ questionsBackup: QuestionModel.Question[] }
	>({
		mutationFn: QuestionApi.remove,
		mutationKey: questionsKey(surveyId),
		onMutate: async ({ surveyId, id }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: questionsKey(surveyId) });
			const questionsBackup = queryClient.getQueryData(questionsKey(surveyId));

			// Optimistic removal
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) => (old || []).filter((q) => q.id !== id)
			);

			return { questionsBackup };
		},
		onError: (err, vars, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}

			// Restore from backup
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				context.questionsBackup
			);
			queryClient.invalidateQueries(questionsKey(surveyId));

			// TODO: Additionally show some toast
		},
	} as UseMutationOptions<unknown, AxiosError, QuestionApi.RemoveProps, { questionsBackup: QuestionModel.Question[] }>);

	return (id: string) =>
		mutate({ surveyId, id });
};
