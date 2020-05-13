/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*用户的增加修改删除*/

var router = require('koa-router')();

router.get('/', async(ctx) => {
    //ctx.body='用户首页';
    // await ctx.render('/admin/user/index');  /* 前端页面 路径 前面不能加 / ,否则报错 */
    await ctx.render('admin/user/index');
})

router.get('/add', async(ctx) => {
    await ctx.render('admin/user/add');
})

router.get('/edit', async(ctx) => {

    await ctx.render('admin/user/edit');

})

router.get('/delete', async(ctx) => {
    ctx.body = '删除用户';
})


module.exports = router.routes();