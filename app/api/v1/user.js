const Router = require('koa-router')
const {RegisterValidator} = require('../../validator/user')

const router = new Router({
    prefix: '/v1/user',
})

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator(ctx).validate()
})

module.exports = router