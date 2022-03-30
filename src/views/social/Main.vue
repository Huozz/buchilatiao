<template>
   <div>
      <el-card shadow="never" style="min-height:400px margin-bottom:40px padding 0px 0px 20px 0px">
         <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
            <el-tab-pane :label="'关注'+followingTotal" name="following" style="padding: 5px">
               <div v-loading="following.loading">
                  <div v-if="following.list.length">
                     <el-row style="min-height: 200px">
                        <el-col :span="8" v-for="(item,index) in following.list" :key="'following'+index" style="padding:10px">
                           <el-card shadow="hover" style="font-size:13px; color:#606266; line-height:20px">
                              <i class="el-icon-star-off"></i>&emsp;
                              <a @click="$router.push(`/user/social/details/${item.name}`)" 
                              style="text-decoration:none;cursor:pointer">{{item.name}}
                              </a>
                              <br>
                              <i class="el-icon-message"></i>&emsp;
                              <a :href="item.htmlUrl" target="_blank" style="text-decoration:none; cursor:pointer">TA的主页</a>
                              <br>
                              <img :src="item.avatarUrl" style="width: 100%; border-radius:5px ;margin-top:5px">
                           </el-card>
                        </el-col>
                     </el-row>
                  </div>
               </div>
            </el-tab-pane>
         </el-tabs>
      </el-card>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserApi from '../../api/user'
export default {
   data () {
      return {
         activeTab: "following",
         followers: {
            query: {
               page:1,
               pageSize:9,
               pageNumber:1
            },
            loading:false,
            list:[]
         },
         following:{
            query:{
               page:1,
               pageSize:9,
               pageNumber:1
            },
            loading:false,
            list:[]
         }
      };
   },

   components: {},

   computed: {
      ...mapGetters([
         'githubUsername',
         'followersTotal',
         'followingTotal'
      ])
   },

   mounted(){
      // this.onSelect();
   },

   methods: {
      // onSelect(){
      //    switch(this.activeTab){
      //       case "follower":
      //          this.listFollowers()
      //          break
      //       case "following":
      //          this.listFollowing()
      //          break
      //       default:
      //          break
      //    }
      // },
      onSelect(){
         this.listFollowing()
      },
      listFollowing(){
         this.following.loading = true
         UserApi.following(this.following.query).then((response)=>{
            let result = response.data
            let pageNumber = this.$util.parseHeaders(response.headers)
            if(pageNumber){
                this.following.query.pageNumber = pageNumber
            }
            this.following.list = []
            for(let i=0;i<result.length;i++){
               let data = {}
               data.name =  result[i]['login']
               data.avatarUrl = result[i]['avatarUrl']
               data.htmlUrl = result[i]['htmlUrl']
               this.following.list.push(data)
            }
         }).then(()=>{
            this.following.loading = false
         })
      },
      listFollowers(){
         console.log("I have no followers!")
      }
   }
}
</script>
<style lang='css' scoped>

</style>