import axios, { AxiosError } from 'axios';


export const client = axios.create({
	baseURL: 'http://localhost:3000/'
});

export const isClientError = (error: any): error is AxiosError => axios.isAxiosError(error);

export class CustomError extends Error {
	type = 'CustomError';

	constructor (msg: string) {
		super(msg);
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}
