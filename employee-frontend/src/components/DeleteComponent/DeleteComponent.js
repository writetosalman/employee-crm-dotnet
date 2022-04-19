import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal, Form, Button } from 'react-bootstrap';

const DeleteComponent = (props) => {
    const { list, showModal, toggleShowModal, reloadLists, serviceDeleteList } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Toggle modal
     */
    const closeModal = () => {
        toggleShowModal(false);
    };

    /**
     * Call API to delete modal
     */
    const onConfirmPressed = () => {
        if (!list) {
            setErrorMessage('Unable to delete. List ID unknown');
            return;
        }
        serviceDeleteList(list.id)
            .then( () => {
                setIsDeleting(false);
                reloadLists();
                closeModal();
            })
            .catch( error => {
                setIsDeleting(false);
                setErrorMessage(error.toString());
                closeModal();
            });
    };

    return (
        <>
            {list &&
                <Modal show={showModal} onHide={closeModal}>
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete ID {list.id}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={onConfirmPressed} disabled={isDeleting}>
                                { !isDeleting && <span>Delete</span> }
                                { isDeleting && <span>Deleting</span> }
                            </Button>
                            <Button variant='outline-secondary' onClick={closeModal} style={{marginLeft: '15px'}} disabled={isDeleting} >Cancel</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }

            { errorMessage && <Alert key={0} variant={'danger'} style={{marginTop:'15px'}}>{errorMessage}</Alert> }
        </>
    );
};

DeleteComponent.propTypes = {
    serviceDeleteList: PropTypes.func.isRequired,
    reloadLists: PropTypes.func.isRequired,
    toggleShowModal: PropTypes.func.isRequired,
    list: PropTypes.object,
    showModal: PropTypes.bool,
};
DeleteComponent.defaultProps = {
    showModal: false,
};

export default DeleteComponent;