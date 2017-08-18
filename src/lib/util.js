function requestData (object) {
    let queryStr = '';
    let keys = Object.keys(object);
    for (let key of keys) {
        let value = encodeURIComponent(object[key]);
        queryStr += `&${key}=${value}`;
    }

    return queryStr.replace(/^&/, '');
}

function parseQuery() {
    let query = window.location.search.substring(1);
    let result = {};
    let parts = query.split('&');
    for (let part of parts) {
        let [key, value] = part.split('=', 2);
        if (parts[key] !== undefined) {
            parts[key] = [
                ...parts[key],
                value
            ];
        } else {
            parts[key] = value;
        }
    }

    return result;
}

function backendUrl(path = '') {
    return 'backend/' + path;
}

export { requestData, backendUrl };