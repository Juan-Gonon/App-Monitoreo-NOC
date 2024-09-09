import mongoose from 'mongoose'
import { MongoDatabase } from '../../../src/data/mongo/init'
describe('init MongoDv', () => {

    beforeEach(() => {
        mongoose.connection.close()
    })

    it('should connect to MongoDB ', async () => {

        // console.log(process.env.MONGO_DB_NAME)

        const res = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(res).toBeTruthy()
    })

    it('should throw an error', async () => {

        try {
            const res = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: ''
            })

            expect(true).toBe(false)
            
        } catch (error) {
            expect(error).toBeTruthy()
        }

    })
})