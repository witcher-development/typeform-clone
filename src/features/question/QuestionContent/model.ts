export type StringQuestionContentType = {
	type: 'string';
	value: string;
}
export type NumberQuestionContentType = {
	type: 'number';
	value: number | null;
}
export type MultiSelectOption = {
	name: string;
	checked: boolean;
}
export type MultiSelectQuestionContentType = {
	type: 'multiSelect';
	value: Map<string, MultiSelectOption>;
}

export type QuestionContentTypes = StringQuestionContentType | NumberQuestionContentType | MultiSelectQuestionContentType;

export type QuestionContentTypeNames = QuestionContentTypes['type'];

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
