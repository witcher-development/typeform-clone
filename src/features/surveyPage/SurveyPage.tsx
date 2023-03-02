import React, { useState, useEffect } from 'react';
import { logger } from 'react-query/types/react/logger';
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

	const [surveyName, setSurveyName] = useState('');
	useEffect(() => {
		if (status === 'success') {
			setSurveyName(survey.name);
		}
	}, [status, survey]);

	const onUpdate = () => {
		if (survey?.name === surveyName) return;
		updateSurvey({ id, name: surveyName });
	};

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<div>
			<input value={surveyName} onChange={(e) => setSurveyName(e.target.value)} onBlur={onUpdate} />
			<Builder surveyId={survey.id} />
		</div>
	);
};
