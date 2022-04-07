const { BaseValidator, Rule } = require('../util/BaseValidator')

class TokenValidator extends BaseValidator {
  email
  password

  constructor(ctx) {
    super(ctx)
    this.email = [new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')]
    this.password = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码应包含数字和字母',
        "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,.#%'+*-:;^_`]+$)[,.#%'+*-:;^_`0-9A-Za-z]{6,20}$"
      )
    ]
  }
}

class NotEmptyValidator extends BaseValidator {
  token

  constructor(ctx) {
    super(ctx)
    this.token = [
      new Rule('isLength', 'token不允许为空', {
        min: 1
      })
    ]
  }
}

module.exports = {
  TokenValidator,
  NotEmptyValidator
}
