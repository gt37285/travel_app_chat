import { User } from '@interfaces/user'
import { Request, Response } from 'express'
import UserModel from '@models/user'
import { handleError, handleErrorCatch } from '@helpers/handleError'
import { generateJWT } from '@helpers/jwt'

export default class AuthServices {
    static init() {
        return new AuthServices()
    }

    public async addNewUser(req: Request, res: Response) {
        try {
            const { email, lastName, name, password, phone } = req.body as User
            const user = await UserModel.findOne({ email })

            if (user)
                return handleErrorCatch({
                    status: 400,
                    msg: 'User already exists',
                })

            const newUser = new UserModel({
                email,
                name,
                lastName,
                password,
                phone,
            })

            await newUser.save().catch((err) => handleErrorCatch(err))

            const token = await generateJWT({
                uid: newUser.uid,
                rol: newUser.rol,
            }).catch((err) => handleErrorCatch(err))

            return res.json({
                ok: true,
                token,
            })
        } catch (error: any) {
            return handleError(error, res)
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body as User

            const user = await UserModel.findOne({ email })

            if (!user)
                return handleErrorCatch({
                    status: 404,
                    msg: 'user or password wrong',
                })

            const isMatch = await user.comparePassword(password)

            if (!isMatch)
                return handleErrorCatch({
                    msg: 'user or password wrong',
                })

            const token = await generateJWT({
                uid: user._id,
                rol: user.rol,
            }).catch((err) => handleErrorCatch(err))

            return res.json({
                ok: true,
                token,
                user,
            })
        } catch (error: any) {
            return handleError(error, res)
        }
    }

    public async refresh(req: Request, res: Response) {
        try {
            const { uid, rol } = res.locals
            const user = await UserModel.findById(uid).catch((err) =>
                handleErrorCatch(err)
            )

            if (!user) handleErrorCatch({ status: 404, msg: 'invalid login' })

            const token = await generateJWT({ uid, rol }).catch((err) =>
                handleErrorCatch(err)
            )

            return res.json({
                ok: true,
                token,
                user,
            })
        } catch (error: any) {
            return handleError(error, res)
        }
    }
}
