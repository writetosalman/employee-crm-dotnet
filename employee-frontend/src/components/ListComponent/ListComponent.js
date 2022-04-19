import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import ListTable from './ListTable';
import DeleteComponent from '../DeleteComponent';

const ListComponent = props => {
    const { serviceGetList, serviceDeleteList, slug, heading, ListItemComponent } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [lists, setLists] = useState([]);
    const pageSize = 10;

    /**
     * This function fetches all lists from API and updates
     */
    const getAllLists = () => {
        serviceGetList()
            .then(response => response.json())
            .then( lists => {
                setIsLoading(false);
                if (Array.isArray(lists)) setLists(lists);
                else setErrorMessage('Failed to load');
            })
            .catch( error => {
                setIsLoading(false);
                setErrorMessage(error.toString());
            });
    };

    /**
     * This function is called when someone presses delete button
     * @param list
     */
    const onDelete = list => {
        setShowDeleteModal(true);
        setListToDelete(list);
    }

    /**
     * Load lists from endpoint on first load
     */
    useEffect( () => {
        getAllLists();
    }, []);

    return (
        <div>
            {isLoading && <Spinner animation='border' size='lg' variant='primary' />}

            <ListTable
                ListItemComponent={ListItemComponent}
                pageSize={pageSize}
                isLoading={isLoading}
                lists={lists}
                slug={slug}
                heading={heading}
                onDelete={onDelete}
            />

            { errorMessage && <Alert key={0} variant={'danger'}>{errorMessage}</Alert> }

            <DeleteComponent
                list={listToDelete}
                toggleShowModal={setShowDeleteModal}
                showModal={showDeleteModal}
                reloadLists={getAllLists}
                serviceDeleteList={serviceDeleteList}
            />
        </div>
    );
}

ListComponent.propTypes = {
    ListItemComponent: PropTypes.object.isRequired,
    serviceGetList: PropTypes.func.isRequired,
    serviceDeleteList: PropTypes.func.isRequired,
    slug: PropTypes.string,
    heading: PropTypes.string,
};
ListComponent.defaultProps = {
    slug: 'list',
    heading: 'List'
};

export default ListComponent;