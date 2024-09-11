import { logEntity } from '../../../../src/domain/entities/log.entities'
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple'

describe('Check-service-multiple UseCase', () => {
    const mockRepositoryONE = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepositoryTWO = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn()
    const ErrorCallback = jest.fn()

    const checkServices = new CheckServiceMultiple(
        [mockRepositoryONE, mockRepositoryTWO],
        successCallback,
        ErrorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should call successCallback when fetch returns true', async () => {
    
        const wasOk = await checkServices.execute('http://google.com')
        
        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(ErrorCallback).not.toHaveBeenCalled()
        expect(mockRepositoryONE.saveLog).toHaveBeenCalledWith(expect.any(logEntity))
        expect(mockRepositoryTWO.saveLog).toHaveBeenCalledWith(expect.any(logEntity))

    })

    it('should call ErrorCallback when fetch returns false', async () => {
    
        const wasOk = await checkServices.execute('http://sdfsdfdsf.com')
        
        expect(wasOk).toBeFalsy
        expect(successCallback).not.toHaveBeenCalled()
        expect(ErrorCallback).toHaveBeenCalled()
        expect(mockRepositoryONE.saveLog).toHaveBeenCalledWith(expect.any(logEntity))
        expect(mockRepositoryTWO.saveLog).toHaveBeenCalledWith(expect.any(logEntity))

        

    })

})