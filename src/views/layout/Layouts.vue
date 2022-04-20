<template>
   <div>
       <section class="page-header" :style="'background-image: linear-gradient(120deg, '+backgroundColorLeft+','+backgroundColorRight+');color: '+fontColor+';' ">
            <div style="position:absolute; top:20px; right:20px; z-index:2">
                <!-- 按钮悬浮提示 -->
                <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
                    <!-- 右上角全屏按钮 -->
                    <el-button @click="full" :icon="fullButton.full? 'el-icon-close' : 'el-icon-rank'" circle></el-button>
                </el-tooltip>
            </div>
            <!-- 背景中的随机位置音符 -->
            <div v-for="(item,index) in iconPosition" :key=index :style="'position: absolute; left:'+item.left+'px; top: '+item.top+'px;'">
                <font :style="'size:'+item.size+ 'px; color: #fff;'">
                    <b>♪</b>
                </font>
            </div>
            <h1 class="project-name">{{blogTitle}}</h1>
            <h2 class="project-tagline">{{blogDescribe}}</h2>
            <!-- github主页链接 -->
            <a :href="'https://github.com/'+githubUsername" target="_blank" class="btn">Github主页</a>
        </section>
        <div style="position: relative; z-index: 2; margin: auto; margin-top:-30px; width:64rem;">
            <el-card>
                <el-row>
                    <!-- github主页、博客信息复选框 -->
                    <el-col :span="10">
                        <el-menu @select="selectTopbar" :default-active="topBar.active" mode="horizontal" menu-trigger="click">
                            <el-submenu index="#more">
                                <template slot="title">了解博主</template>
                                <el-menu-item index="#githubHome">github主页</el-menu-item>
                                <el-menu-item index="#blog">其他博客</el-menu-item>
                            </el-submenu>
            
                        </el-menu>
                    </el-col>

                    <el-col :span="8">
                        <!-- 名字 -->
                        <div style="font-size: 20px; color:#606266;margin-top:5px">
                            <b>{{githubUsername}}</b>
                        </div>
                        <!-- 位置 -->
                        <div style="color:#606266">
                            <i class="el-icon-location"></i> &nbsp;{{location?location:'未填写地址'}}
                            <br>
                        </div>
                    </el-col>
                    <!-- 头像及悬浮框 -->
                    <el-col :span="2">
                        <!-- 头像小图 -->
                        <img v-popover:avatarPop src="../../assets/kuluomi.jpg" style="margin-top: 4px; margin-right:10px; width:52px; height:52px">
                        <!-- 头像悬浮框 -->
                        <el-popover ref="avatarPop" placement="top-start" :title="githubUsername" width="200" trigger="hover">
                            <i class="el-icon-star-on"></i>&emsp;{{githubUsername}}
                            <br>
                            <i class="el-icon-location"></i>&emsp;{{location? location : '未填写'}}
                            <br>
                            <!-- <img src="../../assets/kuluomi.jpg" style="width:200px; height:200px"> -->
                            <!-- <img :src="getImage" style="width:200px; height:200px"> -->
                            <img src="../../../static/kuluomi.jpg" style="width:200px; height:200px"> 
                        </el-popover>

                    </el-col>
                </el-row>
            </el-card>
        </div>
        <section class="main-content">
            <el-row>
                <el-col :span="6" style="padding-right:10px">
                    <side-bar></side-bar>
                </el-col>
                <el-col :span="18" style="padding-left:10px">
                    <app-main></app-main>
                </el-col>
            </el-row>  
        </section>
        <section class="foot">
            <foot></foot>
        </section>

   </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SideBar from './components/SideBar'
import AppMain from './components/AppMain'
import Foot from './components/Foot'


export default {
   data () {
      return {

          fullButton :{
              full: false
          },
          // 顶部下拉按钮
          topBar:{
               active: "",
           },
          iconPosition: []
      };
   },

   components: {
       SideBar,
       AppMain,
       Foot
   },

   computed: {
       ...mapGetters([
           'githubUsername',
           'blogTitle', //博客标题
           'blogDescribe', //博客描述
           'backgroundColorLeft',
           'backgroundColorRight',
           'fontColor',
           'webSites',//关于作者一栏的更多信息
           'blog', //作者的其他博客
        //    'avatarUrl',//头像链接
           'location', //作者位置
       ]),
       getImage(){
           return require('../../../static/melody.jpg')
       }
   },
   mounted(){

       // 完成随机音符的位置和大小排布
       for(let i=0; i<12;i++){
           let temp = {}; //新建对象，具有left和top属性
           let left = this.$util.randomInt(20,300);
           let top = this.$util.randomInt(20,300);
           let size = this.$util.randomInt(20,40);
           temp['left'] = left;
           temp['top'] = top;
           temp['size'] = size;
           this.iconPosition.push(temp);
       }
   },

   methods: {
       full(){
           console.log("go full222");
           // 触发full 方法，先判断当前full的状态，将full 取反，并且使用util中的方法设置或取消fullScreen()
           if(!this.fullButton.full) {
               this.$util.fullScreen();
               this.fullButton.full = true;
           } else{
               this.$util.fullExit();
               this.fullButton.full = false;
           }
       },
       selectTopbar(index){
           // 取消菜单选中状态,空格和没空格什么意思?
           this.topBar.active = this.topBar.active == ""? " " : "";
           switch(index){
               // 跳转到github
               case "#githubHome":
                   window.open('https://github.com/' + this.githubUsername)
                   break
                // 跳转到作者本人的其他博客
                case "#blog":
                    if(this.blog){
                        // 判断当前blog地址是否含有https://前缀，如果没有就加上
                        window.open((this.blog.match(/https:\/\//i)?'':'https://') + this.blog)
                    } else{
                        this.$message({
                            message: '博主没有其他博客',
                            type: 'info'
                        })
                    }
                // 跳转到其他网站
                default:
                    // 正则表达式获取webSite的index
                    if(/#webSites-\d+/.test(index)){
                        let i = parseInt(index.split('-')[1])
                        let url = this.webSites[i].url
                        window.open((url.match(/https:\/\//i) ? '' : 'https://') + url)
                    }
                    break
           }
       }
   }
}
</script>
<style lang='css' scoped>
    .page-header{
        padding: 5rem 6rem;
        color: #fff;
        text-align: center;
        background-color: #159957;
        background-image: linear-gradient(120deg, #155799, #159957);
    }
    .project-name{
        font-size: 3.5rem;
        margin-top: 0;
        margin-bottom: 0.1rem;
    }
    .project-tagline{
        font-size: 1.5rem;
        opacity: 0.8;
        margin-bottom: 2rem;
    }
    .btn{
        padding: 0.75rem 1rem;
        display: inline-block;
        margin-bottom: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.08);
        border-radius: 0.3rem;
        /* transition: color 0.2s, background-color 0.2s, border-color 0.2s; */
    }
    .btn :hover{
        color : rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.2);
    }
    a{
        text-decoration: none;
    }
    .foot{
        width: 64rem;
        margin: 0 auto;
        font-size: 12px ;
        color: #586069;
        word-wrap: break-word;
    } 
    .main-content {
        max-width: 64rem;
        padding: 30px 0px 30px 0px;
        margin: 0 auto;
        font-size: 1.1rem;
        word-wrap: break-word;
        min-height: 800px;
    }
</style>