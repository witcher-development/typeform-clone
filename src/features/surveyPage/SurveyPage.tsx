import React from 'react';
import {
	useParams
} from 'react-router-dom';
import { useQuery } from 'react-query';

import { useNavigate } from '@common/Navigation';
import { SurveyApi } from '@survey';


export const SurveyPage = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	if (!id) {
		redirect('/');
		return <></>;
	}
	const { data: survey, isLoading, isError } = useQuery(['surveys', id], () => SurveyApi.getOne(id));

	if (isLoading) {
		return <p>loading</p>;
	}
	if (isError) {
		return <p>error</p>;
	}

	return (
		<div>
			{survey?.name}
		</div>
	);
};
