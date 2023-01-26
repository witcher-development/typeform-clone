import React from 'react';

import { QuestionContentTypes, StringQuestionContentType, NumberQuestionContentType } from './types';


type Props = {
	editable: boolean;
	content: QuestionContentTypes;
	onValueChange: (newValue: QuestionContentTypes['value']) => void;
}

type StringProps = Omit<Props, 'content'> & { content: StringQuestionContentType }
const StringQuestionContent = ({ editable, content, onValueChange }: StringProps) => (
	<input type="text" value={content.value} onChange={(e) => onValueChange(e.target.value)} disabled={!editable} />
);

type NumberProps = Omit<Props, 'content'> & { content: NumberQuestionContentType }
const NumberQuestionContent = ({ editable, content, onValueChange }: NumberProps) => (
	<input type="number" value={content.value ?? undefined} onChange={(e) => onValueChange(e.target.value)} disabled={!editable} />
);

export const QuestionContent = ({ editable, content, onValueChange }: Props) => {
	switch (content.type) {
		case 'string':
			return <StringQuestionContent editable={editable} content={content} onValueChange={onValueChange} />;
		case 'number':
			return <NumberQuestionContent editable={editable} content={content} onValueChange={onValueChange}/>;
		case 'multiSelect':
			return <></>;
		default:
			throw new Error('unknown question content type');
	}
};
