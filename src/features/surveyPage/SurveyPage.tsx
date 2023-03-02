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
	const updateSurvey = SurveyLogic.useUpdateSurvey(id);

	const onUpdate = (name: string) => {
		updateSurvey({ id, name });
	};

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			<input value={survey.name} onChange={(e) => onUpdate(e.target.value)} />
			<Builder surveyId={survey.id} />
		</div>
	);
};
