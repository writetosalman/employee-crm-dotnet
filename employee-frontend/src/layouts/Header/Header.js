import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import routes from '../../features/site/routes';

function Header() {
	const navigate = useNavigate();
	const location = useLocation();

	const goToHome = () => navigate(routes[0].path);
	const goToAddEmployee = () => navigate(routes[2].path);
	const goToListEmployee = () => navigate(routes[1].path);

	return (
		<header>
			<Row className='row-ex'>
				<Col xs='12' md='4' className='text-sm-center'>
					<a href='#' onClick={goToHome} className='text-light text-decoration-none'><h1>Employee CRM</h1></a>
				</Col>
				<Col xs='12' md='8' className='d-none d-md-block text-end'>
					<Button variant={location.pathname === '/' ? 'light':'outline-light'} onClick={goToHome} className='mx-1'>Home</Button>
					<Button variant={location.pathname.includes('/add') ? 'light':'outline-light'} onClick={goToAddEmployee} className='mx-1'>Add an employee</Button>
					<Button variant={location.pathname.includes('/listing') ? 'light':'outline-light'} onClick={goToListEmployee} className='mx-1'>Employee Listing</Button>
				</Col>
			</Row>
		</header>
	);
}

export default Header;
