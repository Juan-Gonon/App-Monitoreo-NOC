import { LogModel } from "../../data";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, logSeverityLevel } from "../../domain/entities/log.entities";

export class MongoLogDatasource implements LogDataSource{
    async saveLog(log: logEntity): Promise<void> {
        const newLog = await LogModel.create(log)
        console.log('Mongo Log created', newLog.id)
        // await newLog.save()
    }
    async getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })

        // return logs
        return logs.map((mongoLog) => logEntity.fromObject(mongoLog))
    }

}