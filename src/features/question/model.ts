import { v4 as uuid } from 'uuid';

import { getEmptyContentByType } from '@question/QuestionContent';

import { QuestionContentTypeNames, QuestionContentTypes } from './QuestionContent/model';


export type QuestionType = {
	id: string;
	title: string;
	content: QuestionContentTypes;
}

export const getNewQuestion = (type: QuestionContentTypeNames): QuestionType => ({
	id: uuid(),
	title: '',
	content: getEmptyContentByType(type)
});
