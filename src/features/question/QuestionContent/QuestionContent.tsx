import React, { useState, useEffect } from 'react';

import * as QuestionContentModel from './model';


type SubProps<T extends QuestionContentModel.Content> = {
	editorMode: boolean;
	value: T['value'];
	onUpdate: (newValue: T['value']) => void;
}

type StringProps = SubProps<QuestionContentModel.StringContent>
const StringQuestionContent = ({ editorMode, value, onUpdate }: StringProps) => (
	<input type="text" value={value} onChange={(e) => onUpdate(e.target.value)} disabled={editorMode} />
);

type NumberProps = SubProps<QuestionContentModel.NumberContent>
const NumberQuestionContent = ({ editorMode, value, onUpdate }: NumberProps) => (
	<input
		type="number"
		value={value ?? undefined}
		onChange={(e) => onUpdate(+e.target.value)}
		disabled={editorMode}
	/>
);

type MultiSelectOptionProps = {
	editorMode: boolean;
	value: QuestionContentModel.MultiSelectOption;
	onUpdate: (newValue: QuestionContentModel.MultiSelectOption) => void;
}
const MultiSelectOption = ({ editorMode, value, onUpdate }: MultiSelectOptionProps) => {
	const [localName, setLocalName] = useState(value.name);
	useEffect(() => {
		setLocalName(value.name);
	}, [value.name]);
	const onNameChange = () => {
		onUpdate({ ...value, name: localName });
	};

	return (
		<div>
			<input
				type="text"
				value={localName}
				onChange={(e) => setLocalName(e.target.value)}
				onBlur={onNameChange}
				disabled={!editorMode}
			/>
			<input value={value.id} type="checkbox" checked={value.checked} disabled={editorMode} />
		</div>
	);
};

type MultiSelectProps = SubProps<QuestionContentModel.MultiSelectContent>
const MultiSelectQuestionContent = ({ editorMode, value, onUpdate }: MultiSelectProps) => {
	const updateOption = (updatedOption: QuestionContentModel.MultiSelectOption) => {
		onUpdate(value.map((option) => option.id === updatedOption.id ? updatedOption : option));
	};
	const deleteOption = (id: string) => {
		onUpdate(value.filter((option) => option.id !== id));
	};

	return (
		<div>
			{value.map((option) => (
				<div key={option.id}>
					<MultiSelectOption key={option.id} editorMode={editorMode} value={option} onUpdate={updateOption} />
					<button onClick={() => deleteOption(option.id)}>Delete</button>
				</div>
			))}
			{editorMode && (
				<button
					onClick={() => onUpdate([...value, QuestionContentModel.getEmptyMultiSelectOption()])}
				>
					Add option
				</button>
			)}
		</div>
	);
};


type Props = {
	editorMode: boolean;
	content: QuestionContentModel.Content;
	onUpdate: (newContent: QuestionContentModel.Content) => void;
}

export const QuestionContent = ({ editorMode, content, onUpdate }: Props) => {
	switch (content.type) {
		case 'string':
			return <StringQuestionContent
				editorMode={editorMode}
				value={content.value}
				onUpdate={(value) => onUpdate({ type: content.type, value })}
			/>;
		case 'number':
			return <NumberQuestionContent
				editorMode={editorMode}
				value={content.value}
				onUpdate={(value) => onUpdate({ type: content.type, value })}
			/>;
		case 'multi-select':
			return <MultiSelectQuestionContent
				editorMode={editorMode}
				value={content.value}
				onUpdate={(value) => onUpdate({ type: content.type, value })}
			/>;
		default:
			throw new Error('unknown question content type');
	}
};
