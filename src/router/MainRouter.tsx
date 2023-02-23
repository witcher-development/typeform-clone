import React, { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@home';
import { SurveyPage } from '@surveyPage';

import { Paths } from './paths';


export const routes = new Map<Paths, {
  element: ReactNode
}>([
	['/', { element: <HomePage /> }],
	['/surveys/:id', { element: <SurveyPage /> }],
]);

export const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			{Array.from(routes).map(([path, { element }]) => (
				<Route key={path} path={path} element={element} />
			))}
		</Routes>
	</BrowserRouter>
);
