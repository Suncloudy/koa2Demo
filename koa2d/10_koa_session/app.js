const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")
const render = require('koa-art-template');
const path = require('path');
const session = require("koa-session")

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


app.keys = ['some secret hurr']; /*cookie的签名*/
const CONFIG = {
    key: 'koa:sess',
    /** 默认 */
    maxAge: 10000 * 60,
    /*  cookie的过期时间        【需要修改】  */
    overwrite: true,
    /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true,
    /**  true表示只有服务器端可以获取cookie */
    signed: true,
    /** 默认 签名 */
    rolling: false,
    /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: true,
    /** (boolean) renew session when session is nearly expired      【需要修改】*/
};
app.use(session(CONFIG, app));


//配置art-template模板引擎中间件 ---第三方中间件
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式

});

router.get('/', async(ctx) => {

    console.log(ctx.session.userinfo);

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

//接收post提交的数据
router.get('/news', async(ctx) => {
    console.log(ctx.session.userinfo);
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

router.get('/login', async(ctx) => {

    //设置session
    ctx.session.userinfo = '张三';
    ctx.body = "登录成功";
})


app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/

//监听端口
app.listen(3000)