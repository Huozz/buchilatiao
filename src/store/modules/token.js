import cookies from "../../utils/cookies";
import UserApi from '../../api/user';
import Vue from 'vue';
import store from "../../store";

const TOKEN_KEY = "TOKEN_KEY";
const token={
    state:{
        token: cookies.getAttribute(TOKEN_KEY),
        temp: ''
    } ,
    mutations:{
        // 设置新的token，mutations中的参数一个是state，另一个是设置的新value
        SET_TOKEN: (state, value) =>{
            state.token = value;
            cookies.setAttribute(TOKEN_KEY, value,30)
        },
        REMOVE: (state) =>{
            state.token = null;
            cookies.remove(TOKEN_KEY)
        },
        SET_TEMP: (state, value) => {
            state.temp = value
        }
    },
    actions:{
        Authentic(context,accessToken){
            console.log(accessToken)
            context.commit('SET_TEMP',accessToken)
            UserApi.verifyToken(accessToken).then((response)=>{
                let result = response.data
                console.log(result)
                let githubUsername = store.state.configuration.githubUsername
                console.log(githubUsername)
                console.log(result['login']==githubUsername)
                if (githubUsername == result['login']){
                    context.commit('SET_TOKEN',accessToken)
                    Vue.prototype.$notify({
                        title: '成功',
                        message: '绑定成功',
                        type:'success' 
                    })
                }else{
                    Vue.prototype.$message({
                        title: 'Token和用户名不一致',
                        type:'error'
                    })
                }
            }).catch(()=>{

            })
        },
        CancleAuthentic(context){
            context.commit('REMOVE')
            Vue.prototype.$message({
                message:'token取消绑定',
                type: 'info'
            })
        }
    }
    
}

export default token
