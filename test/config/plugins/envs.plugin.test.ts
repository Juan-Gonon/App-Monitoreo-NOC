import { envs } from '../../../src/config/plugins/envs.plugin'
describe('envs.plugin.ts', () => {


    it('should return env option', () => {
        // console.log(envs)
        
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'jgonon11@gmail.com',
            SECRET_KEY: 'pijhvwtwbpmzzenu',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://gonons:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'gonons',
            MONGO_PASS: '123456789'
          })
    })

    it('should return error if not found env', async () => {
        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('../../../src/config/plugins/envs.plugin')

            expect(true).toBe(false)
        } catch (error) {
            // console.log(error)
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})