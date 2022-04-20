<template>
   <!-- Edit和Add大致一样，但是mounted时需要自动加载已经有的内容 -->
   <div>
      <el-card>
         <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="标题"  prop="title">
               <el-input v-model="form.title" ></el-input>
            </el-form-item>
            <el-form-item label="描述"  prop="description">
               <el-input v-model="form.description" type="text-area"></el-input>
            </el-form-item>
            <el-form-item label="博客正文"  prop="content">
               <mavon-editor @imgAdd="imageAdd" @change="change" style="max-height: 500px" v-model="form.content" :toolbars="toolBars" ref="md"></mavon-editor>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit" :loading="submitButton.loading" :disabled="submitButton.disabled">修改</el-button>
               <el-button @click="goBack">返回</el-button>
            </el-form-item>
         </el-form>
      </el-card>
      <token-dialog ref="tokenDialog"></token-dialog>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TokenDialog from '../../views/common/TokenDialogue'
import GistApi from '../../api/gist'
import utils from '../../utils/utils'
export default {
   data () {
      return {
         loading: false, // 初始化时读取该blog的详细信息
         form:{
            id: '',
            title: '',
            data: '',
            description: '',
            content: ''
         },
         rules:{
            title:[
               {required: true, message: '请输入标题',trigger:'blur'},
               {type: 'string', max:32, message:'标题长度不大于32字符',trigger:'change'}
            ],
            description:[
               {required: true, message: '请输入博客描述', trigger:'blur'}
            ],
            content:[
               {required: true, message: '请输入博客正文', trigger:'blur'}
            ]
         },
         submitButton:{ // 提交按钮的加载中和禁用
            loading: false,
            disabled: false
         },
         toolBars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true, // 预览
         }
      };
   },

   components: {
      TokenDialog
   },

   computed: {
      ...mapGetters([
         'token'
      ])
   },

   mounted(){
      if(!this.token) {
         this.message({
            message:'权限不足,请绑定token',
            type: 'error' 
         })
         this.$router.go(-1)
         return
      }
      this.form.id = this.$route.params.id

      this.$http.get('/api/articleDetail/'+this.$route.params.id).then(
         response => {
            let article = response.body;
            console.log("article",article);
            this.form.id = this.$route.params.id;
            this.form.title = article.title;
            this.form.description = article.description;
            this.form.content = article.content;
         }
      )

   },

   methods: {
            // 以formatdata格式上传
      imageAdd(pos, $file){
         console.log($file)
         console.log("base_api",process.env.API_ROOT)
         let formData = new FormData();
         formData.append("file",$file);
         utils.uploadImage(formData)
         .then(res => {
            this.$refs['md'].$img2Url(pos, process.env.API_ROOT + res.data.url);
         })
         .catch(err => {
            console.log(err);
         });
      },
      onSubmit(){
         if(this.token){
            this.publish()
         }else{
            this.$refs['tokenDialog'].open(()=>{
               this.publish()
            })
         }
      },
      change(value,render){
         this.form.content = render
      },
      publish(){
         let self = this;
         this.$refs['form'].validate((valid)=>{
            if(valid){
               this.submitButton.loading = true
               this.submitButton.disabled = true
              let obj = {};
              obj._id = this.form.id;
              obj.title = this.form.title;
              obj.description = this.form.description;
              obj.content = this.form.content;
              obj.date = utils.getDate();
              console.log(this.form)
              self.$http.post('/api/admin/updateArticle',{
                 articleInformation: obj
              }).then(
                 response =>{
                  this.$message({
                     message: '修改成功!',
                     type:'success'
                  })
                  this.$router.push('/user/blog/details/'+obj._id)
                  this.submitButton.loading = false
                  this.submitButton.disabled = false
                 }

              )

            }
         })
      },
      goBack(){
         this.$router.go(-1)
      }
   }
}
</script>
<style lang='css' scoped>

</style>