import React from 'react';
import { Navigate } from 'react-router-dom';

import routes from '../../routes';

const Homepage = () => {
	return (
		<Navigate
			to={routes[1].path}
		/>
	);
}

export default Homepage;
