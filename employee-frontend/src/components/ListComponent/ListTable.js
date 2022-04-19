import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

import ListRowComponent from './ListRowComponent';
import ListRowNotFound from './ListRowNotFound';
import ListPagination from './ListPagination';

const ListTable = props => {
    const { lists, pageSize, onDelete, slug, heading, ListItemComponent } = props;
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Handle page changes
     * @param page
     */
    const onPageChange = page => {
        setCurrentPage(page);
    }

    const listsOfCurrentPage = lists && lists.length ? lists.slice( ((currentPage-1)*pageSize), ((currentPage-1)*pageSize) + pageSize ) : lists;

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:'100px'}}>ID</th>
                        <th>{heading}</th>
                        <th style={{width:'120px'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listsOfCurrentPage && listsOfCurrentPage.map( (list, index) => {
                        return (
                            <ListRowComponent
                                key={index}
                                ListItemComponent={ListItemComponent}
                                listItem={list}
                                slug={slug}
                                onDelete={onDelete}
                            />
                        );
                    })}
                    {!listsOfCurrentPage && <ListRowNotFound />}
                </tbody>
            </Table>

            <ListPagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalRecords={lists.length}
                pageSize={pageSize}
            />
        </>
    );
};

ListTable.propTypes = {
    ListItemComponent: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    lists: PropTypes.array,
    pageSize: PropTypes.number,
    slug: PropTypes.string,
    heading: PropTypes.string,
};
ListTable.defaultProps = {
    pageSize: 10,
    slug: 'list',
    heading: 'List',
};

export default ListTable;