<template>
  <div class="t_root">
      <div>
          <top-nav @login-show="loginShow" ></top-nav>
          <login-box v-show="loginBoxShow" @login-show="loginShow"></login-box>
          <div class="t_thesisContent">
              <div class="t_thesisContent_div1">
                  <div class="UH_info" :style="{backgroundImage: 'url('+ thesisInfo.headImgUrl +')'}">

                  </div>
                  <div class="t_thesisUserInfo">
                      <span>作者：{{ thesisInfo.username }}</span><br>
                      <span>时间：{{ thesisInfo.time }}</span>
                  </div>
              </div>
              <div  class="v-note-show">
                  <div class="v-show-content scroll-style" id="t_content">

                  </div>
              </div>
              <div class="t_comment-box">
                <div class="t_comment-title">评论</div>
                <div class="t_form_comment">
                  <textarea placeholder="说说你的看法" v-model="thesisComment" class="t_content-input" style="overflow: hidden; word-wrap: break-word; height: 60px;"></textarea>
                  <div class="t_action-box" style="">
                    <div class="t_submit-box">
                      <span class="t_submit-text">Ctrl or ⌘ + Enter</span>
                      <button class="t_submit-btn" @click='submitThesisComment'>评论</button>
                    </div>
                  </div>
                </div>
                <ul>
                  <li v-for="(item) in  thesisDiscuss" class="t_comment_li" :key="item.id">
                    <div class="t_comment_li_div">
                      <!-- 头像部分 -->
                      <div class="indexTopBar_userDiv" :style="{backgroundImage: 'url('+ item.thesisDiscuss.headImgUrl==null ? 'http://localhost:3000/image/user.png' : item.headImgUrl +')'}">
                      </div>
                      <!-- 评论信息 -->
                      <div class="t_comment_header">
                        <div class="t_user_info">
                          <div class="t_user_name">
                            {{ item.thesisDiscuss.username }}
                          </div>
                        </div>
                      </div>
                                  <div class="t_c_response">
                                    <el-popover
                                      placement="right"
                                      :title="'评论:' + item.thesisDiscuss.username"
                                      trigger="hover">
                                      <textarea v-model.trim="responseMsg" placeholder="说说你的看法"  class="t_content-input" style="overflow: hidden; word-wrap: break-word; height: 60px;"></textarea>
                                      <el-button slot="reference">评论</el-button>
                                      <el-button type="primary" icon="el-icon-edit" circle @click="t_response(item.thesisDiscuss.discussID)"></el-button>
                                    </el-popover>
                                  </div>
                      <div class="t_conent">
                        <span class="t_conent_text">
                          {{ item.thesisDiscuss.discuss }}
                        </span>
                        <div class="t_sub_comment_box">
                          <div class="t_sub_comment_inner_box">
                            <div>
                              <!-- 评论评论的评论 -->
                              <ul>
                                <li v-for="item1 in item.childDiscuss" :key="item1.id" class="t_c_li">
                                  <div class="indexTopBar_userDiv" :style="{backgroundImage: 'url('+ item1.headImgUrl==null ? 'http://localhost:3000/image/user.png' : item1.headImgUrl +')'}">
                                  </div>
                                  <!-- 评论信息 -->
                                  <div class="t_c_comment_header">
                                    <div class="t_c_user_info">
                                      <div class="t_c_user_name">
                                        {{ item1.username }}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="t_c_response">
                                    <el-popover
                                      placement="right"
                                      :title="'回复:' + item1.username"
                                      trigger="hover">
                                      <textarea placeholder="说说你的看法" v-model.trim="responseMsg"  class="t_content-input" style="overflow: hidden; word-wrap: break-word; height: 60px;"></textarea>
                                      <el-button slot="reference">回复</el-button>
                                      <el-button type="primary" icon="el-icon-edit" circle @click="t_c_response(item.thesisDiscuss.discussID)"></el-button>
                                    </el-popover>
                                  </div>
                                  <div class="t_c_content">
                                    <span v-html="item1.discuss"></span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import indexTopNav from '@/components/topBar/indexTopBar'
