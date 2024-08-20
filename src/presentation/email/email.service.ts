import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

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



            return true
            
        } catch (error) {
            
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