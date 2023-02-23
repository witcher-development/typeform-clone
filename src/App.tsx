import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MainRouter } from '@router';


const queryClient = new QueryClient();


export const App = () => (
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<MainRouter />
		</RecoilRoot>
	</QueryClientProvider>
);
