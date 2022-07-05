// import { MongoClient } from 'mongodb'
import { Pool } from 'pg'

// export default class Database {
//     static instance: Database
//     private url: string
//     private client: MongoClient

//     constructor() {
//         this.url = String(process.env.DB_URI)
//         this.client = new MongoClient(this.url)
//     }

//     static init() {
//         if (!this.instance) {
//             this.instance = new Database()
//         }
//         return this.instance
//     }

//     get Client() {
//         return this.client
//     }

//     public async Connect() {
//         return await this.client.connect()
//     }
// }

export default class Database {
    static instance: Database
    private client: Pool

    constructor() {
        this.client = new Pool({
            connectionString: process.env.DB_URI,
        })
    }

    static init() {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance
    }

    get Client() {
        return this.client
    }

    async Connect() {
        return await this.client.connect()
    }

    async Disconnect() {
        return await this.client.end()
    }
}
