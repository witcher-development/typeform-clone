import { useQuery } from 'react-query';


import * as SurveyApi from './client';


const surveysKey = 'surveys';

export const useGetSurveys = () => useQuery(surveysKey, () => SurveyApi.getAll());

export const useGetSurvey = (id: string) => useQuery([surveysKey, id], () => SurveyApi.getOne(id));
