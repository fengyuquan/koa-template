const Router = require('koa-router')
const RegisterValidator = require('../../../validator/RegisterValidator')

const router = new Router({
    prefix: '/v1/user',
})

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator(ctx).validate()
    const like = v.get('body.like')
    ctx.body = 'latest'
})

module.exports = router