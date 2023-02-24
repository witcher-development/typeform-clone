import { useQuery } from 'react-query';


import * as QuestionApi from './client';


const questionsKey = 'questions';

export const useGetQuestions = (surveyId: string) => {
	const { data: questions, status } = useQuery([surveyId, questionsKey], () => QuestionApi.getAll(surveyId));

	return { questions, status };
};
