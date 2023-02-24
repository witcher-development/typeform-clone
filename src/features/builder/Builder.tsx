import React from 'react';
import { useQuery } from 'react-query';

import { QuestionLogic, Question, QuestionTypeSelect } from '@question';


type Props = {
	surveyId: string
}

export const Builder = ({ surveyId }: Props) => {
	const { questions, status } = QuestionLogic.useGetQuestions(surveyId);

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			{/* <QuestionTypeSelect onSelect={addQuestionByType} /> */}
			{questions?.map(({ id, name, content }) => (
				<Question
					key={id}
					id={id}
					name={name}
					content={content}
					onTitleUpdate={() => null}
					onValueChange={() => null}
					previewMode={true}
				/>
			))}
		</div>
	);
};
