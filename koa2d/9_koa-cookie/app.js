const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")
const render = require('koa-art-template');
const path = require('path');

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





//配置art-template模板引擎中间件 ---第三方中间件
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式

});

router.get('/', async(ctx) => {

    ctx.cookies.set("userinfo", "zhangsan111", {
        maxAge: 60 * 1000,
        httpOnly: false, //false表示客户端和服务端都可以访问，true表示只能在服务器端访问
        //path: "/news", //配置可以访问的页面
        //domain: ".baidu.com"    /*正常情况不要设置 默认就是当前域下面的所有页面都可以方法*/
    })


    let list = {
        name: '张三',
        h: '<h2>这是一个h2</h2>',
        num: 20,
        data: ['11111111', '2222222222', '33333333333']
    }
    await ctx.render('index', {
        list: list
    });
})

router.get('/about', async(ctx) => {

    name = Buffer.from("余朝阳").toString("base64") //设置中文cookie
    console.log(name);
    ctx.cookies.set('myname', name, {
        maxAge: 60 * 1000 * 60,
        path: '/news'
    });

    ctx.body = "这是关于我们";
})

//接收post提交的数据
router.get('/news', async(ctx) => {

    var userinfo = ctx.cookies.get("userinfo") //获取 cookie数据
    console.log(userinfo);

    let data = ctx.cookies.get("myname")
    let myname = Buffer.from(data, "base64").toString() //获取 中文cookie数据
    console.log(myname);

    let sss = {
        name: '张三11',
        h: '<h2>这是一个h211</h2>',
        num: 20,
        data: ['11111111', '2222222222', '33333333333']
    };
    await ctx.render('news', {
        list: sss
    });
})

app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)