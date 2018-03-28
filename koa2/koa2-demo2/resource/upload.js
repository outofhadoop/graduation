const FormBody = require("form-body");
const formBody = new FormBody()
const result = await formBody({
    ctx: ctx,
    path: path.join(__dirname, "../static"),
    dir: "/",
    rule: function() {
      return false;
    }
  });
  console.log(result);