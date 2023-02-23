export type Survey = {
	id: string;
	name: string;
}
export type NewSurvey = Omit<Survey, 'id'>

export const getNewSurvey = (): NewSurvey => ({
	name: ''
});
