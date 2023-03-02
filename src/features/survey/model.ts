import { v4 as uuid } from 'uuid';


export type Survey = {
	id: string;
	name: string;
}

export const getNewSurvey = (): Survey => ({
	id: uuid(),
	name: ''
});
