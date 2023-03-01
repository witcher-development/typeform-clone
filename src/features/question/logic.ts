import { logger } from 'react-query/types/react/logger';
import { v4 as uuid } from 'uuid';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '@store';

import * as QuestionModel from './model';
import * as QuestionApi from './client';
import { QuestionContentModel } from './QuestionContent';


const questionsKey = (surveyId: string, id?: string) => [surveyId, 'questions', id];

export const useGetQuestions = (surveyId: string) =>
	useQuery(questionsKey(surveyId), () => QuestionApi.getAll(surveyId));

export const useCreateQuestion = (surveyId: string) => {
	const { mutate } = useMutation<
		QuestionModel.Question,
		unknown,
		QuestionApi.CreateProps,
		{ optimisticQuestion: QuestionModel.Question }
	>({
		mutationFn: QuestionApi.create,
		onMutate: async ({ surveyId, newQuestion }) => {
			// Cancel any outgoing refetches, so they don't overwrite our optimistic update
			await queryClient.cancelQueries({ queryKey: questionsKey(surveyId) });

			// Create optimistic question
			const optimisticQuestion = {
				...newQuestion,
				id: uuid()
			};

			// Optimistically update to the new value
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) => [...(old || []), optimisticQuestion]
			);

			// Return a context object with the snapshotted value
			return { optimisticQuestion };
		},
		onSuccess: (result, variables, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}
			const { optimisticQuestion } = context;
			// Replace optimistic question with the result
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) =>
					Array.isArray(old)
						? old.map((question) => question.id === optimisticQuestion.id ? result : question)
						: [result]
			);
		},
		onError: (err, { surveyId }, context) => {
			if (!context) {
				throw new Error('Context is not found when performing optimistic update');
			}
			const { optimisticQuestion } = context;
			// Delete optimistic question when mutation failed
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) =>
					Array.isArray(old)
						? old.filter((question) => question.id !== optimisticQuestion.id)
						: []
			);
		},
	});

	return (type: QuestionContentModel.ContentTypes) =>
		mutate({ surveyId, newQuestion: QuestionModel.getNewQuestion(type) });
};

export const useUpdateQuestion = (surveyId: string) => {
	const { mutate } = useMutation<
		QuestionModel.Question,
		unknown,
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
		onSuccess: (result, { question }) => {
			const mutationsNumber = queryClient.isMutating({
				predicate: ({ options }) => options.variables.question.id === question.id
			});
			if (mutationsNumber > 1) {
				return;
			}

			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) => (old || []).map((q) => q.id === question.id ? result : q)
			);
		},
		onError: (err, { surveyId, question }) => {
			// Delete optimistic question when mutation failed
			queryClient.setQueryData<QuestionModel.Question[]>(
				questionsKey(surveyId),
				(old) =>
					Array.isArray(old)
						? old.filter((q) => q.id !== question.id)
						: []
			);
			queryClient.invalidateQueries(questionsKey(surveyId));
		},
	});

	return (question: QuestionModel.Question) =>
		mutate({ surveyId, question });
};

