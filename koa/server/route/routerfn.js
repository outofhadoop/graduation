const router = require('koa-route');

const login = ctx => {
    ctx.response.body = {
      resultState: '',
      username: '',
      userID: '',
    };
  };

const r = {
    login: login,
    
};

module.exports = r