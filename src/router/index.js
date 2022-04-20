import Vue from 'vue'
import Router from 'vue-router'


// import Layouts from '../views/layout/Layouts'
// import NewMain from '../views/new/Main'
// import SocialMain from '../views/social/Main'
// import SocialDetails from '../views/social/Details'
// import BlogMain from '../views/blog/Main'
// import BlogDetails from '../views/blog/Details'
// import BlogAdd from '../views/blog/Add'
// import BlogEdit from '../views/blog/Edit'

// 使用路由懒加载
const Layouts = ()=> import( '../views/layout/Layouts')
const NewMain = ()=> import('../views/new/Main')
const SocialMain = () => import('../views/social/Main')
const SocialDetails = () => import('../views/social/Details')
const BlogMain = ()=> import('../views/blog/Main')
const BlogDetails = ()=>import('../views/blog/Details')
const BlogAdd = ()=> import('../views/blog/Add')
const BlogEdit = () => import('../views/blog/Edit')


Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Layouts',
//       component: Layouts
//     }
//   ]
// })
export const constantRouterMap=[
  {
    path: '/',
    redirect: '/user/new'
  },
  // 最新动态
  {
    path: '/user/new',
    redirect: '/user/new/main',
    component: Layouts,
    meta: {
        type: "user",
        icon: 'el-icon-star-off',
        title: '最新动态'
    },
    children: [
        {
            path: 'main',
            component: NewMain,
            meta: { title: '最新动态' }
        }
    ]
  },
  // 社交圈
  {
    path: '/user/social',
    redirect: '/user/social/main',
    component: Layouts,
    meta:{
      type: "user",
      icon: 'el-icon-mobile-phone',
      title: '社交圈',
    },
    children:[
      {
        path: 'main',
        component: SocialMain,
        meta:{
          title:'社交圈'
        }
      },
      {
        path: 'details/:name',
        component: SocialDetails,
        meta:{
          title:'用户资料'
        }
      }
    ]
  },
  // 博文
  {
    path:'/user/blog',
    redirect: '/user/blog/main',
    component: Layouts,
    meta:{
      type: "user",
      icon: "el-icon-edit-outline",
      title: '博客列表'
    },
    children:[
      {
        path:'main',
        component:BlogMain,
        meta: { 
          title: '博客列表'
        }
      },
      { 
        path:'add',
        component: BlogAdd,
        meta: {
          title: '发表博客',
        }
      },
      {
        path: 'edit/:id',
        component: BlogEdit,
        meta: {
          title: '编辑博客'
        }
      },
      {
        path: 'details/:id',
        component: BlogDetails,
        meta: {
          title: '博客详情'
        }
      }
    ]
  }

]

const router = new Router({
  routes: constantRouterMap,
  mode: 'history',
  base: '/blog/'
})



export default router
