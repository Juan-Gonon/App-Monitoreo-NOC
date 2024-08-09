import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, logSeverityLevel } from "../../domain/entities/log.entities";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor(){
        this.createLogsFiles()
    }

    
    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        // if( fs.existsSync(this.allLogsPath)) return
        // fs.writeFileSync(this.allLogsPath, '')

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
            
        ].forEach((path) => {
            if(fs.existsSync(path)) return

            fs.writeFileSync(path, '')
        })


    }
    saveLog(log: logEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        throw new Error("Method not implemented.");
    }

}