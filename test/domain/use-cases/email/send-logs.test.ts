import { logEntity } from '../../../../src/domain/entities/log.entities'
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-logs'
import { EmailService } from '../../../../src/presentation/email/email.service'

describe('send-logs use-cases', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmail = new SendEmailLogs(mockEmailService as any, mockLogRepository)

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should call sendEmail and saveLog', async () => {

        const result = await sendEmail.execute('jgonon549@gamil.com')

        expect(result).toBeTruthy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
        expect(mockLogRepository.saveLog).toHaveBeenCalled()
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(logEntity))


   })
   it('should log en case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)

    const result = await sendEmail.execute('jgonon549@gamil.com')

    expect(result).toBeFalsy()
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
    expect(mockLogRepository.saveLog).toHaveBeenCalled()
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(logEntity))

})

})