import axios from 'axios';


export const client = axios.create({
	baseURL: 'http://localhost:3000/'
});

export class ClientError extends Error {
	constructor (msg: string) {
		super(msg);
		Object.setPrototypeOf(this, ClientError.prototype);
	}
}
