import { LogDataSource } from '../../../src/domain/datasources/log.datasource'
import { logEntity, logSeverityLevel } from '../../../src/domain/entities/log.entities'

describe('Log.datasource.ts', () => {
    const newLog = new logEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: logSeverityLevel.low
    })

    class MockLogDatasource implements LogDataSource {
     
        async saveLog(log: logEntity): Promise<void> {
            // throw new Error('Method not implemented.')
            return
        }
        async getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
            return [ newLog ]
        }

    }

    it('should test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect( typeof mockLogDatasource.saveLog).toBe('function')
        expect( typeof mockLogDatasource.getLogs).toBe('function')

        await mockLogDatasource.saveLog( newLog )
        
        const logs = await mockLogDatasource.getLogs(logSeverityLevel.high)

        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(logEntity)

    })
})