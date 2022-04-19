import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';

import PriceTextField from '../../../../../components/forms/PriceTextField';
import { renderStateSelect, getDateForFormField } from '../../../../../utils';

const EmployeeForm = props => {
    const { employee, employeeStore, isEditForm } = props;

    const todayDate = new Date();
    const todayDateStr = getDateForFormField(todayDate);
    console.log('isEditForm ', isEditForm);
    console.log('edit ', employee?.dateOfHire?.substring(0, 10));

    if ( isEditForm && !employee ) return null;

    return (
        <div>

            <Form.Group as={Row} className='mb-4' controlId='frmFName'>
                <Form.Label column md='6' className='required'>First name</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='First name' required defaultValue={ employee?.fName } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmLName'>
                <Form.Label column md='6' className='required'>Last name</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='Last name' required defaultValue={ employee?.lName } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmEmail'>
                <Form.Label column md='6' className='required'>Email address</Form.Label>
                <Col md='6'>
                    <Form.Control type='email' placeholder='Email Address' required
                                  defaultValue={ employee?.email }
                                  pattern='[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{1,}'
                    />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email address</Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmPosition'>
                <Form.Label column md='6' className=''>Position</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='Position' defaultValue={ employee?.position } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmDepartment'>
                <Form.Label column md='6' className=''>Department</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='Department' defaultValue={ employee?.department } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmDateOfHire'>
                <Form.Label column md='6' className=''>Date of hire</Form.Label>
                <Col md='6'>
                    <Form.Control type='date' placeholder='DD/MM/YYYY' defaultValue={ employee?.dateOfHire ? employee?.dateOfHire.substring(0, 10):todayDateStr } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmBaseSalary'>
                <Form.Label column md='6' className='required'>Base salary</Form.Label>
                <Col md='6'>
                    <PriceTextField
                        labelPurchasePrice='Base salary per annum'
                        idName='frmBaseSalary'
                        defaultPurchasePrice={ employee?.baseSalary }
                        minPrice={10000}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmAddress'>
                <Form.Label column md='6' className=''>Address</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='Address' defaultValue={ employee?.address } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmCity'>
                <Form.Label column md='6' className=''>City</Form.Label>
                <Col md='6'>
                    <Form.Control type='text' placeholder='City' defaultValue={ employee?.city } />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmState'>
                <Form.Label column md='6' className=''>State</Form.Label>
                <Col md='6'>
                    <Form.Select aria-label='Select state' defaultValue={ employee?.state }>
                        <option value=''>Select state</option>
                        { renderStateSelect(employeeStore.getStates(), employee?.state) }
                    </Form.Select>
                    <Form.Control.Feedback />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-4' controlId='frmPostcode'>
                <Form.Label column md='6' className=''>Post code</Form.Label>
                <Col md='6'>
                    <Form.Control type='number' placeholder='Post code' defaultValue={ employee?.postcode } />
                </Col>
            </Form.Group>
        </div>
    );
};

export default EmployeeForm;
