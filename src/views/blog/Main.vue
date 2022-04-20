<template>
   <div style="min-height:600px" v-loading="loading">
      <el-card shadow="never" style="margin-bottom:20px">
         <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
         <el-button @click="search" icon="el-icon-search" style="margin-left:10px" circle plain></el-button>
         <el-button @click="goAdd" type="primary" icon="el-icon-edit" round plain style="float:right">写博文</el-button>   
      </el-card>
      <div v-if="blogs && blogs.length>0">
         <el-card shadow="hover" v-for="(item,index) in blogs" :key="'p'+index" style="margin-bottom:20px" >
            <el-row>
               <el-col :span=20 style="text-align:left">
                  <span style="text-align:left">
                     <a style="text-decoration:none; cursor:pointer" @click="goDetails(item.id)">
                        <i class="el-icon-edit-outline" >&nbsp;&nbsp;</i>{{item.title}}
                     </a>
                  </span>
               </el-col>
               <el-col :span=4>
                  <div style="text-align: right">
                     <el-button @click="editBlog(item.id)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"> </el-button>
                     <el-button @click="deleteBlog(item.id)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button>
                  </div>
               </el-col>
            </el-row>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71; border-bottom: 1px solid #E4E7ED; text-align:left; padding:10px 0px 0px 0px">
               {{item.date}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px; text-align:left">
               {{item.description}}
            </div>
            <!-- 翻页 -->

         </el-card>
         <div style="text-align:center">
               <el-pagination @current-change="list" background layout="prev, pager, next" 
                  :current-page.sync="query.page" :page-size="query.pageSize"
                  :total="query.pageNumber * query.pageSize">
               </el-pagination>
         </div>
      </div>
      <el-card shadow="never" style="min-height:300px; text-align:center; padding: 20px 0px 20px 0px" v-if="blogs.length==0">
         <font style="font-size:30px color:#dddddd">
            <b>还没有博客</b>
         </font>
      </el-card>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GistApi from '../../api/gist';
export default {
   data () {
      return {
         query:{
            page: 1,
            pageSize: 3,
            pageNumber: 1
         },
         loading: false,
         blogs: [],
         searchKey:""
      }
   },

   components: {},

   computed: {
      ...mapGetters([
         'token'
      ])
   },
   mounted(){
      this.list()
   },
   methods: {
      search(){
         console.log("searching")
      },
      list(){
         this.blogs = []
         this.loading = true
         /*
         GistApi.list().then((response) => {
            let result = response
            console.log(result)
            // console.log(response.headers['link'])
            // let pageNumber = this.$util.parseHeaders(response.headers['link'])
            // if(pageNumber){
            //    this.query.pageNumber = pageNumber
            // }
            for(let i=0;i<result.length;i++){
               for(let key in result[i].files){
                  let data = {}
                  data['title'] = key
                  data['updateTime'] = this.$util.utcToLocal(result[i]['updated_at'])
                  data['url'] = result[i].files[key]
                  data['description'] = result[i]['description']
                  data['id'] = result[i]['id']
                  data['hide'] =false
                  this.blogs.push(data)
                  break
               }
            }

         }).then(()=>this.loading=false)
         */ 
        this.$http.get('/api/articleList').then(
           response => {
               console.log("response",response) ;
               let blogs = response.body.reverse(); 
               for(let item of blogs){
                  let data = {}
                  data.id = item._id;
                  data.title = item.title;
                  data.date = item.date;
                  data.content = item.content;
                  data.description = item.description;
                  this.blogs.push(data);
               }
               console.log(this.blogs.length)
               this.loading = false;

            },
           response => {console.log("error",response); this.loading = false}
        )
      },
      // 进入增加博文页面
      goAdd(){
         if(!this.token){
            this.$message({
               message: '请先登录',
               type: 'warning'
            })
            return
         }
         this.$router.push('/user/blog/add')
      },
      // 点击当前博客查看详情
      goDetails(id){
         this.$router.push('/user/blog/details/'+id)
      },
      // 编辑当前博客
      editBlog(id){
         this.$router.push('/user/blog/edit/'+id)
      },

      deleteBlog(id){
         let self = this
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post('/api/admin/deleteArticle', {
            _id: id
          }).then(
            response => {
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              self.list()
            },
            response => {
              console.log(response)
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
   }
}
</script>
<style lang='css' scoped>

</style>