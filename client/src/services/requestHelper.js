const apiUrl = 'http://localhost:3333/api';

export const get = async (entityName, id = '') => {
    return await makeRequest(`${entityName}/${id}`, 'GET');
}

export const post = async (entityName, body) => {
    return await makeRequest(entityName, 'POST', body);
}

export const patch = async (entityName, id, body) => {
    return await makeRequest(`${entityName}/${id}`, 'PATCH', body);
}

export const deleteReq = async (entityName, id) => {
    return await makeRequest(`${entityName}/${id}`, 'DELETE');
}

const makeRequest = async (path, method, body, fightLog = undefined) => {
    try {
        const url = `${apiUrl}/${path}`

        const user = localStorage.getItem('user');
        const logString = JSON.stringify(fightLog);
        if (user) {
            headers['User'] = user;
        }

        if (logString) {
            headers['Fight-lod'] = logString
        }

        const headers = {
            "Content-Type": "application/json"
        };

        const res = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : undefined,

        });

        const dataObj = await res.json();

        if (res.ok) {
            return dataObj;
        }

        alert(`${dataObj.message}`);
        return dataObj;
    } catch (err) {
        console.error(err);
    }
}