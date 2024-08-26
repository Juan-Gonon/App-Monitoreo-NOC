import { logSeverityLevel } from "../domain/entities/log.entities"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"



const logRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    new MongoLogDatasource()
)
const emailService = new EmailService()


export class Server{

    public static async start(){
        
        console.log('Server started...')

        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute([ 'jgonon549@gmail.com', 'juanfegonon27@gmail.com' ])

     
        // emailService.sendEmailWithFileSystemLogs([ 'jgonon549@gmail.com', 'juanfegonon27@gmail.com' ])

        const logs = await logRepository.getLogs(logSeverityLevel.high)
        console.log(logs)
   
        // const job = CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'http://google.com'
                
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )

        // job.start()


    }
}