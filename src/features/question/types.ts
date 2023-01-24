import { QuestionContentTypes } from './QuestionContent/types';

export type QuestionType = {
	id: string;
	title: string;
	content: QuestionContentTypes;
}
