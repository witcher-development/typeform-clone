import React from 'react';

import { QuestionType } from './types';
import { QuestionContent } from './QuestionContent';


type Props = QuestionType & {
	previewMode: boolean;
	onTitleUpdate: (newTitle: string) => void;
	onValueChange: (newValue: any) => void; // TODO: replace any with generic
}

export const Question = ({ previewMode, title, onTitleUpdate, content, onValueChange }: Props) => (
	<div>
		<input type="text" disabled={!previewMode} value={title} onChange={(e) => onTitleUpdate(e.target.value)} />
		<QuestionContent editable={!previewMode} content={content} onValueChange={onValueChange} />
	</div>
);
