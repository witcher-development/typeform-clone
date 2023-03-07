import React, { ErrorInfo, PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { SurveyLogic, Survey } from '@survey';


class ErrorBoundary extends React.Component<PropsWithChildren<void>> {
	constructor (props: any) {
		super(props);
		this.state = { error: false };
	}

	static getDerivedStateFromError = () => {
		return { error: true };
	};

	componentDidCatch (error: Error, errorInfo: ErrorInfo) {
		console.log('home', error.stack);
		this.setState({
			error: false
		});
	}

	render () {
		return this.props.children;
	}
}

const $HomePage = () => {
	const { data: surveys, status } = SurveyLogic.useGetSurveys();
	const createSurvey = SurveyLogic.useCreateSurvey();
	const removeSurvey = SurveyLogic.useRemoveSurvey();


	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<Box padding={2}>
			{/* {show && <ErrorComp test={show} />} */}
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

export const HomePage = () => (
	<ErrorBoundary>
		<$HomePage />
	</ErrorBoundary>
);
