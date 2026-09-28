import axios from 'axios';

const api = axios.create({
    baseURL: "https://crudcrud.com/api/fc50713ac92b4af498b7bc5b1d77cc39"
})

export default api