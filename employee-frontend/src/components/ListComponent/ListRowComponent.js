import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListRowComponent = props => {
    const { listItem, onDelete, slug, ListItemComponent } = props;

    /**
     * This function is called upon pressing delete button
     * @param e
     * @param listItem
     */
    const _onDelete = (e, listItem) => {
        e?.preventDefault();

        if (!listItem) return;
        if (typeof onDelete === 'function') onDelete(listItem);
    };


    if (!listItem ) return null;

    return (
        <>
            {listItem &&
            <tr>
                <td>{listItem.id}</td>
                <td>
                    <div>
                        <ListItemComponent
                            listItem={listItem}
                        />
                    </div>
                </td>
                <td>
                    <div className='listItem-btn-actions'>
                        <Link to={`/${slug}/edit/${listItem.id}`}>
                            <Button variant='primary' className='inline m-1'><FontAwesomeIcon icon={faPen}/></Button>
                        </Link>

                        <Link to='#'>
                            <Button variant='danger' className='inline m-1' onClick={(e) => {_onDelete(e, listItem);}}><FontAwesomeIcon icon={faTrash}/></Button>
                        </Link>
                    </div>
                </td>
            </tr>
            }
        </>
    );
};

ListRowComponent.propTypes = {
    ListItemComponent: PropTypes.object.isRequired,
    listItem: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    slug: PropTypes.string,
};
ListRowComponent.defaultProps = {
    slug: 'list',
};

export default ListRowComponent;