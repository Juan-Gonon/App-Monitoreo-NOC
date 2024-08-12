import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server{

    public static start(){
        
        console.log('Server started...')

   
        const job = CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'http://google.com'
                
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)
            }
        )

        job.start()


    }
}