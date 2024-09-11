import nodemailer from 'nodemailer'
import { EmailService, sendMailOptions } from '../../../src/presentation/email/email.service'

describe('email.service.test.ts', () => {

    const emailService = new EmailService()
    const mockSendMail = jest.fn()

    // mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    it('should send email', async () => {
        const options: sendMailOptions = {
            to: 'jgonon549@gmail.com',
            subject: 'Test',
            htmlBody: '<h1> Test </h1>'
        }

        await emailService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array), 
            html: '<h1> Test </h1>', 
            subject: 'Test', 
            to: "jgonon549@gmail.com"
        })

    })

    it('should sen email with attachments', async () => {
        await emailService.sendEmailWithFileSystemLogs('jgonon549@gmail.com')

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.arrayContaining([
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
            ]), 
            html: '<h1> Test </h1>', 
            subject: 'Test', 
            to: "jgonon549@gmail.com"
        })

        
    })

})