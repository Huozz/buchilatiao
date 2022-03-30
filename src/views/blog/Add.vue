<template>
   <div style="minheight:600px">
      <el-card shadow="never">
         <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item  label="标题" prop="title">
               <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item  label="描述" prop="description">
               <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="博客正文" prop="content">
               <mavon-editor @imgAdd="imgAdd" @change="change" v-model="form.content" style="max-height: 500px" ref="md" :subfield="false" :toolbars="toolbars"></mavon-editor>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit" :loading="submitButton.loading" :disabled="submitButton.disabled">发表</el-button>
            </el-form-item>
         </el-form>
      </el-card>
      <token-dialog ref="tokenDialog"></token-dialog>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TokenDialog from '../common/TokenDialogue.vue'
import GistApi from '../../api/gist'
import utils from '../../utils/utils'
export default {
   data () {
      return {
         form:{
            title:'',
            description:'',
            content: '',
            date: ''
         },
         submitButton:{
            loading: false,
            disabled: false
         },
         // 填入的文章标题、文章描述、正文内容验证
         rules:{
            title:[
               {required: true, message:'请输入标题',trigger:'blur'},
               {type: 'string', max:32, message:'标题长度不超过32个字符', trigger:'change'}
            ],
            description: [
               {required: true, message:'请输入简要描述', trigger:'blur'}
            ],
            content:[
               {required: true, message:'请输入博客正文', trigger:'blur'}
            ]
         },
         // 文本编辑的组件
         toolbars: {
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

   methods: {
      imgAdd(){
         this.$refs['md'].$img2Url(pos, file.miniurl)
      },
      change(value,render){
         this.form.content = render
      },
      onSubmit(){
         // // 检查token是否通过验证，如果没有则弹出token验证框
         // if(this.token){
         //    this.publish()
         // }else{
         //    this.$refs.tokenDialog.open(()=>{
         //       this.publish()
         //    })
         // }
         this.publish()
      },
      publish(){
         // 先验证要新增的博客内容是否有效
         let self = this;
         this.$refs['form'].validate((valid)=>{
            if(valid){
               // 表单验证通过，按钮进入加载状态，禁用再次点击
               this.submitButton.loading = true
               this.submitButton.disabled = true
               console.log(this.form.title)
               console.log(this.form.content)
               console.log(this.html)
               this.form.date = utils.getDate()
               console.log(this.form.date)
               // GistApi.create(this.form).then((response)=>{
               //    let result = response.data
               //    console.log(result)
               //    this.$message({
               //       message: "发表成功",
               //       type: "success"
               //    })
               // }).then(()=>{
               //    this.submitButton.loading = false
               //    this.submitButton.disabled = false
               // })
               this.$http.post('/api/admin/saveArticle', {
                  articleInformation: this.form
               }).then(
                  response => {
                  self.$message({
                     message: '更新文章成功',
                     type: 'success'
                  })
                  // 更新完成后跳转至该文章的详情页
                  // self.$router.push('details/' + self.$route.params.id)
                  self.$router.push('/user/blog/main')
                  },
                  response => console.log(response)
               )
            }
         })
      }
   }
}
</script>
<style lang='css' scoped>

</style>