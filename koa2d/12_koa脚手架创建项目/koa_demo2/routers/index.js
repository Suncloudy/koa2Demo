var router = require('koa-router')();


//配置admin的子路由  层级路由
router.get('/', async(ctx) => {

        await ctx.render('default/index');
    })
    //注意 前台后后台匹配路由的写法不一样
router.get('/case', (ctx) => {

    ctx.body = '案例'
})

router.get('/about', async(ctx) => {

    await ctx.render('default/about');
})
module.exports = router.routes();