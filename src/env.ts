export type Env = {
	api: string
}

const getEnv: () => Env = () => {
	switch (process.env.REACT_APP_HOST_ENV) {
		case 'production': {
			return {
				api: ''
			}
		}
		case 'staging': {
			return {
				api: ''
			}
		}
		default: {
			return {
				api: 'http://localhost:3000'
			}
		}
	}
}

export const env = getEnv();

