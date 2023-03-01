import { client } from '@client';

import * as QuestionModel from './model';
import { QuestionContentModel } from './QuestionContent';


const url = (surveyId: string, id = '') => `/surveys/${surveyId}/questions/${id}`;

const mapDataToQuestionContent = (data: any): QuestionContentModel.Content => {
	switch (data.type) {
		case 'string':
		case 'number': {
			return QuestionContentModel.getEmptyContent(data.type);
		}
		case 'multi-select': {
			return {
				type: 'multi-select',
				value: data.options.map(({ id, name }: any) => ({ id, name, checked: false }))
			};
		}
		default:
			throw new Error('Unknown question type while mapping question content to API');
	}
};
const mapDataToQuestion = (data: any): QuestionModel.Question => ({
	id: data.id,
	name: data.name,
	content: mapDataToQuestionContent(data.content)
});
const mapDataToQuestions = (data: any): QuestionModel.Question[] => data.map(mapDataToQuestion);

export const getAll = (surveyId: string) => client.get(url(surveyId, '')).then((res) => mapDataToQuestions(res.data));


const mapQuestionContentToData = (content: QuestionContentModel.Content) => {
	switch (content.type) {
		case 'string':
		case 'number': {
			return {
				type: content.type
			};
		}
		case 'multi-select': {
			return {
				type: content.type,
				options: content.value.map(({ id, name }) => ({ id, name }))
			};
		}
		default:
			throw new Error('Unknown question type while mapping question content to API');
	}
};
const mapNewQuestionToData = ({ name, content }: QuestionModel.NewQuestion) => ({
	name,
	content: mapQuestionContentToData(content)
});

export type CreateProps = {
	surveyId: string;
	newQuestion: QuestionModel.NewQuestion;
}
export const create = ({ surveyId, newQuestion }: CreateProps) =>
	client.post(url(surveyId), mapNewQuestionToData(newQuestion))
		.then((res) => mapDataToQuestion(res.data));


const mapQuestionToData = ({ id, name, content }: QuestionModel.Question) => ({
	id,
	name,
	content: mapQuestionContentToData(content)
});

export type UpdateProps = {
	surveyId: string;
	question: QuestionModel.Question;
}
export const update = ({ surveyId, question }: UpdateProps) =>
	client.patch(url(surveyId, question.id), mapQuestionToData(question))
		.then((res) => mapDataToQuestion(res.data));


export type RemoveProps = {
	surveyId: string;
	id: string;
}
export const remove = ({ surveyId, id }: RemoveProps) => client.delete(url(surveyId, id));
