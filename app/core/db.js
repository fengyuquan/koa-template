const _ = require('lodash')
const { Sequelize, Model } = require('sequelize')
const { dbName, host, password, port, username } =
  require('../config/config').database
// const {logger} = require('../middleware/logger')

const sequelize = new Sequelize(dbName, username, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  logging: console.log,
  // logging: logger.info.bind(logger),
  define: {
    paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时)
    underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式
    freezeTableName: true, // 让Sequelize将推断表名称等于模型名称
    scopes: {
      bh: {
        // 过滤不必要的字段
        attributes: {
          exclude: ['updatedAt', 'deletedAt', 'createdAt']
        }
      }
    }
  }
})

// 模型同步，开发时调试用
sequelize.sync({
  // force: true, // 自动删除原来表，重新创建新的表
})

Model.prototype.toJSON = function () {
  let data = _.clone(this.dataValues)

  _.unset(data, 'updatedAt')
  _.unset(data, 'createdAt')
  _.unset(data, 'deletedAt')

  return data
}

module.exports = sequelize
