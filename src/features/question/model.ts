import { v4 as uuid } from 'uuid';
import { QuestionContentModel } from './QuestionContent';


export type Question = {
	id: string;
	name: string;
	content: QuestionContentModel.Content;
}

export const getNewQuestion = (type: QuestionContentModel.ContentTypes): Question => ({
	id: uuid(),
	name: '',
	content: QuestionContentModel.getEmptyContent(type)
});
