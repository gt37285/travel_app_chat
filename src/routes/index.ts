import Auth from './auth'
import ChatRoutes from './chat'

export default [Auth.init().Routes, ChatRoutes.init().Routes]
