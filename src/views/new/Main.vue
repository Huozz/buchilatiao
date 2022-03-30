<template>
    <!-- newMain,最近更新是gistapi返回的list第一个元素 -->
   <div style="min-heighr:600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog" >
         <div slot="header" style="text-align:left">
            <span>{{blog.title}}</span>
         </div>
         <div style="font-size:0.9rem; 
               line-height:1.5; 
               color: #606c71;
               text-align: left;
               " >
            创建{{blog.date}}
            <br>
         </div>
         <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 35px 0px 5px 0px; text-align:left">
            {{blog.description}}
         </div>
         <div v-html="blog.content" class="markdown-body" style="padding-top:40px" ></div>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 40px padding: 20px 0px 20px 0px text-align:center" v-if="!blog">
         <font style="font-size: 30px; color: #ddddd">
            <b>没有更新</b>
         </font>
      </el-card>
   </div>

</template>

<script>
import GistApi from '../../api/gist'


export default {
   name: 'NewMain',
   data () {
      return {
         query: {
            page: 1,
            pageSize: 1
         },
         loading: false,
         blog: {
            title: "",
            label: "",
            content: "",
            description: "",
            date: ""
         }
      };
   },

   components: {},

   computed: {},

   methods: {},

   mounted(){
      this.loading = true
      /*
      GistApi.list().then((response) => {
         console.log("new",response)
         let result = response.body.reverse()
         if(!result || result.length==0){
            this.loading = false
            return
         }
         // 由于list中没有博文的content，因此再请求single获取该博文详细内容
         this.blog.id = result[0]['id']
         GistApi.single(this.blog.id).then((response)=>{
            this.result = response.body;     
            this.blog.description = result[0]['description']
            this.blog.title = result.title
            this.blog.label = result.label
            this.blog.content = result.content
            this.blog.date = result.date
            
         }).then(()=>{
            this.loading = false
         })
      })
      */

      this.$http.get('/api/articleList').then(
         response => {
            console.log("response",response) ;
            let blogs = response.body.reverse(); 
            let blog = blogs[0];
            this.loading = false;
            this.blog.title = blog.title;
            this.blog.date = blog.date;
            this.blog.content = blog.content;
         },
         response => {console.log("error",response); this.loading = false}
      )

      // window.baidu = {
      //    sug: function(json){
      //       console.log(json)
      //    }
      // }
         // 测试直接使用baidu api ，会出现跨域问题,此时修改/config/dev.env.js即可
      // BaiduApi.single({wd: 'ali', cb:'sug'}).then((result)=>{
      //    // 返回的result是一个函数，例如'window.baidu.sug({q:"ali",p:false,s:["阿里巴巴","阿狸","… motion下载","alice","阿里巴巴1688货源批发官网下载","alive"]})
      //    console.log(typeof result.data)
   
      // })

      // 用jsonp方法解决跨域问题
      // window.callback = 
      //    function(json){
      //       console.log('我是一个回调函数')
      //       console.log(json)
         
      // }
      // this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
      //       wd: 'a',
      //       cb: 'callback'
      //    }).then((res) => {
      //       // console.log(res.data); 
      //       cb(res)
      //    }).catch((err)=>{
      //       console.log(err)
      //    })




   }
}
</script>
<style lang='css' scoped>

</style>