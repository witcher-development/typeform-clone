import React from 'react';

import * as QuestionModel from './model';
import { QuestionContent } from './QuestionContent';


type Props = {
	editorMode: boolean;
	question: QuestionModel.Question;
	onUpdate: (newContent: QuestionModel.Question) => void;
}

export const Question = ({ editorMode, question, onUpdate }: Props) => {
	const { id, name, content } = question;

	const update = (newData: Partial<QuestionModel.Question>) => {
		onUpdate({
			...question,
			...newData
		});
	};

	return (
		<div>
			{id}
			<input type="text" disabled={!editorMode} value={name} onChange={(e) => update({ name: e.target.value })} />
			<QuestionContent
				editorMode={editorMode}
				content={content}
				onUpdate={(newContent) => update({ content: newContent })}
			/>
		</div>
	);
};
