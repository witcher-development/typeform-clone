import React from 'react';

import { QuestionType } from './types';
import { QuestionContent } from './QuestionContent';


type Props = QuestionType & {
	editable: boolean;
	onTitleUpdate: (newTitle: string) => void;
	onValueChange: (newValue: any) => void; // TODO: replace any with generic
}

export const Question = ({ editable, title, onTitleUpdate, content, onValueChange }: Props) => (
	<div>
		<input type="text" disabled={!editable} value={title} onChange={(e) => onTitleUpdate(e.target.type)} />
		<QuestionContent editable={editable} content={content} onValueChange={onValueChange} />
	</div>
);
