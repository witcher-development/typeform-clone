import React from 'react';

import { QuestionContentTypeNames, questionTypeNameMap } from '@question/QuestionContent';


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
