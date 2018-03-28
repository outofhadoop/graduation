const router = require('koa-router')()
const login = require('../mysql/login')
const writePage = require('../mysql/writePage')
const log = require('../mysql/log')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
  next()
})

// router.get('/login', login);

router.post('/login', login);

router.post('/writePage', writePage.writePage);

router.post('/writePage/updatePage', writePage.updatePage);

router.post('/writePage/updateTitle', writePage.updateTitle)

router.post('/log/logInsert', log.logInsert)

router.post('/log/responseLog', log.responseLog)

module.exports = router
