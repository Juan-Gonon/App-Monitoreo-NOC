import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, logSeverityLevel } from "../../domain/entities/log.entities";

const prisma = new PrismaClient()

export class PostgresLogDatasource implements LogDataSource{
    async saveLog(log: logEntity): Promise<void> {
        const { origin, createdAt, level, message } = log
        const newLevel = level.toUpperCase() as SeverityLevel
        const newLog = await prisma.logModel.create({
            data:{
                message,
                origin,
                level: newLevel,
                createdAt
            }
        })

        console.log(newLog)
    }
    async getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        const newSeverityLevel = String(severityLevel) as SeverityLevel
        
        const logs = await prisma.logModel.findMany({
            where: {
                level: newSeverityLevel
            }
        })

        return logs.map((log) => logEntity.fromObject(log))
    }

}