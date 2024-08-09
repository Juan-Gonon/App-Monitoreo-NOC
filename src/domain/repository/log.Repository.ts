import { logEntity, logSeverityLevel } from "../entities/log.entities";

export abstract class LogRepository{

    abstract saveLog(log: logEntity): Promise<void>
    abstract getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]>
}