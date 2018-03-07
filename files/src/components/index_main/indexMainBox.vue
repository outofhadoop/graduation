<template>
    <div class="index_main_root">
        <div class="index_main_middle">
            <nav class="index_main_category_nav">
                <h5>热门</h5>
                <ul class="index_main_nav_ul">
                    <li v-for="item in navList" v-bind:key='item.index'>{{ item }}</li>
                </ul>
            </nav>
        </div>
        <div class="index_left">
            <div class="index_left_link">
                <ul>
                    <li v-for="item in leftUl" v-bind:key='item.index'>{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data () {
        return {
            navList: [ '医学', '生物', '数学', '国际' ],
            leftUl: ['优秀论文','FAQ']
        }
    },
    methods: {

    }
}
</script>
<style>
.index_main_root{
    /* display: -webkit-box; */
    /* flex-direction:row; */
    display: -webkit-flex;
    display: flex;
    display: -ms-flexbox;
    /* -webkit-box-align: start; */
    /* -ms-flex-align: start; */
    /* align-items: flex-start;    display: block; */
    /* position: relative; */
    margin: 0 auto;
    width: 100%;
    max-width: 960px;}
    
.index_main_middle{flex-grow: 1;overflow: hidden;
    -moz-box-flex:1.0; /* Firefox */
    -webkit-box-flex:1.0; /* Safari 和 Chrome */
    box-flex:1.0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    max-width: 650px;}
h5{font-size: 1.03rem;font-weight: 500;    display: block;
    font-size: 0.83em;
    -webkit-margin-before: 1.67em;
    -webkit-margin-after: 1.67em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;}
nav{background-color: #fff;display: flex;-webkit-box-pack: justify;display: -webkit-box;display: -ms-flexbox;border-bottom: 1px solid #f6f6f6;}
.index_main_nav_ul{display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: baseline;-ms-flex-align: baseline;align-items: baseline;list-style-type: disc;    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;}
.index_main_nav_ul li{padding-right: 2rem;color: #90979c;cursor: pointer;font-size: 14px;text-align: -webkit-match-parent;position: relative;    display: list-item;list-style: none;}
.index_left{
    width: 240px;
    min-width: 240px;
    margin-left: 20px;
    display: block;
    background-color: #fff;
    border-radius: 2px;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -moz-box-flex:1.0; /* Firefox */
    -webkit-box-flex:1.0; /* Safari 和 Chrome */
    box-flex:1.0;
}
.index_left_link ul{
    list-style: none;
}
</style>

