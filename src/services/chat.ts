import { handleError } from '@helpers/handleError'
import { Request, Response } from 'express'
import MessageModel from '@models/message'

export default class ChatServices {
    static init() {
        return new ChatServices()
    }

    public async getMessages(req: Request, res: Response) {
        try {
            const { uid } = res.locals
            const { from } = req.params

            const messages = await MessageModel.find({
                $or: [
                    {
                        to: uid,
                        from,
                    },
                    {
                        to: from,
                        from: uid,
                    },
                ],
            })
                .sort({ createAt: 'asc' })
                .limit(30)

            return res.json({
                ok: true,
                messages,
            })
        } catch (error: any) {
            return handleError(error, res)
        }
    }
}
