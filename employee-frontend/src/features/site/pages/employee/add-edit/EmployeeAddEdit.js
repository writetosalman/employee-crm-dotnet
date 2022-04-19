import React, {useState, useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

import AppContext from '../../../../../core/stores/AppContext';
import routes from '../../../routes';

import { EmployeeAddService, EmployeeUpdateService, EmployeeGetService } from '../../../../../core/services/EmployeeService';
import EmployeeForm from './EmployeeForm';
import Alert from 'react-bootstrap/Alert';

const EmployeeAddEdit = () => {
	const [employee, setEmployee] = useState(null);
	const [formValidated, setFormValidated] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isEditForm, setIsEditForm] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(true);
	const [isFormSubmitting, setIsFormSubmitting] = useState(false);

	const value = useContext(AppContext);
	const navigate = useNavigate();
	const { id } = useParams();

	/**
	 * Load values from store and autofill
	 */
	useEffect( () => {
		if ( id ) {
			console.log('id', id);
			setIsEditForm(true);
			setIsFormLoading(true);
			EmployeeGetService(id).then(response => response.json())
				.then( response => {
					setIsFormLoading(false);
					if ( response?.errors ) {
						setErrorMessage(`Failed to load employee record. Error occurred`);
						console.error('Errors: ', response?.errors);
						return;
					}
					setEmployee(response);
				})
				.catch( error => {
					setIsFormLoading(false);
					setErrorMessage(error.toString());
				});
		}
	}, []);

	/**
	 * This function calls correct function based on add or edit
	 * @param postData
	 * @returns {Promise<Response>}
	 * @private
	 */
	const _apiServiceAddEdit = postData => {
		return isEditForm ? EmployeeUpdateService(id, { id, ...postData }): EmployeeAddService(postData);
	};

	/**
	 * Handle form submit
	 * @param event
	 */
	const _handleFormSubmit = event => {
		// Get form instance
		const form = event.currentTarget;

		// form validation failed
		if ( !form.checkValidity() ) {
			event.preventDefault();
			event.stopPropagation();
		}
		else {
			setIsFormSubmitting(true);
			setErrorMessage('');

			const postData = {
				fName: form.elements.frmFName.value,
				lName: form.elements.frmLName.value,
				email: form.elements.frmEmail.value,
				position: form.elements.frmPosition.value,
				department: form.elements.frmDepartment.value,
				dateOfHire: isEditForm ? `${form.elements.frmDateOfHire.value}T00:00:00`:form.elements.frmDateOfHire.value,
				baseSalary: form.elements.frmBaseSalary.value,
				address: form.elements.frmAddress.value,
				city: form.elements.frmCity.value,
				state: form.elements.frmState.value,
				postcode: form.elements.frmPostcode.value,
			};

			_apiServiceAddEdit(postData)
				.then(response => response.json())
				.then( response => {
					setIsFormSubmitting(false);
					if ( response?.errors || response?.status == 400 ) {
						setErrorMessage(`Failed to ${isEditForm ? 'update':'add new'} employee. Error occurred`);
						console.error('Errors: ', response);
						return;
					}
					navigate(routes[1].path); // /employee/listing
				})
				.catch( error => {
					setIsFormSubmitting(false);
					setErrorMessage(error.toString());
				});
		}

		// Prevent default and mark form validated
		setFormValidated(true);
		event.preventDefault();
	};

	return (
		<main>
			<div className='width-1000'>
				<Form noValidate validated={formValidated} onSubmit={_handleFormSubmit}>
					<div className=' main-box'>
						<h1 className='mb-4'>{isEditForm ? 'Update Employee':'Add Employee'}</h1>
						{isEditForm && isFormLoading && <Spinner as='span' size='sm' animation='border' variant='danger' style={{marginRight: '10px'}} /> }

						{(!isEditForm || (isEditForm && !isFormLoading)) &&
							<EmployeeForm
								handleFormSubmit={_handleFormSubmit}
								employeeStore={value.stores.employeeStore}
								employee={employee}
								isEditForm={isEditForm}
							/>
						}
					</div>

					<div className='my-4'>
						<div className='clearfix'>
							<Button type='submit' className='float-end' variant='outline-danger' disabled={isFormSubmitting}>
								{isFormSubmitting && <Spinner as='span' size='sm' animation='border' variant='danger' style={{marginRight: '10px'}} /> }
								{isEditForm ? 'Update':'Add'} Employee <i className='bi bi-caret-right-fill' /></Button>
						</div>
					</div>

					{ errorMessage && <Alert key={0} variant={'danger'} className='text-end'><>{errorMessage}</></Alert> }
				</Form>
			</div>
		</main>
	);
}

export default EmployeeAddEdit;
