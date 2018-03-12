<template>
  <div class="loginRoot">
      <div class="login_coverLayer"> </div>
      <div class="loginBox">
          <h1>登录</h1>
            <span v-on:click="close_login"><icon name="close" class="login_close"></icon></span>
          <el-form v-model="formLogin" class="login_form">
              <div class="login_form_div">
                <el-form-item required>
                    <el-input  v-model="formLogin.username" placeholder='请输入用户名' class="login_input"></el-input>
                </el-form-item>
                <el-form-item required>
                    <el-input  v-model="formLogin.password" placeholder='请输入密码' class="login_input"></el-input>
                </el-form-item>
              </div>
               <el-button type="primary" class="login_button" v-on:click="loginfn">登录</el-button>
               <!-- <div class="login_register_in">
                   <span>没有账号？</span>
                   <span>注册</span>
               </div> -->
          </el-form>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
            formLogin: {
                username: '',
                password: ''
            }
      }
  },
  methods: {
      close_login () {
          console.log('click')
          this.$emit('login-show');
      },
      loginfn () {
          
          console.dir(this.formLogin);
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
</style>

