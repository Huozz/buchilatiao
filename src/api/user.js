import request from '../utils/request'
import store from '../store/index'

export default {
    getInfo: function(){
        let githubUsername = store.state.configuration.githubUsername;
        return request({
            url: '/users/'+githubUsername
        })
    },
    following: function(query){
        let githubUsername = store.state.configuration.githubUsername
        return request({
            url:`/users/${githubUsername}/following?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    info: function(githubUsername){
        return request({
            url: `/users/${githubUsername}`
        })
    },
    verifyToken: function(token){
        return request({
            url: '/user'
        })
    }

}