type PathParam = string;

type HomePagePath = '/';
type SurveyPagePath = `/surveys/${PathParam}`;

export type Paths = HomePagePath | SurveyPagePath;
