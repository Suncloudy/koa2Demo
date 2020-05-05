const Koa = require("koa")
const Router = require("koa-router")


//实例化

const app = new Koa()
const router = new Router()




router.get("/", async(ctx) => {
    console.log(2);
    ctx.body = "这是主页"
    console.log(3);
})

//路由级中间件，匹配 /news路由之前必定会经过 这个中间件
router.get("/news", async(ctx, next) => {
    console.log("这是一个路由级中间件开始");
    ctx.body = "这是新闻页面1"
    await next()
    console.log("这是一个路由级中间件结束");

})

router.get("/news", async(ctx) => {
    ctx.body = "这是新闻页面2"
})

router.get("/game", async(ctx) => {
    ctx.body = "这是游戏页面"
})


app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)