import { EmailService } from "../../../presentation/email/email.service"
import { logEntity, logSeverityLevel } from "../../entities/log.entities"
import { LogRepository } from "../../repository/log.Repository"

interface SendLogsEmailUseCase{
    
    execute: (to: string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendLogsEmailUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]){
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
            if(!sent) throw new Error('Email log not sent')

            const log = new logEntity({
                message: `Log email sent`,
                level: logSeverityLevel.low,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)
            

         

            return true
            
        } catch (error) {
            const log = new logEntity({
                message: `${error}`,
                level: logSeverityLevel.high,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)
            
            return false
        }

    }
    
}