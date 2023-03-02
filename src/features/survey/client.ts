import { client } from '@client';

import * as SurveyModel from './model';


const url = (id = '') => `/surveys/${id}`;

const mapDataToSurveys = (data: any): SurveyModel.Survey[] => data.map(mapDataToSurvey);
const mapDataToSurvey = (data: any): SurveyModel.Survey => ({
	id: data.id,
	name: data.name
});
export const getAll = () => client.get(url()).then((res) => mapDataToSurveys(res.data));
export const getOne = (id: string) => client.get(url(id)).then((res) => mapDataToSurvey(res.data));


const mapSurveyToData = ({ id, name }: SurveyModel.Survey) => ({
	id,
	name,
});

export type CreateProps = {
	survey: SurveyModel.Survey;
}
export const create = ({ survey }: CreateProps) =>
	client.post(url(), mapSurveyToData(survey))
		.then((res) => mapDataToSurvey(res.data));


export type UpdateProps = {
	survey: SurveyModel.Survey;
}
export const update = ({ survey }: UpdateProps) =>
	client.patch(url(survey.id), mapSurveyToData(survey))
		.then((res) => mapDataToSurvey(res.data));


export type RemoveProps = {
	id: string;
}
export const remove = ({ id }: RemoveProps) =>
	client.delete(url(id));
