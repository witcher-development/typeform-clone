import React from 'react';

import { Link } from '@common/Navigation';

import * as SurveyModel from './model';


type Props = {
	survey: SurveyModel.Survey
};

export const Survey = ({ survey }: Props) => {
	const { id, name } = survey;

	return (
		<div>
			<Link to={`/surveys/${id}`}>
				<p>{name}</p>
			</Link>
		</div>
	);
};
