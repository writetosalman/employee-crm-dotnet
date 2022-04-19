
export const getDateForFormField = dt => {
    const {dd, mm, yyyy} = getDateElements(dt);
    return yyyy + '-' + mm + '-' + dd;
};

export const getTodayDateForFormField = () => {
    return getDateForFormField(new Date());
};

export const getTodayDateForHuman = () => {
    const {dd, mm, yyyy} = getDateElements(new Date());
    return dd + '-' + mm + '-' + yyyy;
};

export const getTodayDate = getTodayDateForHuman;

export const getDateElements = dt => {
    const dd = String(dt.getDate()).padStart(2, '0');
    const mm = String(dt.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dt.getFullYear();

    return {dd, mm, yyyy};
};

// Convert from "12/12/2021" to "2022-01-01"
export const convertDateToSetDateFieldFormat = dt => {
    // TODO
};

export const convertGWDateForDisplay = dt => {
    // slice(-2) will always return last 2 digits
    return `${('0'+dt?.day).slice(-2)}-${('0'+ ( parseInt(dt?.month, 10)+1) ).slice(-2)}-${dt?.year}`;
}

export const convertGWDateForStore = dt => {
    return `${dt?.year}-${('0'+ ( parseInt(dt?.month, 10)+1) ).slice(-2)}-${('0'+dt?.day).slice(-2)}`;
}