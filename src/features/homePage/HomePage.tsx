import React from 'react';

import { useNavigate } from '@common/Navigation';
import { SurveyLogic, Survey } from '@survey';


export const HomePage = () => {
	const redirect = useNavigate();

	const { data: surveys, status } = SurveyLogic.useGetSurveys();
	const createSurvey = SurveyLogic.useCreateSurvey();
	const removeSurvey = SurveyLogic.useRemoveSurvey();

	const onCreate = () => {
		const { id } = createSurvey();
		setTimeout(() => {
			redirect(`/surveys/${id}`);
		}, 500);
	};

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			{surveys.map((survey) => (
				<div key={survey.id}>
					<Survey survey={survey} />
					<button onClick={() => removeSurvey(survey.id)}>Remove</button>
				</div>
			))}
			<div>
				<button onClick={onCreate}>New</button>
			</div>
		</div>
	);
};
