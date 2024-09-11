import { logEntity, logSeverityLevel } from '../../../../src/domain/entities/log.entities'

describe('LogEntity', () => {
    const dataObj = {
        message: 'Hola Mundo',
        level: logSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    it('should create a LogEntity instance', () => {


        const log = new logEntity(dataObj)

        expect(log).toBeInstanceOf(logEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)

    })

    it('should create a LogEntity instance from fromJson', () => {
        const json = `{"message":"Service de pruebas funcionando","level":"low","createdAt":"2024-08-20T01:07:35.423Z","origin":"check-service.ts"}`

        const log = logEntity.fromJson(json)

        expect(log).toBeInstanceOf(logEntity)
        expect(log.message).toBe("Service de pruebas funcionando")
        expect(log.level).toBe(logSeverityLevel.low)
        expect(log.origin).toBe("check-service.ts")
        expect(log.createdAt).toBeInstanceOf(Date)



    })

    it('should create a LogEntity instance from object', () => {


        const log = logEntity.fromObject(dataObj)

        expect(log).toBeInstanceOf(logEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)

    })

})