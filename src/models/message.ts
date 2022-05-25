import { Message } from '@interfaces/chat'
import { Schema, model } from 'mongoose'

const messageSchema = new Schema<Message>(
    {
        message: {
            type: String,
            ref: 'User',
            required: true,
        },
        from: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: 'message',
        toJSON: {
            transform: function (message, ret) {
                delete ret.__v
            },
        },
    }
)

export default model<Message>('Message', messageSchema)
