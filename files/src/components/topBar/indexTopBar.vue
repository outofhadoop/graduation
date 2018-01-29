<template>
  <div id="indexNavBox">
      <header>
          <div class="container">
            <div class="headLogo">
                <a href="#" class="navLogo"><img v-bind="{ src: `${imgHea}dongli.jpg` }"></a>
            </div>
            <nav role="navigation" class="main-nav">
                <ul>
                    <li><div>
                        <el-menu default-active="1-1" @select="homeNavMenu">
                            <el-submenu class="home-top-nav-menu" index="1">
                                <template slot="title"><icon name="navicon"></icon></template>
                                <el-menu-item v-for="item in navli" index="1-1" v-bind:key="item.id">{{ item.name }}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div></li>
                </ul>
                <ul class="nav-ul-pc">
                    <li v-for="item in navli" v-bind:key="item.index"><a href="#">{{ item.name }}</a></li>
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
        ]
      }
  },
  methods: {
      homeNavMenu () {

      }
  }
}
</script>
<style lang="css">
/* 全局样式 */
/* 头部logo */
header{height: 60px;}
.container{margin: auto;display: flex;display: -webkit-flex;display: -webkit-inline-flex;display: inline-flex;}
.headLogo a img{width: 100%;height: 100%;}
.navLogo{display: block;height: 50px;width: 50px;}
.nav-ul-pc{display: flex;display: -webkit-flex;}
</style>
