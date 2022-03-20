const bcrypt = require('bcryptjs')
const {DataTypes, Model} = require('sequelize')
const sequelize = require('../core/db')

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true, // 自动增长
    },
    nickname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING(128),
        unique: true, // 唯一性
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd)
        },
        allowNull: false,
    },
}, {
    sequelize, // 需要传递连接实例
    tableName: 'user', // 需要选择模型名称
})

module.exports = User