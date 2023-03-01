export type StringContent = {
	type: 'string';
	value: string;
}
export type NumberContent = {
	type: 'number';
	value: number | null;
}
export type MultiSelectOption = {
	id?: string;
	name: string;
	checked: boolean;
}
export type MultiSelectContent = {
	type: 'multi-select';
	value: MultiSelectOption[];
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
export const getEmptyMultiSelectOption = (): MultiSelectOption => ({
	name: '',
	checked: false,
});
const multiSelectQuestionEmptyContent = (): MultiSelectContent => ({
	type: 'multi-select',
	value: [],
});

export const getEmptyContent = (type: ContentTypes): Content => {
	switch (type) {
		case 'string':
			return stringQuestionEmptyContent();
		case 'number':
			return numberQuestionEmptyContent();
		case 'multi-select':
			return multiSelectQuestionEmptyContent();
		default:
			throw new Error('Unknown question type while generating empty question content');
	}
};
