const Koa = require("koa")
const Router = require("koa-router")


//实例化

const app = new Koa()
const router = new Router()

app.use(async(ctx, next) => {
    console.log("这是一个错误处理中间件");
    await next() //必须
    if (ctx.status == 404) {
        ctx.status = 404
        ctx.body = "这是一个404页面"
    } else {
        console.log(ctx.url);
    }
})


router.get("/", async(ctx) => {
    console.log(2);
    ctx.body = "这是主页"
    console.log(3);
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