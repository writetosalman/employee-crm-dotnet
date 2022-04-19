import React from 'react';
import {Col, Row} from 'react-bootstrap';

export const renderHtml = text => {
    if (typeof text === 'string') {
        const linkMatches = text.match(/(https?:\/\/.*?)[.!?;,]?(\s+|"|$)/g);
        if (linkMatches && linkMatches.length) {
            linkMatches.forEach(match => {
                match = match.trim();
                text = text.replace(match, `<a href="${match}" target=_blank>${match}</a>`);
            });
        }

        const coinMatches = text.match(/(\s+|"|^)[$|#](\w*\d*)(\s+|"|$)/g);
        if (coinMatches && coinMatches.length) {
            coinMatches.forEach(match => {
                match = match.trim();
                text = text.replace(match, `<span class="coin-name">${match}</span>`);
            });
        }
    }
    return text;
};

export const renderStateSelect = (states, selectedState) => {
    return states.map ( (state, index) => (
        <option value={state.id} selected={selectedState === state.id} key={index}>{state.name}</option>
    ));
}

export const getAddressBreakdown = address => {
    const obj = {};

    if ( !address )
        return obj;

    if ( typeof address !== 'string' )
        return obj;

    const commaParts = address.trim().split(',');

    // If Unit is also included
    if ( commaParts.length === 3 ) {
        obj.unit = commaParts[0].trim();
        obj.addressLine1 = commaParts[1].trim();
        return {
            ...obj,
            ...getStateBreakdown(commaParts[2]),
        }
    }
    else if ( commaParts.length === 2 ) {
        obj.addressLine1 = commaParts[0].trim();
        return {
            ...obj,
            ...getStateBreakdown(commaParts[1]),
        }
    }
};

const getStateBreakdown = address => {
    const spaceParts = address.trim().split(' ');
    if ( spaceParts.length === 3 ) {
        return {
            city: spaceParts[0].trim(),
            state: spaceParts[1].trim(),
            postCode: spaceParts[2].trim(),
        };
    }

    const addressParts = spaceParts.slice(0, (spaceParts.length-2));
    return {
        city: addressParts.join(' ').trim(),
        state: spaceParts[(spaceParts.length-2)].trim(),
        postCode: spaceParts[(spaceParts.length-1)].trim(),
    };
};

/**
 * This function renders a single row
 * @param label
 * @param value
 * @returns {JSX.Element}
 */
export const renderSingleRow = (label, value) => {
    return (
        <>
            <Row className='row-ex'>
                <Col xs='6' className='gray-border'>{label}</Col>
                <Col xs='6' className='gray-border text-wrap' style={{wordWrap: 'break-word'}}>{value}</Col>
            </Row>
        </>
    );
};

/**
 * This function returns uppercase for first letter
 * @param str
 * @returns {string}
 */
export const upperCaseFirstLetter = str => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

/**
 * This function returns level of cover
 * @param levelOfCover
 * @returns {string}
 */
export const getLevelOfCoverFromStar = levelOfCover => {
    return levelOfCover === 'three_star' ? '3':( levelOfCover === 'two_star' ? '2':'1' );
}