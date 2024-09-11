import { logSeverityLevel } from "../domain/entities/log.entities"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"



const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)

const mongoLogRepository = new LogRepositoryImpl(
       new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
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

        // const logs = await logRepository.getLogs(logSeverityLevel.low)
        // console.log(logs)
   
        const job = CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'http://google.com'
                
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)
            }
        )

        job.start()


    }
}