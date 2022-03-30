import axios from 'axios'
import store from '../store'



const service = axios.create({
    // baseURL: "https://api.github.com/"
    baseURL: process.env.API_ROOT
})

// 拦截器
service.interceptors.request.use(
    config => {
        // let token = store.state.token.temp
        // console.log("token",token)
        // if (token) {
        //     config.headers.Authorization = `token ${token}`
        // }
        console.log("config",config)
        return config
    },
    error => {

    }
)

service.interceptors.response.use(
    response => {
        console.log("request.js",response)
        return response;
    },
    err => {
        // if(err.response.status == 401){
        //     console.log("请求失败,token有误")
        // }
        // console.log('token有误')
    }

)

export default service