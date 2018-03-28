var p = require('./mysqlConfig');

var writePage = async (ctx, next) => {
    var msg = ctx.request.body;
    let uuid = msg.uuid;
    let userid = msg.userid;
    let title = msg.title;
    let content = msg.content;
    var insertPage = `insert into thesis_info (userID,thesisTitle,thesisContent,thesisUUID,public) values ('${userid}','${title}','${content}','${uuid}',0)`
    await p.query(insertPage).then(function(value){
        try{
            if(value !== undefined){
                console.log(value)
                ctx.response.body = 'insert success'
                next()
            }
        }catch(e){
            console.log(e)
        }
    },function(err){
        console.log(err)
    })
}

var updatePage = async (ctx,next) => {
    var msg = ctx.request.body;
    let uuid = msg.uuid;
    // let userid = msg.userid;
    // let title = msg.title;
    let content = msg.content;
    // let titleImgUrl = msg.titleImgUrl;
    var updatepage = `update thesis_info set thesisContent='${content}' where thesisUUID='${uuid}'`
    await p.query(updatepage).then(function(value){
        try{
            if(value !== undefined){
                console.log(value)
                ctx.response.body = 'update success'
                next()
            }
        }catch(e){
            console.log(e)
        }
    },function(err){
        console.log(err)
    })
}

var updateTitle = async (ctx, next) => {
    var msg = ctx.request.body;
    var uuid = msg.uuid;
    let title = msg.title;
    var updatetitle = `update thesis_info set thesisTitle='${title}' where thesisUUID='${uuid}'` 
    await p.query(updatetitle).then(function(value){
        try{
            if(value !== undefined){
                console.log(value)
                ctx.response.body = `update title ${uuid} success`
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
    updatePage,
    writePage,
    updateTitle
}