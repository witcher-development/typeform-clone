import { QueryClient } from 'react-query';


export const queryClient = new QueryClient({
	defaultOptions: {
		queries: { useErrorBoundary: true },
		mutations: { useErrorBoundary: true },
	}
});

