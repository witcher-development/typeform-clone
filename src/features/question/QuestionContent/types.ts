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
export const questionTypeNameMap = new Map<QuestionContentTypeNames, string>([
	['string', 'Text'],
	['number', 'Number'],
	['multiSelect', 'Multiple Choice'],
]);
