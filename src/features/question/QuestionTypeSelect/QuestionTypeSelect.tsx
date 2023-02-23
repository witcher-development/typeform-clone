import React from 'react';

import { QuestionContentTypeNames } from '@question/QuestionContent';

export const questionTypeNameMap = new Map<QuestionContentTypeNames, string>([
	['string', 'Text'],
	['number', 'Number'],
	['multiSelect', 'Multiple Choice'],
]);

type Props = {
	onSelect: (type: QuestionContentTypeNames) => void;
};

export const QuestionTypeSelect = ({ onSelect }: Props) => (
	<div>
		{Array.from(questionTypeNameMap).map(([key, name]) => (
			<button key={key} onClick={() => onSelect(key)}>{name}</button>
		))}
	</div>
);
