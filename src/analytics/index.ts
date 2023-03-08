// TODO: implement logging

export const logError = (error: any) => {
	console.log('Custom logger -----------');
	if (error instanceof Error) {
		console.log(error.constructor.name);
	} else {
		console.log(error);
	}
	console.log('------------Custom logger');
};
