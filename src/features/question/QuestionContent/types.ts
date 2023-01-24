export type StringQuestionContentType = {
	type: 'string';
	value: string;
}
export type NumberQuestionContentType = {
	type: 'number';
	value: number;
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
