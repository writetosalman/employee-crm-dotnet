
/**
 * This function makes copy of the array of objects
 * @param currentArray
 */
export function getCopy_ArrayOfObjects(currentArray) {
    return currentArray.map( function(arr) {
        return Object.assign({}, arr);
    });
}

/**
 * Get new array after deleting an item
 * @param arrToSearch
 * @param idToDelete
 * @returns array
 */
export function deleteArrayById(arrToSearch, idToDelete) {
    return deleteArrayByKey(arrToSearch, idToDelete, 'id');
}

/**
 * Get new array after deleting an item
 * @param arrToSearch
 * @param idToDelete
 * @returns array
 */
export function deleteArrayByUId(arrToSearch, idToDelete) {
    return deleteArrayByKey(arrToSearch, idToDelete, 'uid');
}

/**
 * Get new array after deleting an item by key
 * @param arrToSearch
 * @param idToDelete
 * @param key
 * @returns array
 */
export function deleteArrayByKey(arrToSearch, idToDelete, key = 'id') {
    let arrToReturn = [];
    for ( let x=0; x < arrToSearch.length; x++ ) {
        if ( arrToSearch[x] && arrToSearch[x][key] !== idToDelete )
            arrToReturn.push(arrToSearch[x]);
    }
    return arrToReturn;
}

/**
 * Get INDEX of array
 * @param arrToSearch
 * @param idToLookFor
 * @returns {number|Number}
 */
export function getArrayIndexById(arrToSearch, idToLookFor) {
    // Found this great function from here: https://stackoverflow.com/questions/10557486/in-an-array-of-objects-fastest-way-to-find-the-index-of-an-object-whose-attribu
    // return arrToSearch.map(function(x) { return parseInt(x.id, 10); }).indexOf(intIdToLookFor);

    return getArrayIndexByKey(arrToSearch, idToLookFor);
}

/**
 * Get INDEX of array by searching key
 * @param arrToSearch
 * @param idToLookFor
 * @param key
 * @returns {number|Number}
 */
export function getArrayIndexByKey(arrToSearch, idToLookFor, key = 'id') {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    for ( let x=0; x < arrToSearch.length; x++ ) {
        //console.log('LOOP >>>', arrToSearch[x][key]);
        if ( arrToSearch[x][key] === idToLookFor )
            return x;
    }
    return -1;
}

/**
 * Get array element by index
 * @param arrToSearch
 * @param idToLookFor
 * @returns {number|object}
 */
export function getArrayElementById(arrToSearch, idToLookFor) {
    return getArrayElementByKey(arrToSearch, idToLookFor, 'id');
}

/**
 * Get array element by index
 * @param arrToSearch
 * @param idToLookFor
 * @param key
 * @returns {number|object}
 */
export function getArrayElementByKey(arrToSearch, idToLookFor, key = 'id') {
    if (!idToLookFor) {
        return false;
    }

    for ( let x=0; x < arrToSearch.length; x++ ) {
        //console.log('LOOP >>> ', arrToSearch[x].id);
        //console.log('LOOP: ', arrToSearch[x][key], idToLookFor);
        if ( arrToSearch[x][key] === idToLookFor )
            return arrToSearch[x];
    }
    return false;
}

/**
 * Get array element attribute by index
 * @param arrToSearch
 * @param idToLookFor
 * @param columnToReturn
 * @param key
 * @returns {boolean|object}
 */
export function getArrayElementAttributeByKey(arrToSearch, idToLookFor, columnToReturn, key = 'id') {
    if (!idToLookFor || !columnToReturn) {
        return false;
    }

    const ele = getArrayElementByKey(arrToSearch, idToLookFor, key);

    if ( ele === false ) return false;

    return ele[columnToReturn];
}

/************************************************************************************************/

/**
 * V2 functions
 * They work with array of type [ {id: '1000'} , {name: 'Salman'}, {url: 'www.google.com'} ]
 */

/**
 * Add a key/value to each array object
 * @param arrToAdd
 * @param element to add
 * @param elementKey to add
 * @returns {number|object}
 */
export function addElementToArray({arrayToAdd = null, element = null, elementKey = 'key'}) {
    const arrToReturn = [];

    for ( let x=0; x < arrayToAdd.length; x++ ) {
        // console.log('LOOP >>>', arrToSearch[x].id);
        const item = arrayToAdd[x];
        item[elementKey] = element;
        arrToReturn.push(item);
    }
    return arrToReturn;
}

/**
 * This function returns an array of index
 * @param arrayOfObjects
 * @param keyToSearch
 * @returns {number}
 */
export function getArrayIndexByObjectKey({arrayOfObjects = null, keyToSearch = 'id'}) {

    if (arrayOfObjects) {
        for ( let x=0; x < arrayOfObjects.length; x++ ) {
            // console.log('LOOP >>>', keyToSearch, arrayOfObjects[x][keyToSearch]);
            if (arrayOfObjects[x][keyToSearch]) {
                return x;
            }
        }
    }
    return -1;
}

/**
 * Delete an index from array
 * @param arrayOfObjects
 * @param keyToSearch
 * @returns {[]}
 */
export function deleteArrayElementByObjectKey({arrayOfObjects = null, keyToSearch = 'id'}) {
    const index = getArrayIndexByObjectKey({arrayOfObjects, keyToSearch});
    const arrayToReturn = [];

    for ( let x=0; x < arrayOfObjects.length; x++ ) {
        if (x === index) {
            continue;
        }
        arrayToReturn.push(arrayOfObjects[x]);
    }

    return arrayToReturn;
}

/**
 * Get array element by object key
 * @param arrayOfObjects
 * @param keyToSearch
 * @returns {null|*}
 */
export function getArrayElementByObjectKey({arrayOfObjects = null, keyToSearch = 'id'}) {
    const index = getArrayIndexByObjectKey({arrayOfObjects, keyToSearch});

    if (index >= 0) {
        return arrayOfObjects[index];
    }

    return null;
}

/**
 * This function returns an array of index searching by key and value
 * @param arrayOfObjects
 * @param keyToSearch
 * @param keyValueToMatch
 * @returns {number}
 */
export function getArrayIndexByObjectKeyValue({arrayOfObjects = null, keyToSearch = 'id', keyValueToMatch = null}) {

    if (arrayOfObjects) {
        for ( let x=0; x < arrayOfObjects.length; x++ ) {
            // console.log('LOOP >>>', keyToSearch, arrayOfObjects[x][keyToSearch]);
            if (arrayOfObjects[x][keyToSearch]) {
                if (arrayOfObjects[x][keyToSearch] === keyValueToMatch) {
                    return x;
                }
            }
        }
    }
    return -1;
}

/**
 * This function converts a string into an array
 * @param mixedToConvert
 * @param stringDelimiter
 */
export function convertStringIntoArray({mixedToConvert, strDelimiter = ','}) {
    if (typeof mixedToConvert === 'string') {
        return mixedToConvert.split(strDelimiter)
    }
    if (Array.isArray(mixedToConvert)) {
        return mixedToConvert;
    }
    return [];
}

export function pushToArrayIfNotExists(arr, add) {
    if (!Array.isArray(arr)) {
        arr = [];
    }

    // Item not found, add it
    if (!arr.includes(add)) {
        arr.push(add);
    }
    return arr;
}