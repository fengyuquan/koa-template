const UserModel = require('../model/user')
const RepeatException = require('../exception/http/RepeatException')
const sequelize = require('../core/db')
const {Op} = require('sequelize')

class UserDao {
    static async createUser(v) {
        let user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    {
                        nickname: v.get('body.nickname'),
                    },
                    {
                        email: v.get('body.email'),
                    }
                ]
            },
        })
        if (user) {
            throw new RepeatException(20001)
        }

        let transaction
        try {
            transaction = await sequelize.transaction()
            user = await UserModel.create({
                nickname: v.get('body.nickname'),
                email: v.get('body.email'),
                password: v.get('body.password1'),
            }, {
                transaction,
            })
            await transaction.commit()
        } catch (error) {
            if (transaction) {
                await transaction.rollback()
            }
            throw error
        }

        return user
    }
}

module.exports = UserDao