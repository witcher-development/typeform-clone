import {
	StringQuestionContentType,
	NumberQuestionContentType,
	MultiSelectQuestionContentType,
	QuestionContentTypeNames, QuestionContentTypes
} from './types';


const stringQuestionEmptyContent = (): StringQuestionContentType => ({
	type: 'string',
	value: '',
});
const numberQuestionEmptyContent = (): NumberQuestionContentType => ({
	type: 'number',
	value: null,
});
const multiSelectQuestionEmptyContent = (): MultiSelectQuestionContentType => ({
	type: 'multiSelect',
	value: new Map(),
});

export const getEmptyContentByType = (type: QuestionContentTypeNames): QuestionContentTypes => {
	switch (type) {
		case 'string':
			return stringQuestionEmptyContent();
		case 'number':
			return numberQuestionEmptyContent();
		case 'multiSelect':
			return multiSelectQuestionEmptyContent();
		default:
			throw new Error('Unknown question type while generating empty question content');
	}
};
