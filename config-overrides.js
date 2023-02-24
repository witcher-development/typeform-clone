const { alias } = require('react-app-rewire-alias');


module.exports = function override (config) {
	alias({
		'@common': 'src/features/common',
		'@survey': 'src/features/survey',
		'@surveyPage': 'src/features/surveyPage',
		'@question': 'src/features/question',
		'@builder': 'src/features/builder',
		'@home': 'src/features/homePage',
		'@client': 'src/client.ts',
		'@store': 'src/store.ts',
		'@router': 'src/router',
		'@env': 'src/env.ts',
	})(config);

	return config;
};
