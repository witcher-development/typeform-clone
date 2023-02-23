import React from 'react';
import { useQuery } from 'react-query';

import { SurveyApi, Survey } from '@survey';


export const HomePage = () => {
	const { data: surveys, isLoading, isError } = useQuery('surveys', SurveyApi.getAll);

	if (isLoading) {
		return <p>loading</p>;
	}
	if (isError) {
		return <p>error</p>;
	}

	return (
		<div>
			{surveys?.map((survey) => (
				<Survey key={survey.id} survey={survey} />
			))}
		</div>
	);
};
