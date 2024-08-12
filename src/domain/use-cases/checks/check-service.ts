import { logEntity, logSeverityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.Repository";
interface CheckServiceUseCase{
    execute(url: string) : Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly LogRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly erroCallback: ErrorCallback
    ){

    }

    async execute ( url: string):Promise<boolean>{
        try {
            const req = await fetch(url)

            if(!req.ok) throw new Error(` Error on check service ${url} `)

            const log = new logEntity(`Service ${url} working`, logSeverityLevel.low)
            this.LogRepository.saveLog(log)
            this.successCallback();
             return true
            
        } catch (error) {
            const errorMessage = `${error}`
            const log = new logEntity(errorMessage, logSeverityLevel.low)
            this.LogRepository.saveLog(log)
            this.erroCallback(`${errorMessage}`)
            
            return false
        }


        
    }
}