import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { SurveyLogic, Survey } from '@survey';


export const HomePage = () => {
	const { data: surveys, status } = SurveyLogic.useGetSurveys();
	const createSurvey = SurveyLogic.useCreateSurvey();
	const removeSurvey = SurveyLogic.useRemoveSurvey();

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<Box padding={2}>
			<Stack direction="row" alignItems="center" spacing={2}>
				{surveys.map((survey) => (
					<Card key={survey.id} variant="outlined" style={{ width: 200, height: 80, padding: 12 }}>
						<Stack spacing={1} alignItems="center">
							<Survey survey={survey} />
							<button onClick={() => removeSurvey(survey.id)}>Delete</button>
						</Stack>
					</Card>
				))}
				<div>
					<button onClick={createSurvey}>New</button>
				</div>
			</Stack>
		</Box>
	);
};
