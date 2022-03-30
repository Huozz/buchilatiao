import axios from 'axios'

const instance1 = axios.create({
    baseURL: process.env.BASE_API
})

instance1.interceptors.request.use(
    config => {
        console.log(process.env.BASE_API)
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

export default instance1