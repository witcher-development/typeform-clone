import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query';

import { MainRouter } from '@router';
import { queryClient } from '@store';



export const App = () => (
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			{/* <ErrorBoundary> */}
			<MainRouter />
			{/* </ErrorBoundary> */}
		</RecoilRoot>
	</QueryClientProvider>
);
