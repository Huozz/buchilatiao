import UserAPI from '../../api/user'
const user = {
    state:{
        avatarUrl: null,
        name: null,
        location: null,
        blog: null,
        followers: 0,
        following: 0
    },
    mutations:{
        SET_AVATAR_URL: (state,value) => state.avatarUrl = value,
        SET_NAME: (state,value) => state.name = value,
        SET_: (state,value) =>state.location = value,
        SET_BLOG: (state,value) => state.blog = value,
        SET_FOLLOWERS: (state,value) => state.followers = value,
        SET_FOLLOWING: (state,value) => state.following = value
    },
    actions:{
        GetInfo(context){
            UserAPI.getInfo().then(
                (response) => {
                    let result = response.data;
                    // 头像链接
                    context.commit('SET_AVATAR_URL',result['avatar_url'])
                    // 用户名
                    context.commit('SET_NAME',result['name'])
                    // 位置信息
                    context.commit('SET_LOCATION',result['location'])
                    // 博客?
                    context.commit('SET_BLOG',result['blog'])
                    // 粉丝
                    context.commit('SET_FOLLOWERS',result['followers'])
                    // 关注
                    context.commit('SET_FOLLOWING',result['following'])
                }
            )
        }
    }
}

export default user