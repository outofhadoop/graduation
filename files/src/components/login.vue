<template>
  <div class="loginRoot">
      <div class="login_coverLayer"> </div>
      <div class="loginBox">
          <h1>登录</h1>
            <span v-on:click="close_login"><icon name="close" class="login_close"></icon></span>
          <!-- <el-form v-model="formLogin" ref='formLogin' class="login_form" :rules='rules'> -->
          <el-form :model="formLogin" :rules="rules" ref="formLogin" class="login_form">
              <div class="login_form_div">
                <el-form-item prop="username">
                    <el-input v-model="formLogin.username" class="login_input"  placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item  prop="password" >
                    <el-input v-model="formLogin.password" class="login_input" placeholder="请输入密码"></el-input>
                </el-form-item>
              </div>
              <el-form-item>
                  <el-button type="primary" class="login_button" v-on:click="loginfn('formLogin')">登录</el-button>
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
      return {
            formLogin: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]

            }
      }
  },
  methods: {
    //   ...mapActions([
    //       'login'
    //   ]),
      close_login () {
          console.log('click')
          this.$emit('login-show');
      },
      loginfn (formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:3000/login',
                this.formLogin
            )
            .then(function(res){
                console.dir(res)
                console.log('登陆成功')
                // this.login()
                that.$store.commit('login')
                that.$store.commit('setUserInfo', res)
                window.sessionStorage.setItem('userInfo',JSON.stringify(res));
                that.$http.post('http://localhost:3000/log/logInsert',{
                    userid: res.data.userID,
                    loginTime: getDate(),
                    loginDevice: navigator.userAgent
                })
                .then(function(res){
                    console.dir(res)
                })
                .catch(function(error){
                    console.log(error)
                })
            })
            .catch(function(error){
                console.log(error)
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
    .login_input input{
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

