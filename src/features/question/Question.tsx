import React, { useState, useEffect } from 'react';

import * as QuestionModel from './model';
import { QuestionContent } from './QuestionContent';


type Props = {
	editorMode: boolean;
	question: QuestionModel.Question;
	onUpdate: (newContent: QuestionModel.Question) => void;
}

export const Question = ({ editorMode, question, onUpdate }: Props) => {
	const { name, content } = question;

	const update = (newData: Partial<QuestionModel.Question>) => {
		onUpdate({
			...question,
			...newData
		});
	};

	const [localName, setLocalName] = useState(name);
	useEffect(() => {
		setLocalName(name);
	}, [name]);
	const onNameChange = () => {
		if (name === localName) return;
		update({ name: localName });
	};

	return (
		<div>
			<input
				type="text"
				disabled={!editorMode}
				value={localName}
				onChange={(e) => setLocalName(e.target.value)}
				onBlur={onNameChange}
			/>
			<QuestionContent
				editorMode={editorMode}
				content={content}
				onUpdate={(newContent) => update({ content: newContent })}
			/>
		</div>
	);
};
