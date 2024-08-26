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

    // Crear una collection
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // })

    // await newLog.save()

    // console.log(newLog)

    const logs = await LogModel.find()

    console.log(logs)

    // Server.start()

    // console.log({
    //     email: process.env.MAILER_EMAIL,
    //     // port: process.env.PORT
    //     port: envs.PORT,
    //     prod: envs.PROD,
    //     key: envs.SECRET_KEY
    // })
}