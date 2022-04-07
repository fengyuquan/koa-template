const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validator/token')
const UserDao = require('../../dao/user')
const { Auth } = require('../../middleware/auth')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/login', async (ctx, next) => {
  const v = await new TokenValidator(ctx).validate()
  const token = await UserDao.emailLogin(v)
  ctx.body = { token }
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator(ctx).validate()
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

module.exports = router
