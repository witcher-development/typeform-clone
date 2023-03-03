import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';


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
		<Stack spacing={2} alignItems="start">
			<QuestionTypeSelect onSelect={createQuestion} />
			{questions.map((question) => (
				<Card key={question.id} variant="outlined" style={{ padding: 12 }}>
					<Stack direction="row" alignItems="start">
						<Question
							question={question}
							onUpdate={updateQuestion}
							editorMode={true}
						/>
						<button onClick={() => removeQuestion(question.id)}>X</button>
					</Stack>
				</Card>
			))}
		</Stack>
	);
};
