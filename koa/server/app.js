const koa = require('koa');
const app = new koa();
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const routerfn = require('./route/routerfn');

app.use(route.get('/login', routerfn.login));

const main = serve(path.join(__dirname));

console.log('正在代理文件：' + path.join(__dirname));
console.log('正在监听端口：' + 3000);

app.listen(3000);