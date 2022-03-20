const Router = require('koa-router')
const {RegisterValidator} = require('../../validator/user')
const UserDao = require('../../dao/user')
const CreateSuccess = require('../../exception/CreateSuccess')

const router = new Router({
    prefix: '/v1/user',
})

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator(ctx).validate()
    const user = await UserDao.createUser(v)
    throw new CreateSuccess(0)
})

module.exports = router