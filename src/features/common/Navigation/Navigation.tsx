import React, { PropsWithChildren } from 'react';
import { Link as $Link, useNavigate as $useNavigate } from 'react-router-dom';

import { Paths } from '@router';


type Props = {
	to: Paths;
}

export const Link = ({ to, children }: PropsWithChildren<Props>) => (
	<$Link to={to}>{ children }</$Link>
);

export const useNavigate = () => {
	const navigate = $useNavigate();
	return (to: Paths) => navigate(to);
};
