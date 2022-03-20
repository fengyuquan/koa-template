const Router = require('koa-router')
const {TokenValidator} = require('../../validator/token')
const UserDao = require('../../dao/user')

const router = new Router({
    prefix: '/v1/token',
})

router.post('/login', async (ctx, next) => {
    const v = await new TokenValidator(ctx).validate()
    const token = await UserDao.emailLogin(v)
    ctx.body = {token}
})

module.exports = router