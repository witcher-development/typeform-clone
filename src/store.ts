import { QueryClient, QueryCache, MutationCache } from 'react-query';

import { logError } from '@analytics';


export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			logError(error);
		}
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			logError(error);
		}
	})
});

