const BASE_URL =
  'https://university-4b8f0-default-rtdb.europe-west1.firebasedatabase.app';

const fetchData = async (path, options = {}) => {
  const res = fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getData = (endpoint, options) => fetchData(`${endpoint}.json`, options);

const saveItem = (endpoint, data, options) => {
  const finalOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  return fetchData(`${endpoint}.json`, finalOptions);
};

const editItem = (endpoint, id, data, options) => {
  const finalOptions = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  return fetchData(`${endpoint}/${id}.json`, finalOptions);
};

const deleteItem = (endpoint, id, options) =>
  fetchData(`${endpoint}/${id}.json`, {
    method: 'DELETE',
    ...options,
  });

export { getData, saveItem, editItem, deleteItem };
