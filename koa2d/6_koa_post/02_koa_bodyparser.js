const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const bodyparser = require("koa-bodyparser")
    //实例化

const app = new Koa()
const router = new Router()

/* 匹配任何路由之前必定会先匹配这个中间件 */ //写一个中间件配置公共的信息
app.use(async(ctx, next) => {

    ctx.state.userinfo = '张三d的网页'; //在ejs页面中可以通过  userinfo 获取到信息

    await next() //这里必须加上 ，否则 不会继续向下匹配路由
})

app.use(bodyparser())

//配置模板引擎中间件 ---第三方中间件

/* 第一种方式 */
app.use(views(__dirname + "/views", {
    extension: "ejs" // 模板的后缀名是.ejs
}))


router.get("/", async(ctx) => {
    await ctx.render("index")
})

router.post("/doAdd", async(ctx) => {
    let data = ctx.request.body
    console.log(data); //{ username: '123', password: '23111' } Json对象
    ctx.body = data
})

app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)