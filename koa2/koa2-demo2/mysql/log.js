var p = require('./mysqlConfig');

var logInsert = async (ctx, next) => {
    var msg = ctx.request.body;
    let userid = msg.userid;
    let loginTime = msg.loginTime;
    let loginDevice = msg.loginDevice;
    console.log(msg)
    var logInfo = `insert into user_login_info (userID,loginTime,loginDevice) values ('${userid}','${loginTime}','${loginDevice}')`
    await p.query(logInfo).then(function(value){
        try{
            if(value !==undefined){
                console.log(value);
                ctx.response.body = 'log insert success'
                next()
            }else{
                ctx.response.body = 'insert log error'
                console.log('insert log error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    },function(err){
        console.log(err)
        next()
    })
}

var responseLog = async (ctx, next) => {
    var msg = ctx.request.body;
    let userid = msg.userid
    console.log(msg);
    var showLog = `select * from user_login_info where userID=${userid} order by loginID desc`;
    await p.query(showLog).then(function(value){
        try{
            if(value !== undefined){
                console.log(value);
                ctx.response.body = value
                next()
            }else{
                ctx.response.body = 'response log error'
                console.log('response log error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    })
}

module.exports = {
    logInsert,
    responseLog
}