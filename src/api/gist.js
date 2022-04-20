import request from '@/utils/request'
import store from '../store/index'

export default{
    // 查询仓库中的博客列表
    list: function(){
        // let githubUsername = store.state.configuration.githubUsername
        return request({
            // url: `/users/${githubUsername}/gists?page=${query.page}&per_page=${query.pageSize}`
            url: `/api/aritcleList`,
            method: 'get'
        })
    },
    // 查询仓库中单个博客信息
    single: function(id){
        return request({
            // url: `/gists/${id}`
            url: `/api/articleDetail/${id}`
        })
    },
    // 加入新的博客到仓库中
    create: function(form){
        // let files = {}
        // files[form.title] = {content: form.content}
        return request({
            // url: '/gists',
            url: '/api/admin/saveArticle',
            method: 'post',
            // data:{
                // "description": form.description,
                // "public": true,
                // "files": files
            // }
            data: form
        })
    },
    //根据id 删除博客
    delete: function(id){
        return request({
            url: '/gists/'+id,
            method: 'DELETE'
        })
    },
    edit: function(form){
        let files = {}
        files[form.title] = { content: form.content }
        return request({
            url: '/gists/'+form.id,
            method: 'PATCH',
            data: {
                "description": form.description,
                "files": files,
                "public": true
            }
        })

        


    }

}