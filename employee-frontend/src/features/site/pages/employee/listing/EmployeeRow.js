import React, {useState, useContext, useEffect} from 'react';

const EmployeeRow = ({listItem}) => {
    /**
     * Load employees for first time
     */
    useEffect( () => {
    }, []);

    return (
        <div>
            {listItem.fName} {listItem.lName}<br />
            <small>Email: <a href={`mailto:${listItem.email}`}>{listItem.email}</a></small>
        </div>
    );
}

export default EmployeeRow;
