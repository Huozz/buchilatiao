import Vue from 'vue'
import Vuex from 'vuex'
import configuration from './modules/configuration'
import users from './modules/users'
import token from './modules/token'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
        modules:{
            configuration,
            users,
            token
        },
        getters
    
})

export default store