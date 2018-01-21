const koa = require('koa');
const app = new koa();
const path = require('path');
const serve = require('koa-static');
const main = serve(path.join(__dirname));
console.log('正在代理文件：' + path.join(__dirname));
app.use(main);
app.listen(3000);