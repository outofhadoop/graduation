const router = require('koa-router')()
const login = require('../mysql/login')
const writePage = require('../mysql/writePage')
const log = require('../mysql/log')
const upload = require('../multer.js')
const userInfo  = require('../mysql/userInfo')
const home_thesis = require('../mysql/thesis/home_thesis')
const editThesis = require('../mysql/thesis/editThesis')

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


router.post('/login', login.login);

router.post('/register', login.register);

router.post('/registerAddUser', login.registerAddUser);

router.post('/writePage', writePage.writePage);

router.post('/writePage/updatePage', writePage.updatePage);

router.post('/writePage/updateTitle', writePage.updateTitle)

router.post('/writePage/publishThesis', writePage.publishThesis)

router.post('/log/logInsert', log.logInsert)

router.post('/log/responseLog', log.responseLog)

router.post('/log/getHistory', log.getHistory)

router.post('/log/getUserThesis', log.getUserThesis)

router.post('/log/setUserThesisPublish', log.setUserThesisPublish)

router.post('/log/setUserThesisUnPublish', log.setUserThesisUnPublish)

router.post('/userInfo/getUserInfo', userInfo.getUserInfo)

router.post('/userInfo/setUserInfo', userInfo.setUserInfo)

router.post('/thesis/getThesis', home_thesis.getThesis)

router.post('/thesis/getOneThesis', home_thesis.getOneThesis)

router.post('/thesis/addCount', home_thesis.addCount)

router.post('/thesis/editThesis', editThesis.editThesis)

router.post('/thesis/thesisComment', editThesis.thesisComment)

router.post('/thesis/getDiscuss', editThesis.getDiscuss)

router.post('/thesis/t_response', editThesis.t_response)

router.post('/thesis/t_c_response', editThesis.t_c_response)

router.post('/profile', upload.uploadImg.single('img'), upload.uploadUserHeadImg)

module.exports = router
