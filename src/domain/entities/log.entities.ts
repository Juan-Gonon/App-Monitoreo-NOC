export enum logSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: logSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class logEntity {
    public level: logSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions){
        const { message, level, createdAt = new Date(), origin } = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt
        this.origin = origin
    }

    static fromJson = (json: string): logEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json)

        // if(!message) throw new Error('Message is required')

        const log = new logEntity({
            message: message,
            level: level,
            origin: origin
        })

        return log

    } 

    static fromObject = (object: { [ key: string]: any}):logEntity => {
        const { message, level, createdAt, origin } = object

        const log = new logEntity({ message, level, createdAt, origin })

        return log
    }

}