<template>
    <div>
        <div class="writePageRootDiv">
            <div class="WP_top">
                <header class="writePageHeader">
                    <div class="WP_headerBox">
                        <div class="WP_headerHomebtn" @click='goHome'>
                            <icon name='home' class="WP_icon1" scale="2"></icon>
                        </div>
                        <input type="text" class="WP_input1" v-model="title" placeholder="输入文章标题...">
                        <div class="WP_right">
                            <div>
                                <div>

                                </div>
                            </div>
                            <div class="WP_right_box1">
                                已保存至<a href="">草稿</a>
                            </div>    
                            <div class="WP_addTitleImg" title="添加文章标题图片">
                                <icon name="picture-o" class="WP_addTitleImg_icon"></icon>
                            </div>
                            <div class="WP_addIcon">
                                    <el-tooltip class="item" effect="dark" content="添加附件" placement="top">
                                        <icon name="plus"></icon>
                                    </el-tooltip>
                            </div>
                            <div class="WP_publish">
                                    <el-dropdown>
                                    <span class="el-dropdown-link">
                                        发布<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>前端</el-dropdown-item>
                                        <el-dropdown-item>ios</el-dropdown-item>
                                        <el-dropdown-item>产品</el-dropdown-item>
                                        <el-dropdown-item>设计</el-dropdown-item>
                                        <el-dropdown-item>人工智能</el-dropdown-item>
                                    </el-dropdown-menu>
                                    </el-dropdown>
                            </div>
                            <div class="indexTopBar_userDiv">
                                
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            
        </div>
        <div class="WP_write">
                <mavon-editor @change="$change" @save='$save'></mavon-editor>
            </div>
    </div>

</template>
<script>
import {getDate} from '../util/util.js'
export default {
    data() {
      return {
        uuid: '',
        pageInfo: {
            uuid: this.uuid,
            titleImgUrl: this.titleImgUrl,
            content: '',
            title: this.title
        },
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        title: ''
      }
    },
    methods: {
        $change(value,render){
            var that = this
            console.log(value)
            console.log(render)
            this.$http.post('http://localhost:3000/writePage/updatePage', {
                'uuid': that.uuid,
                'content': render
            })
            .then(function(res){
                // console.dir(res)
            })
            .catch(function(error){
                console.log(error)
            })
        },
        $save(value,render){
            console.log(value,render)
            this.$http.post('http://localhost:3000/writePage/updatePage', {
                'uuid': that.uuid,
                'content': render
            })
            .then(function(res){
                console.dir(res)
            })
            .catch(function(error){
                console.log(error)
            })
        },
        goHome () { 
            this.$router.push('/')
        }
    },
    computed: {

    },
    watch: {
        title (val) {
            var that = this;
            this.$http.post('http://localhost:3000/writePage/updateTitle',
            {
                'title': val,
                'uuid': that.uuid
            })
            .then(function(res){
                console.log(res)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    },
    mounted () {
        var that = this;
        // 创建即插入一条草稿
        let date = new Date()
        let dateNum = date.getTime()
        let ranNum = Math.round(Math.random()*9999)
        let uuid = 'uuid' + dateNum + ranNum
        this.uuid = uuid
        let sessionInfo = window.sessionStorage.getItem('userInfo')
        var userinfo = JSON.parse(sessionInfo)
        var userid = userinfo.data.userID;
        console.log('文章的uuid:' + uuid);
        var page = {
            'uuid': uuid,
            'userid': userid,
            'title': '',
            'content': ''
        }
        this.$http.post('http://localhost:3000/writePage',
            page
        )
        .then(function(res){
            console.dir(res);
        })
        .catch(function(error){
            console.log(error)
        })

    }
}
</script>
<style>
.WP_top{
    width: 100%;
}
.writePageRootDiv{
    display: block;
    background-color: #ccc; 
    outline: none;
    box-sizing: border-box;
}
.writePageRootDiv{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1.4rem;
    height: 5.334rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
}
.WP_icon1{
    cursor: pointer;
    flex: 0 1 calc(50% - 32.5rem);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.WP_input1{
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    margin: 0;
    padding: 0;
    font-size: 1.7rem;
    font-weight: 700;
    color: #000;
    border: none;
    outline: none;
    overflow: visible;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-writing-mode: horizontal-tb;
    height: 100%;
}
.WP_right{
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /* background-color: #ccc; */
    box-sizing: border-box;
}
.WP_headerBox{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    outline: none;
}
.WP_right_box1{
    font-size: 1rem;
    white-space: nowrap;
    color: #ddd;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    display: block;
}
.WP_right_box1 a{
    cursor: pointer;
    font-size: 1.334rem;
    white-space: nowrap;
    color: #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0 0 0 .4em;
    padding: .2em .4em;
    color: inherit;
    text-decoration: none;
    border: 1px solid currentColor;
    border-radius: 2px;
}
.WP_addTitleImg{
    position: relative;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    box-sizing: border-box;
    display: block;
}
.WP_addTitleImg_icon{
    width: auto;
    height: 1.7rem;
    color: slategray;
    cursor: pointer;
}
.WP_addIcon{
    color: slategray;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    font-size: 12px;
    line-height: 1.2;
    text-rendering: optimizeLegibility;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
/* .el-tooltip__popper.is-dark{
    background-color: slategray;
}
.popper__arrow::after{
    border-bottom-color: slategray;
} */
.WP_headerHomebtn{
    -webkit-box-flex: 0;
    -ms-flex: 0 1 calc(50% - 32.5rem);
    flex: 0 1 calc(50% - 32.5rem);
    position: relative;
    margin: 0.5rem 2rem 0 0;
    width: 2.8rem;
    height: 2.8rem;
    background: 50% no-repeat;
    background-size: contain;
}
.indexTopBar_userDiv{
    /* background: url(http://localhost:3000/image/dongli.jpg); */
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #eee;
    text-align: -webkit-match-parent;
    cursor: pointer;
}
.WP_publish{
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    box-sizing: border-box;
    display: block;
}
.v-modal{
    z-index: 1000;
}
.el-dialog__wrapper{
    z-index: 3000;
}
.WP_write{
    margin-top: 6rem;
}
</style>

