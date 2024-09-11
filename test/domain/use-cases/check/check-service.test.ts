import { logEntity } from '../../../../src/domain/entities/log.entities'
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service'

describe('check-service UseCase', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn()
    const ErrorCallback = jest.fn()
    
    const checkService = new CheckService(
        mockRepository,
        successCallback,
        ErrorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should call successCallback when fetch returns true', async () => {
        
        
        const wasOk = await checkService.execute('http://google.com')

        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(ErrorCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(logEntity))
    })

    it('should call ErrorCallback when fetch returns false', async () => {
        
        
        const wasOk = await checkService.execute('http://sdfsdfdsf.com')

        expect(wasOk).toBeFalsy
        expect(successCallback).not.toHaveBeenCalled()
        expect(ErrorCallback).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(logEntity))
    })
})