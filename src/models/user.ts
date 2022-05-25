import { User, UserDoc } from '@interfaces/user'
import { Schema, model } from 'mongoose'
import { compareSync, hashSync, genSaltSync } from 'bcryptjs'

const userSchema = new Schema<UserDoc>(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: false,
            default: '',
        },
        rol: {
            type: String,
            enum: ['client', 'admin', 'seller'],
            default: 'client',
        } as any,
        password: {
            type: String,
            required: true,
        },
        online: {
            type: Boolean,
            default: false,
        },
        img: {
            type: String,
            default: '',
        },
    },
    {
        collection: 'users',
        toJSON: {
            transform: function (user, ret) {
                ret.uid = user._id
                delete ret.password
                delete ret._id
                delete ret.__v
            },
        },
        toObject: {
            transform: function (user, ret) {
                ret.uid = user._id
                delete ret.password
                delete ret._id
                delete ret.__v
            },
        },
    }
)

userSchema.pre('save', function (next) {
    let { password } = this
    const salt = genSaltSync(10)
    this.password = hashSync(password, salt)
    next()
})

userSchema.methods.comparePassword = function (password: string): Promise<any> {
    return new Promise((resolve) => {
        const isMatch = compareSync(password, this.password)

        resolve(isMatch)
    })
}

export default model<UserDoc>('User', userSchema)
