const Koa = require("koa")

const app = new Koa()

//配置路由



//中间件
app.use(async(ctx) => {
    ctx.body = "hello 你好！"
})




app.listen(3000)