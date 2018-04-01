const multer = require('koa-multer');
const path = require('path')
const fs = require('fs')

const uploadImg = multer({ dest: path.join(__dirname, './public/image') });

const uploadUserHeadImg = async (ctx, next) => {
    console.log(ctx.req.file)
    let nameTypeArray = ctx.req.file.originalname.split('.')
    let filename = ctx.req.file.filename
    ctx.response.body = {'filename': filename + '.' + nameTypeArray[nameTypeArray.length-1]}
    if(nameTypeArray.length === 0){
        console.log('log：传过来的文件并没有后缀名')
        ctx.response.body = {msg:'upload no name success'}
        next()
    }else{
        fs.renameSync(path.join(__dirname, './public/image/')  + filename, path.join(__dirname, './public/image/') + filename + '.' + nameTypeArray[nameTypeArray.length-1], function(err){
            if(err){
                console.log(err);
                next()
            }else{
                next()
            }
            
        })
    }
}

module.exports = {
    uploadImg,
    uploadUserHeadImg
}