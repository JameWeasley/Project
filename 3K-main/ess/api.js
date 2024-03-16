import Axios from "axios";
const api = (typeof window !== "undefined") && Axios.create({
    baseURL: window.location.protocol + "//" + window.location.host + '/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 10000,
});

export default api;