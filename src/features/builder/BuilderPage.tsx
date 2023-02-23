import React, { useState } from 'react';

import { Question, QuestionTypeSelect, QuestionModel, QuestionContentModel } from '@question';


export const BuilderPage = () => {
	const [questions, setQuestions] = useState([]);

	const addQuestionByType = (type: QuestionContentModel.ContentTypes) => {
		// setQuestions([...questions, QuestionModel.getNewQuestion(type)]);
	};

	const updateQuestionTitle = (title: string, id: string) => {
		// setQuestions(questions.map((q) => id === q.id ? { ...q, title } : q));
	};

	return (
		<div>
			<QuestionTypeSelect onSelect={addQuestionByType} />
			{questions.map(({ id, name, content }) => (
				<Question
					key={id}
					id={id}
					name={name}
					content={content}
					onTitleUpdate={(title) => updateQuestionTitle(title, id)}
					onValueChange={() => null}
					previewMode={true}
				/>
			))}
		</div>
	);
};
