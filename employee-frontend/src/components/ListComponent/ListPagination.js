import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const ListPagination = (props) => {
    const { totalRecords, pageSize, currentPage, onPageChange } = props;
    const totalPages = Math.ceil(totalRecords / ( pageSize ? pageSize:10 ));

    // Left & Right button limits
    const pageToLeft = 2;
    const pageToRight = 2;

    // Pagination start
    const paginationStart = (currentPage - pageToLeft) > 1 ? (currentPage - pageToLeft) : 1;
    const paginationEnd = (currentPage + pageToRight) > totalPages ? totalPages : ((currentPage + pageToRight) < 5 ? (5 < totalPages?5:totalPages) : (currentPage + pageToRight));

    // Page Buttons
    const pageButtons = [];
    for (let index = paginationStart; index <= paginationEnd; index++) {
        pageButtons.push(<Pagination.Item key={index} active={index === currentPage} onClick={() => onPageChange(index)}>{index}</Pagination.Item>);
    }
    return (
        <div style={{padding: '10px 0'}}>
            <Pagination>
                <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
                {pageButtons}
                <Pagination.Last onClick={() => onPageChange(totalPages)}  disabled={currentPage === totalPages} />
                <span style={{display: 'inline', lineHeight: '38px'}}>
                    &nbsp; Total: {totalRecords}
                </span>
            </Pagination>
        </div>
    );
}

ListPagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalRecords: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
};
ListPagination.defaultProps = {
    pageSize: 10,
};

export default ListPagination;