import login from '@/components/login'
export default {
  data () {
      return {
          responseMsg: '',
          userid: '',
          loginBoxShow: false,
          thesisInfo: {},
          thesisComment: '',
          thesisDiscuss: []
      }
  },
  components: {
    'top-nav': indexTopNav,
    'loginBox': login,
  },
  methods: {
    responseCallback () {
      var that = this
      let sessionInfo = window.sessionStorage.getItem('userInfo')
      var userinfo = JSON.parse(sessionInfo)
      this.userid = userinfo.data.userID;
      this.$http.post('http://localhost:3000/thesis/getDiscuss', {'thesisID': that.$route.params.thesisID})
      .then(function(res){
          that.thesisDiscuss = []
          // 生成渲染数组
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].otherDiscussID==null){
              let t = { 'thesisDiscuss': res.data[i], 'childDiscuss': []}
              that.thesisDiscuss.push(t)
            }
          }
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].otherDiscussID!=null || res.data[i].otherDiscussID==''){
              for(let j=0;j<res.data.length;j++){
                if(parseInt(res.data[i].otherDiscussID) == res.data[j].discussID){
                  that.thesisDiscuss[j].childDiscuss.push(res.data[i])
                }
              }
            }
          }
          console.log(that.thesisDiscuss)
      })
    },
    t_response (discussID) {
      var that = this
      this.$http.post('http://localhost:3000/thesis/t_response', { 'userID': that.userid, 'discuss': that.responseMsg, 'otherDiscussID': discussID, 'thesisID': that.$route.params.thesisID})
      .then(function(res){
        console.log(res)
        that.responseMsg = ''
        that.responseCallback()
      })
    },
    t_c_response (discussID) {
      var that = this
      this.$http.post('http://localhost:3000/thesis/t_c_response', { 'userID': that.userid, 'discuss': that.responseMsg, 'otherDiscussID': discussID, 'thesisID': that.$route.params.thesisID})
      .then(function(res){
        console.log(res)
        that.responseMsg = ''
        that.responseCallback()
      })
    },
    loginShow () {
      this.loginBoxShow = !this.loginBoxShow;
      console.log(this.loginBoxShow);
    },
    submitThesisComment () {
      var that = this
      let sessionInfo = window.sessionStorage.getItem('userInfo')
      var userinfo = JSON.parse(sessionInfo)
      var userid = userinfo.data.userID;
      this.$http.post('http://localhost:3000/thesis/thesisComment', { 'userID': userid, 'thesisID': that.$route.params.thesisID, 'discuss': that.thesisComment })
      .then(function(res){
        that.$http.post('http://localhost:3000/thesis/getDiscuss', {'thesisID': that.$route.params.thesisID})
        .then(function(res){
            console.log(res)
            that.thesisDiscuss = []
            // 生成渲染数组
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].otherDiscussID==null){
                let t = { 'thesisDiscuss': res.data[i], 'childDiscuss': []}
                that.thesisDiscuss.push(t)
              }
            }
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].otherDiscussID!=null || res.data[i].otherDiscussID==''){
                for(let j=0;j<res.data.length;j++){
                  if(parseInt(res.data[i].otherDiscussID) == res.data[j].discussID){
                    that.thesisDiscuss[j].childDiscuss.push(res.data[i])
                  }
                }
              }
            }
            console.log(that.thesisDiscuss)
        })
      })
      .catch(function(e){
        console.log(e)
      })
    }
  },
  mounted () {
      var that = this
      let sessionInfo = window.sessionStorage.getItem('userInfo')
      var userinfo = JSON.parse(sessionInfo)
      this.userid = userinfo.data.userID;
      this.$http.post('http://localhost:3000/thesis/getOneThesis', {'thesisID': that.$route.params.thesisID})
      .then(function(res){
          console.log(res)
          that.thesisInfo = res.data[0]
          if(that.thesisInfo.headImgUrl == null){
              that.thesisInfo.headImgUrl = 'http://localhost:3000/image/user.png'
          }
          document.getElementById('t_content').innerHTML = that.thesisInfo.thesisContent
      })

      this.$http.post('http://localhost:3000/thesis/addCount', {'thesisID': that.$route.params.thesisID})
      .then(function(res){
          console.log(res)
      })

      this.$http.post('http://localhost:3000/thesis/getDiscuss', {'thesisID': that.$route.params.thesisID})
      .then(function(res){
          console.log(res)
          // 生成渲染数组
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].otherDiscussID==null){
              let t = { 'thesisDiscuss': res.data[i], 'childDiscuss': []}
              that.thesisDiscuss.push(t)
            }
          }
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].otherDiscussID!=null || res.data[i].otherDiscussID==''){
              for(let j=0;j<res.data.length;j++){
                if(parseInt(res.data[i].otherDiscussID) == res.data[j].discussID){
                  that.thesisDiscuss[j].childDiscuss.push(res.data[i])
                }
              }
            }
          }
          console.log(that.thesisDiscuss)
      })
  }
}
</script>
<style>
.UH_info{
  -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-right: 2.4rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #f9f9f9;
    border-radius: 50%;
    background-size: cover;
}
.html{
    font-size: 12px;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    word-break: break-word;
    text-rendering: optimizeLegibility;
    color: #333;
    background-color: #f4f5f5;
}
.t_thesisContent_div1{
    margin-top: 3rem;
}
.t_thesisContent{
    margin-top: 1.767rem;
    padding: 0 0 8rem;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    flex: 0 0 50%;
    width: 50%;
    overflow-y: auto;
    padding: 0 0;
    transition: all 0.2s linear 0s;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    min-width: 300px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s linear 0s;
    background: #fff;
    z-index: 1500;
    text-align: left;
}
pre, code {
  font-size: 0.85rem;
  font-family: Consolas, Inconsolata, Courier, monospace;
}

