import { logEntity, logSeverityLevel } from '../../../src/domain/entities/log.entities'
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log-impl.repository'

describe('LogRepositoryImp', () => {
    const entity = new logEntity({
        level: logSeverityLevel.high,
        message: 'test en repository',
        origin: 'log-repository.test.ts'
    })
    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const repository = new LogRepositoryImpl(mockLogDatasource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('saveLog should call the datasource with arguments', async () => {
        
        await repository.saveLog(entity)

        expect(mockLogDatasource.saveLog).toHaveBeenCalled()
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(expect.any(logEntity))
    })

    it('getLogs should call teh datasource with arguments', async () => {
        await repository.getLogs(logSeverityLevel.low)
        
        expect(mockLogDatasource.getLogs).toHaveBeenCalled()
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logSeverityLevel.low)

    })
})
