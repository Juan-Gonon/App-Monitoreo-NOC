import { CronService } from '../../../src/presentation/cron/cron-service'

describe('CronService', () => {

    const mockTick = jest.fn()

    it('should create a job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick )
        job.start()

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2)
            job.stop()

            done()
        }, 2000)
    })

})