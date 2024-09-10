import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource'

describe('file-system.datasource.ts', () => {
    // console.log(__dirname)
    const logPath = path.join(__dirname, '../../../logs')

    beforeAll(() => {
        fs.rmSync(logPath, { recursive: true, force: true })

    })

    it('should create log files if they do not exists', () => {
        new FileSystemDataSource()

        const files = fs.readdirSync(logPath)

        // console.log(files)
        expect(files.length).toBe(3)
        expect(files).toEqual([ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ])

    })
})