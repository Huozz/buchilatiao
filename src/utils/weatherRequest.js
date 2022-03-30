import axios from 'axios'

let instance2 = axios.create({
    baseURL: process.env.BASE_API
})

instance2.interceptors.request.use(
    config => {
        console.log(process.env.BASE_API)
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

export default instance2