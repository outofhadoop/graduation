const koa = require('koa');
const app = new koa();
const path = require('path');
const p = require('./mysql/config.js');
const serve = require('koa-static');
const route = require('koa-route');
// const login = require('./mysql/login');

app.use(route.get('/login', ctx => {
    console.log('123')
    var msg = ctx.request.body;
    console.log(msg)
    var username = msg.username;
    var password = msg.password;
    var queryUsername = `select * from userinfo where username='${ username }' and password='${ password }'`
    p.query(queryUsername).then(function(value){
        ctx.body = value;
    },function(err){
        console.log(err)
    })
}));

const main = serve(path.join(__dirname));

console.log('正在代理文件：' + path.join(__dirname));
console.log('正在监听端口：' + 3000);

app.listen(3000);