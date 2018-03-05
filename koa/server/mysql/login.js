const koa = require('koa');
const p = require('./config.js');
const mysql = require('mysql');
const wapper = require('co-mysql');


var username = "root", password = "123456"

const queryUsername = `select * from userinfo where username='${ username }' and password='${ password }'`

p.query(queryUsername).then(function(value){
    console.log(value);
},function(err){
    console.log(err)
})