code {
  margin: 0 0.15rem;
  padding: 0 0.3rem;
  white-space: pre-wrap;
  border: 1px solid #EAEAEA;
  background-color: #F8F8F8;
  border-radius: 3px;
  display: inline; /* added to fix Yahoo block display of inline code */
}

pre {
  font-size: 1rem;
  line-height: 1.2rem;
}

pre code {
  white-space: pre;
  overflow: auto; /* fixes issue #70: Firefox/Thunderbird: Code blocks with horizontal scroll would have bad background colour */
  border-radius: 3px;
  border: 1px solid #CCC;
  padding: 0.5rem 0.7rem;
  display: block !important; /* added to counteract the Yahoo-specific `code` rule; without this, code blocks in Blogger are broken */
}

p {
  /* !important is needed here because Hotmail/Outlook.com uses !important to
     kill the margin in <p>. We need this to win. */
  margin: 0 0 1.2rem 0 !important;
}

table, pre, dl, blockquote, q, ul, ol {
  margin: 0.2rem 0;
}

ul, ol {
  padding-left: 1rem;
}

li {
  margin: 0.5rem 0;
}

/* Space paragraphs in a list the same as the list itself. */
li p {
  /* Needs !important to override rule above. */
  margin: 0.5rem 0 !important;
}

/* Smaller spacing for sub-lists */
ul ul, ul ol, ol ul, ol ol {
  margin: 0;
  padding-left: 1rem;
}

/* Use Roman numerals for sub-ordered-lists. (Like Github.) */
ol ol, ul ol {
  list-style-type: lower-roman;
}

/* Use letters for sub-sub-ordered lists. (Like Github.) */
ul ul ol, ul ol ol, ol ul ol, ol ol ol {
  list-style-type: lower-alpha;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 1rem;
  font-weight: bold;
  font-style: italic;
}

dl dd {
  margin: 0 0 1rem;
  padding: 0 1rem;
}

blockquote, q {
  border-left: 4px solid #DDD;
  padding: 0 1rem;
  color: #777;
  quotes: none;
}

