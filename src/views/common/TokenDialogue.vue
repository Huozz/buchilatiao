<template>
<!-- 绑定token的弹出窗口 -->
   <div>
       <el-dialog title="登录/注册" :visible.sync="show">
           <el-form  v-model="userInfo" ref="tokenForm">
               <el-form-item label="用户名" prop="name" >
                   <el-input v-model="userInfo.name" placeholder="请输入用户名"></el-input>
               </el-form-item>
               <el-form-item label="密码" prop="password">
                   <el-input v-model="userInfo.password" placeholder="请输入密码" type="password"></el-input>
               </el-form-item>
           </el-form>
           <span slot="footer">
               <el-button @click="signUp">注册</el-button>
               <el-button @click="signIn" type="primary">登录</el-button>
           </span>
       </el-dialog>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   data () {
      return {
          show: false,
          userInfo:{
              name: '',
              password: '',
          },
          hasName: false, // 用户名被占用
          // 确认成功后窗口关闭的function
          closeFunc: null
      };
   },

   computed: {
       ...mapGetters([
           'githubUsername'
       ])
   },

   methods: {
       open(){
           this.show = true
       },
       signUp() {
            let _this = this;
            if (this.userInfo.name.length < 6) {
                this.$message.error('用户名不能为空或小于六个字符')
                return
            }

            if (this.userInfo.password.length < 6) {
                this.$message.error('密码不能为空或小于六个字符')
                return
            }

            this.$http.get('/api/admin/getUser/' + this.userInfo.name).then(
            response => {
                if (response.body.name === _this.userInfo.name) {
                _this.$message.error('该用户已存在')
                _this.userInfo.name = '';
                // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
                // 所以我把post移入else中，而不是在外面通过判断name执行
                } else {
                let obj = {
                    name: _this.userInfo.name,
                    password: _this.userInfo.password
                }

                _this.$http.post('/api/admin/signup', {
                    userInfo: obj
                }).then(
                    response => {
                    _this.$message({
                        message: '注册成功',
                        type: 'success'
                    })
                    this.show = false;
                    },
                    response => console.log('注册失败' + response)
                )
                }
            },
            )
      },
       signIn(){
            let _this = this;
            if (this.userInfo.name.length < 6) {
                this.$message.error('用户名不能为空或小于六个字符')
                return
            }

            if (this.userInfo.password.length < 6) {
                this.$message.error('密码不能为空或小于六个字符')
                return
            }

            this.$http.get('/api/admin/getUser/' + this.userInfo.name).then(
            response => {
                if (_this.userInfo.password !== response.body.password) {
                    _this.$message.error('用户名或密码不正确')
                } else {
                    let obj = {
                        name: _this.userInfo.name,
                        password: _this.userInfo.password
                    }
                    window.sessionStorage.setItem('token', _this.userInfo.name+'asdf')
                    _this.$store.dispatch('Authentic',window.sessionStorage.getItem('token'));
                    _this.$http.post('/api/admin/signin', {
                        userInfo: obj
                }).then(
                    response => {
                    _this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    
                    console.log("登录的response",response);
                    delete _this.userInfo.password;
                    this.show = false
                    // _this.$router.go(-1)
                    },
                    response => console.log('登录失败'+response)
                )
                }
            },
            response => {
                _this.$message.error('该用户不存在')
                return
            }
            )
       }
   }

}
</script>
<style lang='css' scoped>

</style>