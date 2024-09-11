import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, logSeverityLevel } from "../../domain/entities/log.entities";
import { LogRepository } from "../../domain/repository/log.Repository";

export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDataSource
    ){}

    async saveLog(log: logEntity): Promise<void> {
        this.logDatasource.saveLog(log)
    }
    async getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        return this.logDatasource.getLogs(severityLevel)
    }


}