import React, { useState } from 'react';

import { Question, QuestionType, QuestionTypeSelect, QuestionContentTypeNames, getNewQuestion } from '@question';


export const BuilderPage = () => {
	const [questions, setQuestions] = useState<QuestionType[]>([]);

	const addQuestionByType = (type: QuestionContentTypeNames) => {
		setQuestions([...questions, getNewQuestion(type)]);
	};

	const updateQuestionTitle = (title: string, id: string) => {
		setQuestions(questions.map((q) => id === q.id ? { ...q, title } : q));
	};

	return (
		<div>
			<QuestionTypeSelect onSelect={addQuestionByType} />
			{questions.map(({ id, title, content }) => (
				<Question
					key={id}
					id={id}
					title={title}
					content={content}
					onTitleUpdate={(title) => updateQuestionTitle(title, id)}
					onValueChange={() => null}
					previewMode={true}
				/>
			))}
		</div>
	);
};
