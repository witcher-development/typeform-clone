import { client } from '@client';

import * as QuestionModel from './model';
import { QuestionContentModel } from './QuestionContent';


const url = (surveyId: string, id = '') => `/surveys/${surveyId}/questions/${id}`;

// TODO: handle multi-options case
const mapDataToQuestionContent = (data: any): QuestionContentModel.Content =>
	QuestionContentModel.getEmptyContent(data.type);
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
				options: Array.from(content.value, ([id, { name }]) => ({ id, name }))
			};
		}
		default:
			throw new Error('Unknown question type while mapping question content to API');
	}
};
const mapQuestionToData = ({ name, content }: QuestionModel.NewQuestion) => ({
	name,
	content: mapQuestionContentToData(content)
});

export type CreateProps = {
	surveyId: string;
	newQuestion: QuestionModel.NewQuestion;
}
export const create = ({ surveyId, newQuestion }: CreateProps) =>
	client.post(url(surveyId), mapQuestionToData(newQuestion))
		.then((res) => mapDataToQuestion(res.data));
