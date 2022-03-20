const {Op} = require('sequelize')
const bcrypt = require('bcryptjs')
const UserModel = require('../model/user')
const RepeatException = require('../exception/http/RepeatException')
const sequelize = require('../core/db')
const UnAuthenticatedException = require('../exception/http/UnAuthenticatedException')
const {generateToken} = require('../util/token')

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

    static async emailLogin(v) {
        const user = await UserDao._verifyEmailPassword(v)
        return generateToken(user.id)
    }

    static async _verifyEmailPassword(v) {
        const user = await UserModel.findOne({
            where: {
                email: v.get('body.email')
            }
        })
        if (!user) {
            throw new UnAuthenticatedException(20002)
        }
        const correct = bcrypt.compareSync(v.get('body.password'), user.password)
        if (!correct) {
            throw new UnAuthenticatedException(20003)
        }
        return user
    }

}

module.exports = UserDao