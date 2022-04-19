import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import AppContext from '../../../../../core/stores/AppContext';
import ListComponent from '../../../../../components/ListComponent';
import { EmployeeListService, EmployeeDeleteService } from '../../../../../core/services/EmployeeService';

import EmployeeRow from './EmployeeRow';

const EmployeeListing = () => {
	const value = useContext(AppContext);
	const navigate = useNavigate();

	/**
	 * Load employees for first time
	 */
	useEffect( () => {
	}, []);

	return (
		<main>
			<div className='width-1000'>
				<ListComponent
					ListItemComponent={EmployeeRow}
					serviceGetList={EmployeeListService}
					serviceDeleteList={EmployeeDeleteService}
					slug={'employee'}
					heading={'Employees'}
				/>
			</div>
		</main>
	);
}

export default EmployeeListing;
