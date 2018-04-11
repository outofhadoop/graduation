var p = require('./mysqlConfig');

var logInsert = async (ctx, next) => {
    var msg = ctx.request.body;
    let userid = msg.userid;
    let loginTime = msg.loginTime;
    let loginDevice = msg.loginDevice;
    // console.log(msg)
    var logInfo = `insert into user_login_info (userID,loginTime,loginDevice) values ('${userid}','${loginTime}','${loginDevice}')`
    await p.query(logInfo).then(function(value){
        try{
            if(value !==undefined){
                // console.log(value);
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
                // console.log(value);
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

var getHistory = async (ctx, next) => {
    
    var msg = ctx.request.body;
    var gethistory1
    await p.query(`select a.* from userinfo a where a.userID=${msg.userID}`).then(function(value){
        try{
            var h = value[0].history
            if(h == null){
                ctx.response.body = [{ 'thesisTitle': '', 'username': ''}]
                next()
            }else{
                var hArr = h.split('/')
                // console.log(hArr)
                gethistory1 = `select a.*, b.* from thesis_info a inner join userinfo b on a.userID=b.userID and`
                for(let i=1;i<hArr.length;i++){
                    if(i==hArr.length-1){
                        gethistory1 = gethistory1 + ` a.thesisID=${parseInt(hArr[i])})`
                    }else if(i==1){
                        gethistory1 = gethistory1 + ` (a.thesisID=${parseInt(hArr[i])} or`
                    }else{
                        gethistory1 = gethistory1 + ` a.thesisID=${parseInt(hArr[i])} or`
                    }
                    // console.log(gethistory1)
                }
            }

        }catch(e){
            console.log(e)
            next()
        }
    })
    await p.query(gethistory1).then(function(value){
        try{
            if(value !== undefined){
                // console.log(value)
                ctx.response.body = value
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

var getUserThesis = async (ctx, next) => {
    var msg = ctx.request.body;
    let userid = msg.userID
    // console.log(msg);
    var getuserthesis1 = `select a.*, b.* from thesis_info a inner join userinfo b on a.userID=b.userID and b.userID=${userid}`;
    await p.query(getuserthesis1).then(function(value){
        try{
            if(value !== undefined){
                ctx.response.body = value
                next()
            }else{
                ctx.response.body = 'response UserThesis error'
                console.log('response UserThesis error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    })
}

var setUserThesisPublish = async (ctx, next) => {
    var msg = ctx.request.body;
    let thesisID = msg.thesisID
    var userid = msg.userID;
    // console.log(msg);
    var setuserthesispublish1 = `update thesis_info set public=1 where thesisID=${thesisID}`;
    await p.query(setuserthesispublish1).then(function(value){
        try{
            if(value !== undefined){
               
            }else{
                ctx.response.body = 'response setUserThesisPublish error'
                console.log('response setUserThesisPublish error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    })
    var getuserthesis1 = `select a.*, b.* from thesis_info a inner join userinfo b on a.userID=b.userID and b.userID=${userid}`;
    await p.query(getuserthesis1).then(function(value){
        try{
            if(value !== undefined){
                ctx.response.body = value
                next()
            }else{
                ctx.response.body = 'response UserThesis error'
                console.log('response UserThesis error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    })
}

var setUserThesisUnPublish = async (ctx, next) => {
    var msg = ctx.request.body;
    let thesisID = msg.thesisID
    var userid = msg.userID;
    // console.log(msg);
    var setuserthesisunpublish1 = `update thesis_info set public=0 where thesisID=${thesisID}`;
    await p.query(setuserthesisunpublish1).then(function(value){
        try{
            if(value !== undefined){
               
            }else{
                ctx.response.body = 'response setUserThesisPublish error'
                console.log('response setUserThesisPublish error')
                next()
            }
        }catch(e){
            console.log(e)
            next()
        }
    })
    var getuserthesis1 = `select a.*, b.* from thesis_info a inner join userinfo b on a.userID=b.userID and b.userID=${userid}`;
    await p.query(getuserthesis1).then(function(value){
        try{
            if(value !== undefined){
                ctx.response.body = value
                next()
            }else{
                ctx.response.body = 'response UserThesis error'
                console.log('response UserThesis error')
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
    responseLog,
    getHistory,
    getUserThesis,
    setUserThesisPublish,
    setUserThesisUnPublish
}