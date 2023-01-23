const { alias } = require('react-app-rewire-alias');


module.exports = function override (config) {
	alias({
		'@common': 'src/features/common',
		'@router': 'src/router',
		'@env': 'src/env.ts',
	})(config);

	return config;
};
