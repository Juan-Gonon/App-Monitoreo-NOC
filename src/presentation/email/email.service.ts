import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface sendMailOptions{
    to: string;
    subject: string;
    htmlBody: string;
    // todo: attachments
}

// todo: attachments

export class EmailService{

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.SECRET_KEY,
        }
    })

    async sendEmail(options: sendMailOptions):Promise<boolean>{
        const { to, subject, htmlBody } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            })

            console.log(sentInformation)

            return true
            
        } catch (error) {
        return false  
        }
    }

}