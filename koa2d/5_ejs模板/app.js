const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const path = require("path")
    //实例化

const app = new Koa()
const router = new Router()

/* 匹配任何路由之前必定会先匹配这个中间件 */ //写一个中间件配置公共的信息
app.use(async(ctx, next) => {

    ctx.state.userinfo = '张三d的网页'; //在ejs页面中可以通过  userinfo 获取到信息

    await next() //这里必须加上 ，否则 不会继续向下匹配路由
})


//配置模板引擎中间件 ---第三方中间件

/* 第一种方式 */
app.use(views(__dirname + "/views", {
    extension: "ejs" // 模板的后缀名是.ejs
}))

/* 第二种方式 */
// app.use(views(__dirname + '/views', { map: { html: 'ejs' } })); //这样配置也可以  注意如果这样配置的话 模板的后缀名是.html

router.get("/", async(ctx) => {
    let title = "你好，傻逼"
    await ctx.render("index", {
        title: title
    })

})

router.get("/news", async(ctx) => {
    title = "你是不是有病"
    let lis = [1, 2, 3, 4, 5, 6]
    await ctx.render("news", {
        title: title,
        lis: lis
    })
})

router.get("/game", async(ctx) => {
    title = "你是不是有病"
    let lis = [1, 2, 3, 4, 5, 6]
    num = 20
    let html_str = "<h1>你是什么东西</h1>"
    await ctx.render("game", {
        title: title,
        lis: lis,
        h: html_str,
        num: num
    })
})


app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)