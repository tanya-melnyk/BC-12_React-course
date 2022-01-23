import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// axios.defaults.baseURL = 'https://api.example.com';

// const fetchData = async (path, options = {}) => {
//   const res = await fetch(`${BASE_URL}/${path}.json`, options);
//   return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
// };

const getData = async (endpoint, options = {}) => {
  const { data } = await axiosInstance.get(`/${endpoint}.json`, options);
  return data;
};

const saveItem = async (endpoint, item, options = {}) => {
  const { data } = await axiosInstance.post(`/${endpoint}.json`, item, options);
  return data;
};

const editItem = async (endpoint, item, options = {}) => {
  const { data } = await axiosInstance.put(`/${endpoint}.json`, item, options);
  return data;
};

// const deleteItem = (endpoint, id, options = {}) =>
//   fetchData(`${endpoint}/${id}`, { method: 'DELETE', ...options });

const deleteItem = async (endpoint, id, options = {}) => {
  const { data } = await axiosInstance.delete(
    `/${endpoint}/${id}.json`,
    options,
  );
  return data;
};

export { getData, saveItem, editItem, deleteItem };

// const fetchData = async (path, options = {}) => {
//   const res = await fetch(`${BASE_URL}/${path}.json`, options);
//   return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
// };

// const getData = (endpoint, options) => fetchData(endpoint, options);

// const saveItem = (endpoint, item, options = {}) => {
//   const finalOptions = {
//     method: 'POST',
//     body: JSON.stringify(item),
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     ...options,
//   };
//   return fetchData(endpoint, finalOptions);
// };

// const editItem = (endpoint, item, options = {}) => {
//   const finalOptions = {
//     method: 'PUT',
//     body: JSON.stringify(item),
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     ...options,
//   };
//   return fetchData(`${endpoint}/${item.id}`, finalOptions);
// };

// const deleteItem = (endpoint, id, options = {}) =>
//   fetchData(`${endpoint}/${id}`, { method: 'DELETE', ...options });

// export { getData, saveItem, editItem, deleteItem };
