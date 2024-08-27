import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "./data"
import { Server } from "./presentation/Server"
import 'dotenv/config'


(
   async () => {

         main()

    }
)()


async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const prisma = new PrismaClient()

    const newLog = await prisma.logModel.create({
        data: {
            level: 'HIG',
            message: 'Test message',
            origin: 'App.ts'
        }
    })

    console.log(newLog)

    Server.start()
}