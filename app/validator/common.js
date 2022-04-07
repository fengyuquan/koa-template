const { BaseValidator, Rule } = require('../util/BaseValidator')

class PositiveIntegerValidator extends BaseValidator {
  id

  constructor(ctx) {
    super(ctx)
    this.id = [new Rule('isInt', '需要传入正整数', { min: 1 })]
  }
}

module.exports = {
  PositiveIntegerValidator
}
