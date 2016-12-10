import 'typings-test'
import * as should from 'should'
import * as smartsystem from '../dist/index'

import * as _moduleExample from './moduleExample'

describe('smartsystem', function () {
    it('should load a module lazily', function (done) {
        let lazyModuleExample = new smartsystem.LazyModule<typeof _moduleExample>('../test/moduleExample.js',__dirname)

        lazyModuleExample.load().then(m => {
            console.log(m.exportedTestBoolean)
            done()
        })
    })
})
