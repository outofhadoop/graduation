var p = require('./mysqlConfig');

    var login = async (ctx, next) => {
        var msg = ctx.request.body;
        let username = msg.username;
        let password = msg.password;
        // console.log(msg)
        var queryUsername = `select * from userinfo where username='${ username }' and password='${ password }'`
        await p.query(queryUsername).then(function(value){
            try{
                if(value !== undefined){
                    let time = Date();
                    ctx.response.body = {'userID' : value[0].userID, 'username': value[0].username, 'state': 1, 'date': time}
                    // console.log(value[0].userID + '登录成功')
                    next()
                }else{
                    ctx.response.body = {
                        'userID' : '', 'username': '', 'state': 0
                    }
                    console.log(username + '登录失败')
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

    var register = async (ctx, next) => {
        var msg = ctx.request.body;
        let username = msg.username;
        var queryUsername = `select * from userinfo where username='${ username }'`
        await p.query(queryUsername).then(function(value){
            try{
                if(JSON.stringify(value) == '[]'){
                    ctx.response.body = false
                    next()
                }else{
                    ctx.response.body = true
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

    var registerAddUser = async (ctx, next) => {
        var msg = ctx.request.body;
        let username = msg.username;
        let password = msg.password
        var registeradduser1 = `insert into userinfo (username,password) values ('${username}','${password}') a where username='${ username }'`
        await p.query(registeradduser1).then(function(value){
            try{
                if(value == undefined){
                    // console.log(value)
                    ctx.response.body = value
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
    login,
    register,
    registerAddUser
}