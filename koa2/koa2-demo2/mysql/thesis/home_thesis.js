var p = require('../mysqlConfig');

var getThesis = async (ctx, next) => {
    var msg = ctx.request.body;
    var getthesis = `select a.*, b.username from thesis_info a left join userinfo b on a.userID=b.userID  order by thesisID desc limit 0,${msg.num}`
    await p.query(getthesis).then(function(value){
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

var getOneThesis = async (ctx, next) => {
    var msg = ctx.request.body;
    var getonethesis = `select a.*, b.* from thesis_info a inner join userinfo b on a.userID=b.userID and a.thesisID=${msg.thesisID}`
    await p.query(getonethesis).then(function(value){
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

var addCount = async (ctx, next) => {
    var msg = ctx.request.body;
    var addcount1 = `update thesis_info set countNum=countNum+1 where thesisID='${msg.thesisID}'`
    await p.query(addcount1).then(function(value){
        try{
            if(value !== undefined){
                // console.log(value)
                ctx.response.body = 'add count success'
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

module.exports = {
    getThesis,
    getOneThesis,
    addCount
}