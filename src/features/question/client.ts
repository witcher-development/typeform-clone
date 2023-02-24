import { client } from '@client';

import * as QuestionModel from './model';
import { QuestionContentModel } from './QuestionContent';


const url = (surveyId: string, u: string) => `/surveys/${surveyId}/questions/${u}`;

const mapDataToQuestionContent = (data: any): QuestionContentModel.Content => QuestionContentModel.getEmptyContent(data.type);
const mapDataToQuestion = (data: any): QuestionModel.Question => ({
	id: data.id,
	name: data.name,
	content: mapDataToQuestionContent(data.content)
});
const mapDataToQuestions = (data: any): QuestionModel.Question[] => data.map(mapDataToQuestion);

export const getAll = (surveyId: string) => client.get(url(surveyId, '')).then((res) => mapDataToQuestions(res.data));
// export const getOne = (id: string) => client.get(url(id)).then((res) => mapDataToSurvey(res.data));
