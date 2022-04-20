import cookies from "../../utils/cookies";
import UserApi from '../../api/user';
import Vue from 'vue';
import store from "../../store";

const TOKEN_KEY = "TOKEN_KEY";
const token={
    state:{
        // token: cookies.getAttribute(TOKEN_KEY),
        token : window.sessionStorage.getItem('token') || '',
        temp: ''
    } ,
    mutations:{
        // 设置新的token，mutations中的参数一个是state，另一个是设置的新value
        SET_TOKEN: (state, value) =>{
            state.token = value;
            window.sessionStorage.setItem('token',value);
            cookies.setAttribute(TOKEN_KEY, value,30)
        },
        REMOVE: (state) =>{
            state.token = null;
            window.sessionStorage.removeItem('token');
            cookies.remove(TOKEN_KEY)
        },
        SET_TEMP: (state, value) => {
            state.temp = value
        }
    },
    actions:{
        Authentic(context,accessToken){
            context.commit('SET_TOKEN',accessToken)
        },

        CancleAuthentic(context){
            context.commit('REMOVE')
            Vue.prototype.$message({
                message:'退出登录',
                type: 'info'
            })
        }
    }
    
}

export default token
