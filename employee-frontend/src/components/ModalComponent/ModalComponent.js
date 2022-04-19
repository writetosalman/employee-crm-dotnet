import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = ({title, btnLabel, body, showModal, onHideModal}) => {

	/**
	 * This function hides modal
	 */
	const _hideModal = () => {
		onHideModal(false);
	}

	return (
		<div>
			<Modal show={showModal} onHide={_hideModal}>
				<Modal.Header closeButton>
					<Modal.Title>{title || 'Confirm'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{body}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-danger' onClick={_hideModal}>{btnLabel || 'Close'}</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

ModalComponent.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onHideModal: PropTypes.func.isRequired,
	body: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]).isRequired,
	title: PropTypes.string,
	btnLabel: PropTypes.string,
};

export default ModalComponent;
