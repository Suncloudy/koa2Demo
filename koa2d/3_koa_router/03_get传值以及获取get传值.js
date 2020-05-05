const Koa = require("koa")
const Router = require("koa-router")


//实例化

const app = new Koa()
const router = new Router()


//配置路由方式二
router.get("/", async(ctx) => {
    ctx.body = "这是主页"
})

router.get("/news", async(ctx) => {
    ctx.body = "这是新闻页面"
})

//配置动态路由

//设置一个动态路由
router.get("/newscontent", async(ctx) => {
    /*在 koa2 中 GET 传值通过 request 接收，但是接收的方法有两种：query 和 querystring。
     query：返回的是格式化好的参数对象。
     querystring：返回的是请求字符串。*/

    console.log(ctx.request.url); // "/newscontent?abc=124"
    console.log(ctx.request.query); // [Object: null prototype] { abc: '124' }
    console.log(ctx.request.querystring); // abc=124

    //从ctx中读取get传值

    console.log(ctx.url); // "/newscontent?abc=124"
    console.log(ctx.query); // [Object: null prototype] { abc: '124' }
    console.log(ctx.querystring); // abc=124


    //解决 [Object: null prototype] { abc: '124' } 输出问题

    abc = JSON.parse(JSON.stringify(ctx.query))

    console.log(abc); //{ abc: '124' }
    console.log(typeof(abc)); //object
    ctx.body = "这是详情页面"
})



app.use(router.routes()) //启动路由
app.use(router.allowedMethods()) /*可以配置也可以不配置,建议配置，*/


//监听端口
app.listen(3000)