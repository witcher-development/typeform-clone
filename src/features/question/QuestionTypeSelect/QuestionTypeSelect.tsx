import React from 'react';

import { QuestionContentModel } from '../QuestionContent';


export const questionTypeNameMap = new Map<QuestionContentModel.ContentTypes, string>([
	['string', 'Text'],
	['number', 'Number'],
	['multiSelect', 'Multiple Choice'],
]);

type Props = {
	onSelect: (type: QuestionContentModel.ContentTypes) => void;
};

export const QuestionTypeSelect = ({ onSelect }: Props) => (
	<div>
		{Array.from(questionTypeNameMap).map(([key, name]) => (
			<button key={key} onClick={() => onSelect(key)}>{name}</button>
		))}
	</div>
);
