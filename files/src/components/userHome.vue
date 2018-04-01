<template>
  <div class="UH_root">
      <div class="UH_box">
          <top-nav></top-nav>
          <div class="UH_userBox">
            <div class="UH_userShow">
              <div class="UH_info" :style="{backgroundImage: 'url('+ userInfo.headImgUrl +')'}">
                
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
              <el-tab-pane label="个人信息修改" name="second">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="头像修改" prop="name">
                    <form method="post" enctype="multipart/form-data">
                        <input class="userHeadFormDatabtn" type="file" name="img" @change='getUserFile' /><br/>  
                    </form>   
                  </el-form-item>
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio label="male"></el-radio>
                      <el-radio label="female"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="年龄" prop="age">
                    <el-input v-model="ruleForm.age"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="telephone">
                    <el-input v-model="ruleForm.telephone"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ" prop="QQ">
                    <el-input v-model="ruleForm.QQ"></el-input>
                  </el-form-item>
                  <el-form-item label="微信" prop="WeChat">
                    <el-input v-model="ruleForm.WeChat"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click='submitUserInfo'>提交</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
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
        userHeadImg: '',
        imageUrl: '',
        userinfo: JSON.parse(window.sessionStorage.getItem('userInfo')).data,
        activeName: 'first',
        logData: [{
                    logID: '2016-05-02',
                    loginTime: '王小虎',
                    loginDevice: '上海市普陀区金沙江路 1518 弄'
                  }],
        ruleForm: {
                  username: '',
                  password: '',
                  sex: '',
                  age: '',
                  telephone: '',
                  QQ: '',
                  WeChat: '',
                  email: '',
                  headImgUrl:''
                },
                rules: {
                  username: [
                    { message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ]
                }
      }
  },
  components: {
    'top-nav': indexTopNav
  },
  methods: {
    submitUserInfo () {
      console.log(this.ruleForm);
      var that = this;
      this.$http.post('http://localhost:3000/userInfo/setUserInfo', that.ruleForm)
      .then(function(res){
        try{
          console.log(res)
          that.$message({
            message: '更改成功',
            type: 'success'
          })
        }catch(e){
          console.log(e)
        }
      })
    },
    getUserFile (event) {
      var that = this;
      let formdata = new FormData();
      formdata.append('img', event.target.files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post('http://localhost:3000/profile', formdata, config)
      .then(function(res){
        try{
          console.log(res)
          that.$store.commit('setUserHeadImgUrl', { 'headImgUrl': 'http://localhost:3000/image/' + res.data.filename })
        }catch(e){
          console.log(e)
        }
      })
    },
    userheadImgSubmit () {
      var formdata = new FormData(document.getElementById('formdata'))
      formdata.append("userfile", fileInputElement.files[0]);
      console.log(formdata)
    },
    handleClick (tab, event) {
      console.log(tab,event)
    },
    uploadError (err){
      consoel.log(err)
    },
    uploadSuccess (response, file, fileList){
      console.log('success')
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  mounted () {
    var that = this;
    var userid = JSON.parse(window.sessionStorage.getItem('userInfo')).data.userID
    this.$http.post('http://localhost:3000/log/responseLog', {'userid': userid})
    .then(function(res){
      console.log(res)
      console.log(that.logData)
      that.logData = res.data
    })
    .catch(function(err){
      console.log(err)
    })

    this.$http.post('http://localhost:3000/userInfo/getUserInfo',{ 'userid': userid })
    .then(function(res){
      console.log(res.data)
      that.ruleForm = res.data
    })
    .catch(function(err){
      console.log(err)
    })
  },
  computed: {
      loginState () {
        return this.$store.state.login.loginState; 
      },
      userInfo () {
        return this.$store.state.login.userInfo; 
      }
  },
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
    background-size: cover;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .userHeadFormDatabtn{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
</style>


