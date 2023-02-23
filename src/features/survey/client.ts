import { client } from '@client';


import * as SurveyModel from './model';


export const url = (u: string) => `/surveys/${u}`;

const mapDataToSurveys = (data: any): SurveyModel.Survey[] => data.map(mapDataToSurvey);
const mapDataToSurvey = (data: any): SurveyModel.Survey => ({
	id: data.id,
	name: data.name
});
export const getAll = () => client.get(url('')).then((res) => mapDataToSurveys(res.data));
export const getOne = (id: string) => client.get(url(id)).then((res) => mapDataToSurvey(res.data));
