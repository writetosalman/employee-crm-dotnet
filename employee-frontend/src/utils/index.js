import { getCopy_ArrayOfObjects, deleteArrayById, deleteArrayByUId, deleteArrayByKey, getArrayIndexById, getArrayIndexByKey, getArrayElementById,
    getArrayElementByKey, addElementToArray, getArrayIndexByObjectKey, deleteArrayElementByObjectKey, getArrayElementByObjectKey, getArrayIndexByObjectKeyValue,
    convertStringIntoArray, pushToArrayIfNotExists, getArrayElementAttributeByKey } from './array';

import { renderHtml, renderSingleRow, renderStateSelect, getAddressBreakdown, upperCaseFirstLetter, getLevelOfCoverFromStar } from './mixed';
import { getDateElements, getTodayDate, getTodayDateForHuman, getDateForFormField, getTodayDateForFormField, convertGWDateForDisplay, convertGWDateForStore } from './date';
import { getFormattedPrice, getFormattedNumber, getFormattedPercentage, getPriceInShortWord, formatTimeFromTimestamp } from './numberFormatter';

export {
    getCopy_ArrayOfObjects,
    deleteArrayById,
    deleteArrayByUId,
    deleteArrayByKey,
    getArrayIndexById,
    getArrayIndexByKey,
    getArrayElementById,
    getArrayElementByKey,
    getArrayElementAttributeByKey,
    addElementToArray,
    getArrayIndexByObjectKey,
    deleteArrayElementByObjectKey,
    getArrayElementByObjectKey,
    getArrayIndexByObjectKeyValue,
    convertStringIntoArray,
    pushToArrayIfNotExists,

    renderHtml,
    renderSingleRow,
    renderStateSelect,
    getAddressBreakdown,
    upperCaseFirstLetter,
    getLevelOfCoverFromStar,

    getDateElements,
    getTodayDate,
    getTodayDateForHuman,
    getDateForFormField,
    getTodayDateForFormField,
    convertGWDateForDisplay,
    convertGWDateForStore,

    getFormattedPrice,
    getFormattedNumber,
    getFormattedPercentage,
    getPriceInShortWord,
    formatTimeFromTimestamp
};