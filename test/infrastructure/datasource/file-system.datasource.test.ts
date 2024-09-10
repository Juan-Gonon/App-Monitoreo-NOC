import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource'
import { logEntity, logSeverityLevel } from '../../../src/domain/entities/log.entities'

describe('file-system.datasource.ts', () => {
    // console.log(__dirname)
    const logPath = path.join(__dirname, '../../../logs')

    beforeAll(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    it('should create log files if they do not exists', () => {
        new FileSystemDataSource()

        const files = fs.readdirSync(logPath)

        // console.log(files)
        expect(files.length).toBe(3)
        expect(files).toEqual([ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ])

    })

    it('should save a log in logs-low.log', () => {
        const logDatasource = new FileSystemDataSource()

        const log = new logEntity({
            message: 'test',
            level: logSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        logDatasource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')

        // console.log(allLogs)
        expect(allLogs).toContain(JSON.stringify(log))
        
    })

    it('should save a log in logs-medium.log', () => {
        const logDatasource = new FileSystemDataSource()

        const log = new logEntity({
            message: 'test',
            level: logSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        logDatasource.saveLog(log)

        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

        // console.log(allLogs)
        expect(mediumLogs).toContain(JSON.stringify(log))
        
    })

    
    it('should save a log in logs-high.log', () => {
        const logDatasource = new FileSystemDataSource()

        const log = new logEntity({
            message: 'test',
            level: logSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        logDatasource.saveLog(log)

        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')

        // console.log(allLogs)
        expect(highLogs).toContain(JSON.stringify(log))
        
    })

    it('should return all logs', async () => {
        const logDatasource = new FileSystemDataSource()
        const logLow = new logEntity({
            message: 'test-low',
            level: logSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        })
        const logMedium = new logEntity({
            message: 'test-medium',
            level: logSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })
        const logHigh = new logEntity({
            message: 'test-high',
            level: logSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        await logDatasource.saveLog(logLow)
        await logDatasource.saveLog(logMedium)
        await logDatasource.saveLog(logHigh)

        // const logsLow = await logDatasource.getLogs(logSeverityLevel.low)
        // const logsMedium = await logDatasource.getLogs(logSeverityLevel.medium)
        // const logsHigh = await logDatasource.getLogs(logSeverityLevel.high)

        // console.log({
        //     logsLow,
        //     // logsMedium,
        //     // logsHigh
        // })


        // expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logsMedium, logsHigh ]))
        // expect( logsMedium ).toEqual( expect.arrayContaining([ logsMedium] ))
        // expect( logsHigh ).toEqual( expect.arrayContaining([ logsHigh ]))
    })
})