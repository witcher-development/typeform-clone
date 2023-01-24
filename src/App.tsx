import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';

import { MainRouter } from '@router';

import { Question } from './features/question/Question';


export const App = () => {
	const [stringQuestionContent, setString] = useState('placeholder');
	const [numberQuestionContent, setNumber] = useState(2);

	return (
		<RecoilRoot>
			<MainRouter />
			<div>
				<Question
					id={'1'}
					title={'Test?'}
					content={{
						type: 'string',
						value: stringQuestionContent
					}}
					editable={false}
					onTitleUpdate={() => null}
					onValueChange={(newValue) => setString(newValue)}
				/>
				<Question
					id={'2'}
					title={'Test number?'}
					content={{
						type: 'number',
						value: numberQuestionContent
					}}
					editable={true}
					onTitleUpdate={() => null}
					onValueChange={(newValue) => setNumber(newValue)}
				/>
			</div>
		</RecoilRoot>
	);
};
