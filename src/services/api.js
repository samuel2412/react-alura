import axios from 'axios';

const api = axios.create({baseURL: 'https://cdc-react.herokuapp.com/api'});

export default api;