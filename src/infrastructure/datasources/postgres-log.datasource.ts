import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, logSeverityLevel } from "../../domain/entities/log.entities";

const prisma = new PrismaClient()

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIG
}

export class PostgresLogDatasource implements LogDataSource{
    async saveLog(log: logEntity): Promise<void> {
        const level = severityEnum[log.level]
        const newLog = await prisma.logModel.create({
            data:{
                ...log,
                level
            }
        })

        console.log(newLog)
    }
    async getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        const level = severityEnum[severityLevel]
        
        const logs = await prisma.logModel.findMany({
            where: {
                level
            }
        })

        return logs.map((log) => logEntity.fromObject(log))
    }

}