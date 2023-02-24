import React from 'react';

import * as QuestionContentModel from './model';


type Props = {
	editable: boolean;
	content: QuestionContentModel.Content;
	onValueChange: (newValue: QuestionContentModel.Content['value']) => void;
}

type StringProps = Omit<Props, 'content'> & { content: QuestionContentModel.StringContent }
const StringQuestionContent = ({ editable, content, onValueChange }: StringProps) => (
	<input type="text" value={content.value} onChange={(e) => onValueChange(e.target.value)} disabled={!editable} />
);

type NumberProps = Omit<Props, 'content'> & { content: QuestionContentModel.NumberContent }
const NumberQuestionContent = ({ editable, content, onValueChange }: NumberProps) => (
	<input
		type="number"
		value={content.value ?? undefined}
		onChange={(e) => onValueChange(e.target.value)}
		disabled={!editable}
	/>
);

type MultiSelectProps = Omit<Props, 'content' | 'onValueChange'> & { content: QuestionContentModel.MultiSelectContent }
const MultiSelectQuestionContent = ({ editable, content }: MultiSelectProps) => (
	<div>
		{Array.from(content.value).map(([id, { name }]) => (
			<div key={id}>
				<p>{name}</p>
				<input value={id} type="checkbox" disabled={!editable} />
			</div>
		))}
	</div>
);

export const QuestionContent = ({ editable, content, onValueChange }: Props) => {
	switch (content.type) {
		case 'string':
			return <StringQuestionContent editable={editable} content={content} onValueChange={onValueChange} />;
		case 'number':
			return <NumberQuestionContent editable={editable} content={content} onValueChange={onValueChange}/>;
		case 'multi-select':
			return <MultiSelectQuestionContent editable={editable} content={content} />;
		default:
			throw new Error('unknown question content type');
	}
};