blockquote::before, blockquote::after, q::before, q::after {
  content: none;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0.3rem 0 0rem;
  padding: 0;
  font-weight: bold;
}

h1 {
  font-size: 1.6rem;
  border-bottom: 1px solid #ddd;
}

h2 {
  font-size: 1.4rem;
  border-bottom: 1px solid #eee;
}

h3 {
  font-size: 1.3rem;
}

h4 {
  font-size: 1.2rem;
}

h5 {
  font-size: 1rem;
}

h6 {
  font-size: 1rem;
  color: #777;
}

table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1rem;
  font: inherit;
  border: 0;
}

tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #CCC;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

table tr th, table tr td {
  font-size: 1rem;
  border: 1px solid #CCC;
  margin: 0;
  padding: 0.5rem 1rem;
}

table tr th {
 font-weight: bold;
  background-color: #F0F0F0;
}
.v-show-content{
    margin-top: 3rem;
}
.UH_info{
    display: inline-block;
}
.t_thesisContent img{
    max-width: 100%;
}
.hljs-right{
    text-align: right;
}
.hljs-center {
    text-align: center;
}
.hljs-left {
    text-align: left;
}
.t_thesisUserInfo{
    display: inline-block;
}
.t_comment-box{
  padding-bottom: .2rem;
  padding: 0 0.2rem;
  margin: 0px;
  font-size: 12px;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    word-break: break-word;
    text-rendering: optimizeLegibility;
    color: #333;
    background-color: #f4f5f5;
}
.t_comment-title{
  margin-bottom: 0.3rem;
    font-size: 0.3rem;
    font-weight: 500;
    text-align: center;
    color: #909090;
}
.t_form_comment{
  font-size: 0.8rem;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    word-break: break-word;
    text-rendering: optimizeLegibility;
    color: #333;
    background-color: #f4f5f5;
    position: relative;
    background-color: #f8f9fa;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    margin-bottom: 1rem;
}
.t_form_comment textarea{
resize: none;
    outline: none;
    width: 100%;
    display: block;
    box-shadow: none;
    border: 1px solid #ddd;
    border-radius: 2px;
    transition: border .3s;
    background-color: #fff;
    box-sizing: border-box;
    font-size: 1rem;
}
.t_content-input{
  height: 3.4rem;
    line-height: 0.9rem;
    border-radius: 4px;
    padding: .6rem;
    border: 1px solid #ddd;
    font-size: 1.3rem;
}
.t_action-box{
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    margin-top: 1rem;
}
.t_submit-box{
  white-space: nowrap;

}
.t_submit-btn{
padding: 0;
    width: 3rem;
    height: 1.5rem;
    font-size: 1rem;
-webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: 2px;
    border: none;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer;
}
ul li{
  list-style: none;
}
.t_user_name{
  display: inline-block;
  top: -1rem;
    position: relative;
    font-size: 1rem;
}
.t_comment_header{
  display: inline-block;
}
.indexTopBar_userDiv{
  display: inline-block;
}
.t_conent_text{
      margin: .5rem 0 0 3.5rem;
      font-size: 1rem;
}
.t_c_conent_text{
      margin: .5rem 0 0 3.5rem;
      font-size: 1rem;
}
.t_c_user_name{
  display: inline-block;
  top: -1rem;
    position: relative;
    font-size: 1rem;
}
.t_c_comment_header{
  display: inline-block;
}
.t_c_content{
    margin-top: 5px;
    font-size: 14px;
    white-space: pre-wrap;
    margin: 0 0 0 3.5rem;
}
.t_c_li{
  border-left: rgb(183, 193, 202) 1px solid;
  padding-left: 0.5rem;
}
.t_comment_li{
  border-left: rgb(183, 193, 202) 1px solid;
  padding-left: 0.5rem;
}
.el-button{
  padding: 6px 10px;
}
.t_c_response{
  display: inline-block;
  position:relative;
  top: -1rem;
}
</style>

