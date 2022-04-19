import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingMessageComponent = () => {
	return (
		<main>
			<div className='width-1000'>
				<Spinner as='span' size='sm' animation='border' variant='danger' style={{marginRight: '10px'}} /> Loading...
			</div>
		</main>
	);
}

export default LoadingMessageComponent;
