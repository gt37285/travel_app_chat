import { handleErrorCatch } from '@helpers/handleError'
import UserModel from '@models/user'
import MessageModel from '@models/message'
import { Message } from '@interfaces/chat'
import Database from '@database/index'
import { ObjectId } from 'mongodb'

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
            const db = this.db.Client.db('myFirstDatabase')
            const collection = db.collection('account')
            await collection.updateOne(
                { _id: new ObjectId(uid) },
                {
                    $set: {
                        online: connected,
                    },
                }
            )
        } catch (error: any) {
            console.error(error)
        }
    }

    public async getUsersTeamChat() {
        try {
            // const users = await UserModel.find({})
            //     .sort('-online')
            //     .catch((err) => handleErrorCatch(err))

            const db = this.db.Client.db('myFirstDatabase')
            const account = db.collection('Account')

            const pipeline = [
                {
                    $lookup: {
                        from: 'Person',
                        localField: '_id',
                        foreignField: 'accountId',
                        as: 'person',
                    },
                },
                {
                    $lookup: {
                        from: 'Role',
                        localField: 'roleId',
                        foreignField: '_id',
                        as: 'rol',
                    },
                },
            ]

            const users = await account.aggregate(pipeline).toArray()

            return users
        } catch (error: any) {
            console.error(error)
        }
    }

    public async saveMessage(message: Message) {
        try {
            const newMessage = new MessageModel(message)
            return await newMessage.save()
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
