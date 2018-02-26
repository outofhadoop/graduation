const koa = require('koa')
const config = require('./config.js')
const mysql = require('mysql')
var query = function(sql, values){
    return new Promise((resolve,reject) => {
        if(err){
            resolve(err)
        }else{
            connection.query(sql, values, (err, rows) => {
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
                connection.release()
            })
        }
    })
}

const login = 'select from '