export type StringContent = {
	type: 'string';
	value: string;
}
export type NumberContent = {
	type: 'number';
	value: number | null;
}
export type MultiSelectOption = {
	name: string;
	checked: boolean;
}
export type MultiSelectContent = {
	type: 'multiSelect';
	value: Map<string, MultiSelectOption>;
}

export type Content = StringContent | NumberContent | MultiSelectContent;

export type ContentTypes = Content['type'];

const stringQuestionEmptyContent = (): StringContent => ({
	type: 'string',
	value: '',
});
const numberQuestionEmptyContent = (): NumberContent => ({
	type: 'number',
	value: null,
});
const multiSelectQuestionEmptyContent = (): MultiSelectContent => ({
	type: 'multiSelect',
	value: new Map(),
});

export const getEmptyContent = (type: ContentTypes): Content => {
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
