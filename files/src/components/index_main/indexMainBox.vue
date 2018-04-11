<template>
    <div class="index_main_root">
        <div class="index_main_middle">
            <nav class="index_main_category_nav">
                <h5>热门</h5>
                <ul class="index_main_nav_ul">
                    <li v-for="item in navList" v-bind:key='item.index'>{{ item }}</li>
                </ul>
            </nav>
            <ul>
                <li v-for="(item1, index) in index_content" v-bind:key='item1.index' class="index_content_li">
                    <a class="index_content_li_a" @click="goThesis(item1.thesisID)">
                        <div class="index_content_li_a_div">
                            <div>
                                <div>
                                    <a href="">{{ item1.thesisTitle }}</a>
                                </div>
                                <div class="index_content_li_div">
                                    <ul>
                                        <li><span class="index_content_li_span" v-bind:class="'index_content_li_span_color_' + item1.thesisKind">{{ item1.thesisKind }}</span></li>
                                        <li class="index_content_li_2"><div>{{ item1.username }}</div></li>
                                        <li class="index_content_li_3">{{ item1.time }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="index_left">
            <div class="index_left_link">
                <ul>
                    <li v-for="item2 in leftUl" v-bind:key='item2.index'>{{ item2 }}</li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data () {
        return {
            num: 6,
            navList: [ '医学', '生物', '数学', '国际' ],
            leftUl: ['优秀论文','FAQ'],
            index_content: [
                {
                    title: '假装有标题',
                    type: 'yixue',
                    author: '我是作者',
                    time: '2018-2-2',
                    count: '99999'
                },
                {
                    title: '假装有标题',
                    type: 'yixue',
                    author: '我是作者',
                    time: '2018-2-2',
                    count: '99999'
                },
                {
                    title: '假装有标题',
                    type: 'yixue',
                    author: '我是作者',
                    time: '2018-2-2',
                    count: '99999'
                },
            ]
        }
    },
    methods: {
        goThesis (id) {
            this.$router.push(`/thesis/${id}`)
        }
    },
    computed: {

    },
    mounted () {
        var that = this
        this.$http.post('http://localhost:3000/thesis/getThesis', {'num': that.num})
        .then(function(res){
            console.log(res)
            that.index_content = res.data
        })

        window.onscroll=function(){
            let h1 = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop,
                h2 = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight,
                h3 = document.documentElement.scrollHeight?document.documentElement.scrollHeight:document.body.scrollHeight
            if((h1 + h2) == h3){
                console.log('daodi')
                that.num = that.num + 6
                that.$http.post('http://localhost:3000/thesis/getThesis', {'num': that.num})
                .then(function(res){
                    console.log(res)
                    that.index_content = res.data
                })
            }
        }
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
.index_content_li{
    background: white;
    border-bottom: 1px solid rgba(178,186,194,.15);
    list-style: none;
    display: list-item;
    text-align: -webkit-match-parent;
}
.index_content_li_a{
    word-break: break-word;
    -ms-word-break: break-word;
    -webkit-word-break: break-word;
    cursor: pointer;
}
.index_content_li_a_div{
    display: flex;
    display: -ms-flexbox;
    display: -webkit-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1.167rem 2rem;
    min-height: 5.75rem;
}
.index_content_li_a_div div{
    display: list-item;
    text-align: -webkit-match-parent;
}
.index_content_li_a_div div div{
    -webkit-box-direction: normal;
    margin: .3rem 0 .5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.index_content_li_a_div div div a{
    white-space: nowrap;
    overflow: hidden;
    color: #333;
    text-decoration: none;
    font-weight: bold;
}
.index_content_li_a_div div div a:hover{
    text-decoration: underline;
}
.index_content_li_div{
    font-size: 1rem;
    color: #8f969c;
    display: block;
    -webkit-box-direction: normal;
}
.index_content_li_div ul{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    white-space: nowrap;
    list-style: none;
}
.index_content_li_div ul li{
    display: list-item;
    text-align: -webkit-match-parent;
}
.index_content_li_span_color_医学{
    background-color: #abbb79;
}
.index_content_li_span_color_lunwen{
    background-color: #abbb79;
}
.index_content_li_span_color_论文{
    background-color: #f55d21;
}
.index_content_li_span_color_产品{
    background-color: #3af521;
}
.index_content_li_span_color_设计{
    background-color: #dc21f5;
}
.index_content_li_span_color_人工智能{
    background-color: #5e24ff;
}
.index_content_li_span{
    display: inline-block;
    margin-right: 1rem;
    padding: .18rem 0;
    min-width: 4.5rem;
    text-align: center;
    line-height: 1;
    color: #fff;
    border-radius: 10px;
}
.index_content_li_2{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    font-size: 1rem;
    color: #8f969c;
    cursor: pointer;
}
.index_content_li_2 div{
    white-space: nowrap;
    font-size: 0.8rem;
    color: #8f969c;
}
.index_content_li_2 div::after{
    content: '\B7';
    margin: 0 .4em;
    color: #8f969c;
}
.index_content_li_2 div:hover{
    color: #007fff;
}
.index_content_li_3::after{
    content: '\B7';
    margin: 0 .4em;
    color: #8f969c;
}
.index_content_li_3{
    white-space: nowrap;
    font-size: 0.8rem;
    color: #8f969c;
}
</style>

