import React from 'react';
import { RecoilRoot } from 'recoil';

import { MainRouter } from '@router';


export const App = () => (
	<RecoilRoot>
		<MainRouter />
	</RecoilRoot>
);
