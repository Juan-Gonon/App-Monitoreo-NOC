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

}