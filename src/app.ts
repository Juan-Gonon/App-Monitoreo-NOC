import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data"
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

    // Server.start()

    // console.log({
    //     email: process.env.MAILER_EMAIL,
    //     // port: process.env.PORT
    //     port: envs.PORT,
    //     prod: envs.PROD,
    //     key: envs.SECRET_KEY
    // })
}