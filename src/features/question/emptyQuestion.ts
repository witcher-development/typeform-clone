import { v4 as uuid } from 'uuid';

import { QuestionType } from './types';
import { getEmptyContentByType, QuestionContentTypeNames } from './QuestionContent';


export const getEmptyQuestion = (type: QuestionContentTypeNames): QuestionType => ({
	id: uuid(),
	title: '',
	content: getEmptyContentByType(type)
});
