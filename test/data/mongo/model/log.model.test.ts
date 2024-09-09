import mongoose from "mongoose"
import { MongoDatabase } from "../../../../src/data/mongo/init"
import { LogModel } from '../../../../src/data/mongo/models/log.model'

describe('log.model.test.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    it('should return LogModel', async () => {

        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create(logData)
        // console.log(log);
        
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date)
        }))

        await LogModel.findByIdAndDelete(log.id)
        
    })

    it('should return the schema object', () => {

        const schema = LogModel.schema.obj
        // console.log(schema)

        expect(schema).toEqual(  {
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: { type: expect.any(Function), enum: [ 'low', 'medium', 'high' ] },
            createdAt: expect.any(Object)
          })
    })
 })