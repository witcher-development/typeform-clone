import { validate, version } from 'uuid';
import isString from 'lodash/isString';

import * as SurveyModel from './model';


export const isSurvey = (survey: any): survey is SurveyModel.Survey => {
	if (!validate(survey.id)) return false;
	if (version(survey.id) !== 4) return false;
	if (!Object.hasOwn(survey, 'name')) return false;
	if (!isString(survey.name)) return false;
	return true;
};
