import React from 'react';

import { QuestionLogic, Question, QuestionTypeSelect } from '@question';


type Props = {
	surveyId: string
}

export const Builder = ({ surveyId }: Props) => {
	const { data: questions, status } = QuestionLogic.useGetQuestions(surveyId);
	const createQuestion = QuestionLogic.useCreateQuestion(surveyId);

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			<QuestionTypeSelect onSelect={createQuestion} />
			{questions.map(({ id, name, content }, i) => (
				<>
					{id}
					<Question
						// it should be index, but not ID, because when optimistic update finishes
						// it will change the ID and re-create component (might lose input focus)
						key={i}
						id={id}
						name={name}
						content={content}
						onTitleUpdate={() => null}
						onValueChange={() => null}
						previewMode={true}
					/>
				</>
			))}
		</div>
	);
};
