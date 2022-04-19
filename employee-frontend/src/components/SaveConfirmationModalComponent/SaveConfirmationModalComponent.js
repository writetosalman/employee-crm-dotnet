import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const SaveConfirmationModalComponent = ({quotation, showConfirmationModal, setShowConfirmationModal, handleContinue}) => {

	/**
	 * This function hides confirmation modal
	 */
	const showSaveConfirmationModal = () => {
		setShowConfirmationModal(false);
	}

	return (
		<div>
			<Modal show={showConfirmationModal} onHide={showSaveConfirmationModal}>
				<Modal.Header closeButton>
					<Modal.Title>Quote Saved.</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Your quote has been successfully saved.<br />
					Please use your quote ID <b>{quotation?.quoteId}</b> and email address <b>{quotation?.email}</b> to retrieve quote later.
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-danger' href='https://www.achmea.com.au/'>Home</Button>
					<Button variant='outline-danger' onClick={handleContinue}>Continue  <i className='bi bi-caret-right-fill' /></Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

SaveConfirmationModalComponent.propTypes = {
	showConfirmationModal: PropTypes.bool.isRequired,
	setShowConfirmationModal: PropTypes.func.isRequired,
	handleContinue: PropTypes.func.isRequired,
	quotation: PropTypes.object,
};

export default SaveConfirmationModalComponent;
