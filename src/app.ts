import { envs } from "./config/plugins/envs.plugin"
import { Server } from "./presentation/Server"
import 'dotenv/config'


(
   async () => {

         main()

    }
)()


function main(){

    // Server.start()

    console.log({
        email: process.env.MAILER_EMAIL,
        // port: process.env.PORT
        port: envs.PORT,
        prod: envs.PROD,
        key: envs.SECRET_KEY
    })
}