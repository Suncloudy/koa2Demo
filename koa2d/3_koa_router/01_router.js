const Koa = require("koa")
const Router = require("koa-router")


//实例化

const app = new Koa()
const router = new Router()

//配置路由方式一                    //ctx  上下文 context ，包含了request 和response等信息
// router.get("/", (ctx) => {
//     ctx.body = "这是主页"
// }).get("/news", (ctx) => {
//     ctx.body = "这是新闻页面"
// }).get("/game", (ctx) => {
//     ctx.body = "这是游戏页面"
// })

//配置路由方式二
router.get("/", async(ctx) => {
    ctx.body = "这是主页"
})

router.get("/news", async(ctx) => {
    ctx.body = "这是新闻页面"
})

router.get("/game", async(ctx) => {
    ctx.body = "这是游戏页面"
})


app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

/*
    router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
    看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
    路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
*/


//监听端口
app.listen(3000)