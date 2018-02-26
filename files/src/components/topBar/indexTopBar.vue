<template>
  <div id="indexNavBox">
      <header>
          <div class="container">
            <div class="headLogo">
                <a href="#" class="navLogo"><img v-bind="{ src: `${imgHea}dongli.jpg` }"></a>
            </div>
            <nav role="navigation" class="main-nav">
                <ul  class="nav-ul-mobile">
                    <li><div>
                        <el-menu  @select="homeNavMenu">
                            <el-submenu class="home-top-nav-menu" index="1">
                                <template slot="title"><icon name="navicon"></icon></template>
                                <el-menu-item v-for="item in navli" index="1-1" v-bind:key="item.id">{{ item.name }}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div></li>
                </ul>
                <ul class="nav-ul-pc nav-list-margin">
                    <li v-for="item in navli" v-bind:key="item.index"><a href="#" class="nav-link-pc">{{ item.name }}</a></li>
                    <li class="nav-form-margin">
                        <form action="" v-bind:class="navInputBlur ? 'nav-form-blur' : 'nav-form-focus'">
                            <input type="text" maxlength="32" v-on:blur="checkBlur" v-on:focus="checkFocus" v-bind:class="navInputBlur ? 'nav-search-input-focus' : 'nav-search-input-blur'"><icon name="search" class="nav-search-icon-blur" v-bind:class="navInputBlur ? 'nav-search-icon-blur' : 'nav-search-icon-focus'"></icon>
                        </form>
                    </li>
                    <li class="nav-writePage mainColor">
                        <icon name="file-text-o" class="writePageIcon mainColor"></icon><span class="writePage mainColor">写文章</span>
                    </li>
                    <li>
                        <span class="nav-login mainColor" v-on:click="loginShow">登录</span>
                        <span class="nav-register mainColor">注册</span>
                    </li>
                </ul>
            </nav>
          </div>

      </header>
  </div>
</template>
<script>
export default {
  data () {
      return {
        imgHea: 'http://localhost:3000/resource/',
        navli: [
            {
                name: "首页",
                url: ""
            },
            {
                name: "小册",
                url: ""
            },
            {
                name: "开源",
                url: ""
            },
            {
                name: "活动",
                url: ""
            }
        ],
        navInputBlur: false,
      }
  },
  methods: {
      homeNavMenu () {

      },
      checkBlur () {
          this.navInputBlur = !this.navInputBlur;
      },
      checkFocus () {
          this.navInputBlur = !this.navInputBlur;
      },
      loginShow () {
          this.$emit('login-show');
      }
  }
}
</script>
<style lang="css">
*{
    padding: 0px;
    margin: 0px;
}
/* 全局样式 */
/* 头部logo */
header{height: 60px;}
.container{margin: auto;max-width: 960px;display: flex;display: -webkit-flex;align-items: center;-ms-flex-align: center;}
.headLogo a img{width: 100%;height: 100%;}
.navLogo{display: block;height: 50px;width: 50px;}
.nav-ul-pc{display: flex;display: -webkit-flex;list-style: none;padding:0px;}
.nav-ul-pc li{color: #71777c;font-size: 1.03rem;display: flex;display: -webkit-flex;-moz-box-pack: center;-moz-box-pack: center;padding: 10px;}
.active-nav-color{color: #007fff;}
.nav-ul-mobile{display: flex;display: -webkit-flex;display: none;}
.nav-link-pc{text-decoration: none;color: #71777c;}
.nav-link-pc:hover{
    color: #007fff;
}
.nav-form-blur{display: flex;display: -webkit-flex;;display: inline-block;border: solid 1px #007fff;height: 25px;overflow: visible;}
.nav-form-focus{display: flex;display: -webkit-flex;;display: inline-block;border: solid 1px #808080;height: 25px;overflow: visible;}
.nav-search-input-blur{display: flex;display: -webkit-flex;height: 25px;width: 145px;background: #F9FAFB;padding-right: 30px;border: none;}
.nav-search-icon-blur{display: flex;display: -webkit-flex;cursor: pointer;display: inline-block;position: relative;left: 155px;top: -22px;color: #007fff;}
.nav-search-input-focus{display: flex;display: -webkit-flex;height: 25px;width: 145px;background: white;padding-right: 30px;outline: none;border: none;}
.nav-search-icon-focus{color: #71777c;display: flex;display: -webkit-flex;cursor: pointer;display: inline-block;position: relative;left: 155px;top: -22px;}
.nav-writePage icon{color: #007fff;}
.mainColor{color: #007fff;}
.writePageIcon{margin-top: 4px;margin-right: 5px;}
.writePage{cursor: pointer;}
.writePage::after{
    content: '|';
    margin-left: 10px;
}
.nav-login{cursor: pointer;}
.nav-login::after{
    content: '\B7';
    margin-left: 0.2rem;
}
.nav-register{margin-left: 0.2rem;cursor: pointer;}
.nav-form-margin{margin-left: 260px;}
.nav-list-margin{margin-left: 20px;}
</style>
