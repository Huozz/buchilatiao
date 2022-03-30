<template>

   <div style="min-height:600px" v-loading="loading">
      <el-card shadow="never" style="margin-height:400px">
         <div slot="header">
            <el-row>
               <el-col :span="12">
                  <div style="text-align:left">
                     <span style="text-align: left">{{blog.title}}</span>
                  </div>
               </el-col>
               <el-col :span="12">
                  <div style="text-align: right">
                     <el-button @click="goBack" icon="el-icon-back" style="padding: 3px 0" type="text">返回</el-button>
                     <el-button @click="goEdit" icon="el-icon-edit-outline" style="padding 3px 0" type="text">编辑</el-button>
                  </div>
               </el-col>
            </el-row>
         </div>
         <div style="font-size: 0.9rem; line-height: 1.5; color:#606c71; text-align: left">
            发布于 {{blog.date}}
         </div>
         <div style="font-size: 1.1rem; line-height: 1.5; color:#303133; border-bottom: 1px solid #E4E7ED; padding: 35px 0px 5px 0px">
            <div style="font-family: 微软雅黑; text-align:left">{{blog.description}}</div>
         </div>
         <div class="mavon-editor">
            <mavon-editor v-html="blog.content" class="markdown-body"></mavon-editor>
         </div>

         <!-- <div v-html="blog.content" class="markdownbody" style="padding-top:20px"> </div> -->
      </el-card>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GistApi from '../../api/gist'
import "mavon-editor/dist/css/index.css";
export default {
   data () {
      return {
         blog:{
            id: "",
            title:"",
            content:"",
            description:"",
            creationTime:"",
            editTime:""
         },
         loading: false
      };
   },

   components: {

   },

   computed: {
      ...mapGetters([
         'token'
      ])
   },

   mounted(){
      // this.blog.id = this.$route.params.id
      this.loading = true
      // GistApi.single(this.blog.id).then((response) =>{
      //    let result = response.data;
      //    console.log(result)
      //    for(let key in result.files){
      //       this.blog.title = key;
      //       this.blog.description = result.description;
      //       // console.log(result.files[key].content)
      //       this.blog.content = this.$markdown(result.files[key].content)
      //       // this.blog.content = result.files[key].content
      //       this.blog.creationTime = this.$util.utcToLocal(result.created_at);
      //       this.blog.editTime = this.$util.utcToLocal(result.updated_at);
      //       break
      //    }
      // }).then(()=>{
      //    this.loading = false
      // })
      let id = this.$route.params.id
      console.log(id)
      this.$http.get('/api/articleDetail/' + id).then(
        response => {
           let article = response.body;
           this.blog.id = id;
            this.blog.title = article.title;
            this.blog.description = article.description;
            this.blog.content = this.$markdown(article.content)
            this.blog.date = article.date;
            this.loading = false;
         },
        response => console.log(response)
      )
   },

 
   methods: {
      goEdit(){
         if(!this.token){
            this.$message({
               message: '请绑定有效token',
               type: 'warning'
            })
            return
         }
         this.$router.push('/user/blog/edit/'+this.blog.id)
      },
      goBack(){
         this.$router.go(-1)
      }
   }
}
</script>
<style lang='css' scoped>

</style>