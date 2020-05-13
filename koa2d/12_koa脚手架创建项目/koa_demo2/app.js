const Koa = require('koa'),
    views = require("koa-views"),
    bodyparser = require("koa-bodyparser"),
    static = require("koa-static"),
    session = require("koa-session"),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path');


const index = require('./routers/index')
const admin = require('./routers/admin')

const app = new Koa()

app.use(bodyparser())

app.use(static(__dirname + "/public"))

//配置art-template模板引擎中间件 ---第三方中间件
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式

});

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

//配置路由
router.use(index)
router.use('/admin', admin)

//启动路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)