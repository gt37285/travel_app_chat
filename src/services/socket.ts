import { handleErrorCatch } from '@helpers/handleError'
import UserModel from '@models/user'
import { Message } from '@interfaces/chat'
import Database from '@database/index'

export default class SocketController {
    private db: Database

    constructor() {
        this.db = Database.init()
    }

    static init() {
        return new SocketController()
    }

    public async connectDisconnectUser(connected: boolean, uid: string) {
        try {
            const { rows } = await this.db.Client.query(
                `update account set online = $1 where id = $2 RETURNING *`,
                [connected, uid]
            )

            // const db = this.db.Client.db('myFirstDatabase')
            // const collection = db.collection('account')
            // await collection.updateOne(dd
            //     { _id: new ObjectId(uid) },
            //     {
            //         $set: {
            //             online: connected,
            //         },
            //     }
            // )

            return rows[0]
        } catch (error: any) {
            console.error(error)
        }
    }

    public async getUsersTeamChat() {
        try {
            // const users = await UserModel.find({})
            //     .sort('-online')
            //     .catch((err) => handleErrorCatch(err))

            // const db = this.db.Client.db('myFirstDatabase')
            // const account = db.collection('Account')

            // const pipeline = [
            //     {
            //         $lookup: {
            //             from: 'Person',
            //             localField: '_id',
            //             foreignField: 'accountId',
            //             as: 'person',
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: 'Role',
            //             localField: 'roleId',
            //             foreignField: '_id',
            //             as: 'rol',
            //         },
            //     },
            // ]

            // const users = await account.aggregate(pipeline).toArray()

            const { rows } = await this.db.Client.query(`
                select 
                    row_to_json(a) as account, 
                    row_to_json(p) as person,
                    row_to_json(r) as rol
                from account a
                inner join person p
                on a.id = p."accountId"
                inner join role r 
                on r.id = a."roleId"
            `)

            console.log(rows)

            return rows
        } catch (error: any) {
            console.error(error)
        }
    }

    public async saveMessage(message: Message) {
        try {
            const { rows } = await this.db.Client.query(
                `
                insert into message ("fromId", "toId", message, "updatedAt", "createdAt")
                values ($1,$2,$3, $4, $5) RETURNING *
            `,
                [
                    message.from,
                    message.to,
                    message.message,
                    new Date(),
                    new Date(),
                ]
            )

            return await rows[0]
        } catch (error) {
            console.error(error)
        }
    }

    public async searchUser(search: string) {
        try {
            const regexp = new RegExp(search, 'ig')

            const users = await UserModel.find({ name: regexp })
                .sort('-online')
                .catch((err) => handleErrorCatch(err))

            return users
        } catch (error) {
            console.error(error)
        }
    }
}
