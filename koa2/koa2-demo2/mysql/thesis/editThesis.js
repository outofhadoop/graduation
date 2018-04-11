var p = require('../mysqlConfig');

var editThesis = async (ctx, next) => {
    var msg = ctx.request.body;
    var editthesis1 = `select a.* from thesis_info a where thesisUUID='${msg.thesisUUID}'`
    await p.query(editthesis1).then(function(value){
        try{
            if(value !== undefined){
                // console.log(value)
                ctx.response.body = value[0]
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

var thesisComment = async (ctx, next) => {
    var msg = ctx.request.body;
    var thesiscomment1 = `insert into thesis_discuss (userID,thesisID,discuss) values ('${msg.userID}', '${msg.thesisID}', '${msg.discuss}')`
    await p.query(thesiscomment1).then(function(value){
        try{
            if(value !== undefined){
                // console.log(value)
                ctx.response.body = value[0]
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

var getDiscuss = async (ctx, next) => {
    var msg = ctx.request.body;
    var getdiscuss1 = `select a.*,b.* from thesis_discuss a inner join userinfo b  on a.thesisID=${msg.thesisID} and a.userID=b.userID`
    await p.query(getdiscuss1).then(function(value){
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

var t_response = async (ctx, next) => {
    var msg = ctx.request.body;
    var t_response1 = `insert into thesis_discuss (userID,thesisID,discuss,otherDiscussID) values ('${msg.userID}', '${msg.thesisID}', '${msg.discuss}',${msg.otherDiscussID})`
    await p.query(t_response1).then(function(value){
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

var t_c_response = async (ctx, next) => {
    var msg = ctx.request.body;
    var d = {}
    var m = ''
    await p.query(`select a.*,b.* from thesis_discuss a INNER JOIN userinfo b on a.userID=b.userID and a.discussID=${msg.otherDiscussID}`).then(function(value){
        try{
            if(value !== undefined){
                d = value[0]
                m = `回复 <span style="color: #6799cd">${d.username}</span>：${msg.discuss}`
            }
        }catch(e){
            console.log(e)
            next()
        }
    },function(err){
        console.log(err)
        next()
    })

    var t_c_response1 = `insert into thesis_discuss (userID,thesisID,discuss,otherDiscussID) values ('${msg.userID}', '${msg.thesisID}', '${m}',${msg.otherDiscussID})`
    await p.query(t_c_response1).then(function(value){
        try{
            if(value !== undefined){
                // console.log(value)
                ctx.response.body = 'insert thesis_discuss_child success !'
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
    editThesis,
    thesisComment,
    getDiscuss,
    t_response,
    t_c_response
}