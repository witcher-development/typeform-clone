import React, { useState, useEffect, ErrorInfo, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { useNavigate } from '@common/Navigation';
import { SurveyLogic } from '@survey';
import { Builder } from '@builder';


class ErrorBoundary extends React.Component<PropsWithChildren<void>> {
	constructor (props: any) {
		super(props);
		this.state = { error: false };
	}

	static getDerivedStateFromError = () => {
		return { error: true };
	};

	componentDidCatch (error: Error, errorInfo: ErrorInfo) {
		console.log('survey', error.stack);
		this.setState({
			error: false
		});
	}

	render () {
		return this.props.children;
	}
}

export const $SurveyPage = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	if (!id) {
		redirect('/');
		return <></>;
	}

	const { data: survey, status } = SurveyLogic.useGetSurvey(id);
	const updateSurvey = SurveyLogic.useUpdateSurvey(id);

	const [localName, setLocalName] = useState('');
	useEffect(() => {
		if (status === 'success') {
			setLocalName(survey.name);
		}
	}, [status, survey]);

	const onUpdate = () => {
		if (survey?.name === localName) return;
		updateSurvey({ id, name: localName });
	};

	if (status !== 'success') {
		return <p>not loaded</p>;
	}

	return (
		<Stack spacing={3} padding={2}>
			<Stack direction="row" spacing={2}>
				<button onClick={() => redirect('/')}>Back</button>
				<input value={localName} onChange={(e) => setLocalName(e.target.value)} onBlur={onUpdate} />
			</Stack>
			<Builder surveyId={survey.id} />
		</Stack>
	);
};

export const SurveyPage = () => (
	<ErrorBoundary>
		<$SurveyPage />
	</ErrorBoundary>
);
