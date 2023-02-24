import React from 'react';
import {
	useParams
} from 'react-router-dom';

import { useNavigate } from '@common/Navigation';
import { SurveyLogic } from '@survey';
import { Builder } from '@builder';


export const SurveyPage = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	if (!id) {
		redirect('/');
		return <></>;
	}
	const { data: survey, status } = SurveyLogic.useGetSurvey(id);

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			{survey.name}
			<Builder surveyId={survey.id} />
		</div>
	);
};
