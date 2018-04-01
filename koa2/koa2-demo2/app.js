const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const koaCors = require('koa-cors')
const fs = require('fs');

const index = require('./routes/index')
const users = require('./routes/users')
const path = require('path')
console.log(path.join(__dirname + '/public'))
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(koaBody({ multipart: true }))
app.use(json())
app.use(logger())
app.use(koaCors())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// app.use(async function(ctx, next) {
//   // ignore non-POSTs
//   if ('POST' != ctx.method) return await next();

//   const file = ctx.request.body.files.file;
//   const reader = fs.createReadStream(file.path);
//   const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
//   reader.pipe(stream);
//   console.log('uploading %s -> %s', file.name, stream.path);
// });

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
