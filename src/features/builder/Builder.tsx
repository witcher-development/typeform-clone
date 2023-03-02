import React from 'react';

import { QuestionLogic, Question, QuestionTypeSelect } from '@question';


type Props = {
	surveyId: string
}

export const Builder = ({ surveyId }: Props) => {
	const { data: questions, status } = QuestionLogic.useGetQuestions(surveyId);
	const createQuestion = QuestionLogic.useCreateQuestion(surveyId);
	const updateQuestion = QuestionLogic.useUpdateQuestion(surveyId);
	const removeQuestion = QuestionLogic.useRemoveQuestion(surveyId);

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			<QuestionTypeSelect onSelect={createQuestion} />
			{questions.map((question) => (
				<div key={question.id}>
					<Question
						question={question}
						onUpdate={updateQuestion}
						editorMode={true}
					/>
					<button onClick={() => removeQuestion(question.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};
