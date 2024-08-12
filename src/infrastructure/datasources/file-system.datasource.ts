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
    async saveLog(newLog: logEntity): Promise<void> {
        // throw new Error("Method not implemented.");
        const logAsJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsPath, logAsJson)

        if(newLog.level === logSeverityLevel.low ) return
        if(newLog.level === logSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        }else{
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }
        
    }
    getLogs(severityLevel: logSeverityLevel): Promise<logEntity[]> {
        throw new Error("Method not implemented.");
    }

}