import { QuestionContentModel } from './QuestionContent';


export type Question = {
	id: string;
	name: string;
	content: QuestionContentModel.Content;
}
export type NewQuestion = Omit<Question, 'id'>

export const getNewQuestion = (type: QuestionContentModel.ContentTypes): NewQuestion => ({
	name: '',
	content: QuestionContentModel.getEmptyContent(type)
});
