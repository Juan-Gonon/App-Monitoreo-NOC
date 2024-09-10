import mongoose from 'mongoose'
import { MongoDatabase } from '../../../src/data/mongo/init'
import { logEntity, logSeverityLevel } from '../../../src/domain/entities/log.entities'
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource'
import { LogModel } from '../../../src/data'

describe('Pruebas en MongoLogDatasource', () => {
    const logDataSource = new MongoLogDatasource()

    const log = new logEntity({
        level: logSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll( async () => {
        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })
    })

    afterEach( async() => {
        await LogModel.deleteMany()
    })

    afterAll( async () => {
        // await  LogModel.deleteMany()
        mongoose.connection.close()
    })

    it('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')

        await logDataSource.saveLog(log)

        expect( logSpy ).toHaveBeenCalled()
        // expect( logSpy ).toHaveBeenCalledWith("Mongo Log created:", expect.any(String))

    })

    it('should get logs', async () => {

        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs( logSeverityLevel.medium )

        expect(logs.length).toBe(2)
        expect(logs[0].level).toBe(logSeverityLevel.medium)
        
        
    })
})