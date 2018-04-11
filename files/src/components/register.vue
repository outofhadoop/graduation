<template>
  <div class="loginRoot">
      <div class="login_coverLayer"> </div>
      <div class="loginBox">
          <h1>注册</h1>
            <span v-on:click="close_login"><icon name="close" class="login_close"></icon></span>
          <!-- <el-form v-model="formRegister" ref='formLogin' class="login_form" :rules='rules'> -->
          <el-form :model="formRegister" :rules="rules2" ref="formLogin" class="login_form">
              <div class="login_form_div">
                <el-form-item prop="username" @keyup.13="loginfn">
                    <el-input @keyup.enter="loginfn" v-model="formRegister.username" class="register_input"  placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item  prop="password" >
                    <el-input @keyup.enter="loginfn" type='password' v-model="formRegister.password" class="register_input" placeholder="请输入密码"></el-input>
                </el-form-item>
              </div>
              <el-form-item>
                  <el-button type="primary" class="login_button" v-on:click="loginfn('formRegister')">注册</el-button>
              </el-form-item>
               
               <!-- <div class="login_register_in">
                   <span>没有账号？</span>
                   <span>注册</span>
               </div> -->
          </el-form>
      </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getDate } from '../util/util'
export default {
  data () {
      var checkUsername = (rule, value, callback) => {
            if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
            return callback(new Error('用户名不能为空'));
            
            }else if(/[@#\,\;\'\"\$%\^&\*]+/g.test(value)){
                return callback(new Error('含有非法字符'));
            }else{
                
                this.$http.post('http://localhost:3000/register', { 'username': value })
                .then(function(res){
                    console.log(value)
                    console.log(res)
                    if(res.data){
                        return callback(new Error('用户名已被占用'))
                    }
                })
            }

      };
      return {
            formRegister: {
                username: '',
                password: '',
                sex: '',
                telephone: '',
                QQ: '',
                WeChat: '',
                email: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]

            },
            rules2: {
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ]
            }
      }
  },
  methods: {
      close_login () {
          console.log('click')
          console.log(this.$router.app._route.path)
          if(this.$router.app._route.path == '/register'){
              this.$router.push('/')
          }else{
            this.$emit('register-show');
          }

      },
      loginfn (formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:3000/register',
                that.formRegister
            )
            .then(function(res){
                if(res.data == true){
                    console.dir(res)
                    that.$message({
                        message:'注册成功',
                        type: 'success'
                        })
                    that.$router.push('/login')
                }else{
                    that.$message({
                        message:'注册成功',
                        type: 'warning'
                        })
                }

            })
            .catch(function(error){
                console.log(error)
                that.$message({
                    message:'用户名或密码错误',
                    type: 'warning'
                    })

            });
          } else {
            return false;
          }
        })
      }
  }
}
</script>
<style lang="css">
    h1{
        padding-left: 1.4rem;
        font-size: 1.2rem;margin: 0 0 1rem;display: block;
        -webkit-margin-before: 0.67em;
        -webkit-margin-after: 0.67em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
    }
    .loginRoot{width: 100%;height: 100%;}
    .login_coverLayer{width: 100%;height: 100%;z-index: 10;background-color: rgba(66,66,66,0.5);display: block;position: fixed;left: 0px;top:0px;}
    .loginBox{z-index: 21;position: fixed;background: white;left: 50%;top: 50%;margin-left: -11rem;margin-top: -10rem;}
    .login_form{position: relative;
    width: 23.5rem;
    max-width: 100%;
    font-size: 1.167rem;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    word-break: break-word;}
    .login_close{
        cursor: pointer;
        position: relative;
        top: -33px;
        display: block;
        margin-left: 340px;
    }
    .register_input input{
            width: 17rem;
            height: 1.8rem;
            margin: 1rem;
            padding: 0.2rem;
    }
    .login_form_div{
        margin-left: 2rem;
    }
    .login_button{
        width: 17.5rem;
        height: 2.5rem;
        margin: 1rem;
        margin-left: 3rem;
        background-color: #007fff;
        outline: none;
        cursor: pointer;
        color: #fff;
        border: none;
    }
    .el-form-item__error{
        margin-left: 20px;
    }
</style>

