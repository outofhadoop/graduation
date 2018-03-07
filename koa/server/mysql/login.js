const koa = require('koa');
const p = require('./config.js');
const mysql = require('mysql');
const wapper = require('co-mysql');


var username = "", password = "";





var login = ctx => {
    console.log('123')
    var msg = ctx.request.body;
    username = msg.username;
    password = msg.password;
    var queryUsername = `select * from userinfo where username='${ username }' and password='${ password }'`
    p.query(queryUsername).then(function(value){
        ctx.body = value;
    },function(err){
        console.log(err)
    })
}

module.experts = {
    login: login
}