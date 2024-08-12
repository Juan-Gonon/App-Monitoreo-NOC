export enum logSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class logEntity {
    public level: logSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;

    constructor(message:string, level:logSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
    }

    static fromJson = (json: string): logEntity => {
        const {message, level, createdAt} = JSON.parse(json)

        // if(!message) throw new Error('Message is required')

        const log = new logEntity(message, level)
        log.createdAt = new Date(createdAt)

        return log

    } 

}