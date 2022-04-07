const Router = require('koa-router')
const { Auth } = require('../../middleware/auth')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth(Auth.ADMIN).m, async (ctx, next) => {
  ctx.body = 'latest'
})

module.exports = router
