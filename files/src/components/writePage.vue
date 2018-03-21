<template>
  <div class="writePageRootDiv">
      <div>
          <header class="writePageHeader">
              <div class="WP_headerBox">
                  <div class="WP_headerHomebtn">
                      <icon name='home' class="WP_icon1" scale="2"></icon>
                  </div>
                  <input type="text" class="WP_input1" placeholder="输入文章标题...">
                  <div class="WP_right">
                      <div>
                          <div>

                          </div>
                      </div>
                      <div class="WP_right_box1">
                          已保存至<a href="">草稿</a>
                      </div>    
                      <div class="WP_addTitleImg">
                          <icon name="picture-o" class="WP_addTitleImg_icon"></icon>
                      </div>
                      <div class="WP_addIcon">
                            <el-tooltip class="item" effect="dark" content="添加附件" placement="top">
                                <icon name="plus"></icon>
                            </el-tooltip>
                      </div>
                      <div>

                      </div>
                      <div class="indexTopBar_userDiv">
                          
                      </div>
                  </div>
              </div>
          </header>
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
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
    background-color: #ccc;
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
    font-size: 1.334rem;
    white-space: nowrap;
    color: #ddd;
    cursor: default;
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
    margin: 0.5rem 1rem 0 0;
    width: 2.8rem;
    height: 2.8rem;
    background: 50% no-repeat;
    background-size: contain;
}
</style>

