<template>
  <div class="UH_root">
      <div class="UH_box">
          <top-nav></top-nav>
          <div class="UH_userBox">
            <div class="UH_userShow">
              <div class="UH_info">
                
              </div>
              <div class="UH_info_word">
                <h1>{{ userinfo.username }}</h1>
              </div>  
            </div>

          </div>
          <div class="UH_choose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="登录日志" name="first">
                <el-table
                  :data="logData"
                  style="width: 100%">
                  <el-table-column
                    prop="loginID"
                    label="登录ID"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="loginTime"
                    label="登录时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="loginDevice"
                    label="登录设备">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="个人信息修改" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="浏览历史" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="我的管理" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
          </div>
      </div>
  </div>
</template>
<script>
import indexTopNav from '@/components/topBar/indexTopBar'
export default {
  data () {
      return {
        userinfo: JSON.parse(window.sessionStorage.getItem('userInfo')).data,
        activeName: 'first',
        logData: [{
                    logID: '2016-05-02',
                    loginTime: '王小虎',
                    loginDevice: '上海市普陀区金沙江路 1518 弄'
                  }]
      }
  },
  components: {
    'top-nav': indexTopNav
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab,event)
    }
  },
  mounted () {
    var that = this;
    this.$http.post('http://localhost:3000/log/responseLog', {'userid': JSON.parse(window.sessionStorage.getItem('userInfo')).data.userID})
    .then(function(res){
      console.log(res)
      console.log(that.logData)
      that.logData = res.data
    })
    .catch(function(err){
      console.log(err)
    })
  }
}
</script>
<style>
.UH_userBox{
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-width: 0;
    line-height: 1.2;
}
.UH_userShow{
    justify-content:center;
    margin: auto;
    min-width: 700px;
    max-width: 925px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 2.5rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    line-height: 1.2;
}
.UH_info{
  -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-right: 2.4rem;
    width: 7.5rem;
    height: 7.5rem;
    background-color: #f9f9f9;
    border-radius: 50%;
}
.UH_choose{
    justify-content:center;
    margin: auto;
    min-width: 700px;
    max-width: 925px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 2.5rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    line-height: 1.2;
}
.el-tabs__item{
  font-size: 1.3rem;
}
.el-tabs__content{
  min-width: 700px;
  max-width: 900px;
}
.el-tabs{
  min-width: 700px;
    max-width: 1000px;
} 
.el-tabs--top{
  min-width: 700px;
    max-width: 1000px;
}
</style>


