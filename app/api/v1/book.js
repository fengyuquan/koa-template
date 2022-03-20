const Router = require('koa-router')
const CreateSuccess = require('../../exception/CreateSuccess')

const router = new Router({
    prefix: '/v1/book',
})

router.get('/hot_list', async ctx => {
    // ctx.body = {'books': 'books'}
    // throw new global.errs.http.UnAuthenticatedException(10005)
    // throw new global.errs.http.NotFoundException(10002)
    // 1/a
    throw new CreateSuccess(0)
})

module.exports = router
