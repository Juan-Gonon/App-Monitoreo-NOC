import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server{

    public static start(){
        
        console.log('Server started...')

        const emailService = new EmailService()
        emailService.sendEmail({
            to: 'jgonon549@gmail.com',
            subject: 'Logs de sistema',
            htmlBody: `
            <h3> Logs de sistema</h3>
            <p> Ve logs adjuntos </p>
            `
        })
   
        // const job = CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'http://google.com'
                
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )

        // job.start()


    }
}