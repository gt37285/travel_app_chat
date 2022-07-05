import Database from '@database/index'
import Server from '@server/server'
;(() => {
    const database = Database.init()

    database.Connect().then(() => {
        console.log('database connected successfully')
        const socket = Server.init()
        socket.listen()
    })
})()
