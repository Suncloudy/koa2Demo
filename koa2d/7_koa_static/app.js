const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")

const app = new Koa()
const router = new Router()

/* 匹配任何路由之前必定会先匹配这个中间件 */ //写一个中间件配置公共的信息
app.use(async(ctx, next) => {

    ctx.state.userinfo = '张三d的网页'; //在ejs页面中可以通过  userinfo 获取到信息

    await next() //这里必须加上 ，否则 不会继续向下匹配路由
})

//配置post bodyparser的中间件
app.use(bodyparser())

//配置静态web服务的中间件       //koa静态资源中间件可以配置多个    
app.use(static(__dirname + "/static")) //首先去static文件夹中找，找到则结束，找不到就接着到  public文件件中寻找
app.use(static(__dirname + "/public"))

//配置模板引擎中间件 ---第三方中间件
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