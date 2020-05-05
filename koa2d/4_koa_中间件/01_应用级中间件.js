const Koa = require("koa")
const Router = require("koa-router")


//实例化

const app = new Koa()
const router = new Router()

// app.use(async(ctx, next) => {
//     ctx.body = "这是一个中间件"
//     await next()
// })

/* 匹配任何路由之前必定会先匹配这个中间件 */
app.use(async(ctx, next) => {
    console.log("1");
    await next() //这里必须加上 ，否则 不会继续向下匹配路由
    console.log("4");
})





router.get("/", async(ctx) => {
    console.log(2);
    ctx.body = "这是主页"
    console.log(3);
})

router.get("/news", async(ctx) => {
    ctx.body = "这是新闻页面"
})

router.get("/game", async(ctx) => {
    ctx.body = "这是游戏页面"
})


app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)