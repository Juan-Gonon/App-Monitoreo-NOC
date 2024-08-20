import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.Repository'
import { logEntity, logSeverityLevel } from '../../domain/entities/log.entities';

interface sendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

// todo: attachments

interface Attachment{
    filename: string;
    path: string;
}

export class EmailService{

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.SECRET_KEY,
        }
    })

    constructor(
        private readonly logRepository: LogRepository
    ){

    }

    async sendEmail(options: sendMailOptions):Promise<boolean>{
        const { to, subject, htmlBody, attachments=[] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })

            // console.log(sentInformation)
            const log = new logEntity({
                level: logSeverityLevel.low,
                message: 'email sent',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log)

            return true
            
        } catch (error) {
            const log = new logEntity({
                level: logSeverityLevel.high,
                message: 'email not sent',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log)
            
        return false  
        }
    }

    async sendEmailWithFileSystemLogs ( to: string | string[]){
        const subject = 'Logs de el servidor'
        const htmlBody = `
            <h3> Logs de Sistema - NOC </h3>
            <P> Bienvenido a nuestro sistema de Logs automático </P>
            <p>Haga click para ver los logs adjuntos </p>
        `
        const attachments:Attachment[] = [
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-low.log',
                path: './logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            }
        ]

        return await this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }

}