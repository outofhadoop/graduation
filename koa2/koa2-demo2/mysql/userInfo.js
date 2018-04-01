var p = require('./mysqlConfig');

var getUserInfo = async (ctx, next) => {
    var msg = ctx.request.body;
    let userid = msg.userid;
    var getuserinfo = `select * from userinfo where userID=${ userid }`
    await p.query(getuserinfo).then(function(value){
        try{
            if(value !== undefined){
                console.log(value)
                ctx.response.body = value[0]
                next()
            }
        }catch(e){
            console.log(e)
        }
    },function(err){
        console.log(err)
    })
}

var setUserInfo = async (ctx, next) => {
    var msg = ctx.request.body;
    
    var setuserinfo = `update userinfo set username='${msg.username}', password='${msg.password}', sex='${msg.sex}', age=${msg.age}, telephone='${msg.telephone}', QQ='${msg.QQ}', WeChat='${msg.WeChat}', email='${msg.email}' where userID=${ msg.userID }`
    await p.query(setuserinfo).then(function(value){
        try{
            if(value !== undefined){
                console.log(value)
                ctx.response.body = 'update userinfo success'
                next()
            }
        }catch(e){
            console.log(e)
        }
    },function(err){
        console.log(err)
    })
}


module.exports = {
    getUserInfo,
    setUserInfo
}