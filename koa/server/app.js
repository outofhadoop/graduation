const koa = require('koa');
const app = new koa();
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
// const koabody = require('koa-body');
// const login = require('./route')
const main = ctx => {
    ctx.response.body = {ab: '123'};
  };
app.use(route.get('/login', main));
// const main = serve(path.join(__dirname));
// console.log('正在代理文件：' + path.join(__dirname));
// console.log('正在监听端口：' + httpPort);
// app.use(main);
app.listen(3000);