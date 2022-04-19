const baseUrl    = 'http://localhost:5001/api/v1';
const headers    = {
    'Content-Type': 'application/json',
};

export const EmployeeListService = async () => fetch(
     `${baseUrl}/Employees`,
    {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: headers,
    },
);

export const EmployeeDeleteService = async id => fetch(
    `${baseUrl}/Employees/${id}`,
    {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: headers,
    },
);

export const EmployeeAddService = async data => fetch(
    `${baseUrl}/Employees`,
    {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        //credentials: 'omit', // include|same-origin|omit https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        headers: headers,
        body: JSON.stringify(data),
    },
);

export const EmployeeUpdateService = async (id, data) => fetch(
    `${baseUrl}/Employees/${id}`,
    {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        //credentials: 'omit', // include|same-origin|omit https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        headers: headers,
        body: JSON.stringify(data),
    },
);

export const EmployeeGetService = async id => fetch(
    `${baseUrl}/Employees/${id}`,
    {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: headers,
    },
);