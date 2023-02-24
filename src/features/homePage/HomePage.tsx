import React from 'react';

import { SurveyLogic, Survey } from '@survey';


export const HomePage = () => {
	const { data: surveys, status } = SurveyLogic.useGetSurveys();

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			{surveys.map((survey) => (
				<Survey key={survey.id} survey={survey} />
			))}
		</div>
	);
};
