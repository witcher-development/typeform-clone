import React from 'react';

import * as QuestionModel from './model';
import { QuestionContent } from './QuestionContent';


type Props = QuestionModel.Question & {
	previewMode: boolean;
	onTitleUpdate: (newTitle: string) => void;
	onValueChange: (newValue: any) => void; // TODO: replace any with generic
}

export const Question = ({ previewMode, name, onTitleUpdate, content, onValueChange }: Props) => (
	<div>
		<input type="text" disabled={!previewMode} value={name} onChange={(e) => onTitleUpdate(e.target.value)} />
		<QuestionContent editable={!previewMode} content={content} onValueChange={onValueChange} />
	</div>
);
