import { tap, expect } from 'tapbundle'
import * as smartsystem from '../ts/index'
import * as _moduleExample from './assets/moduleExample'

let lazyModuleExample: smartsystem.LazyModule<typeof _moduleExample>

tap.test('should create a lazy module instance', async (tools) => {
  lazyModuleExample = new smartsystem.LazyModule<typeof _moduleExample>('./assets/moduleExample.js', __dirname)
  expect(lazyModuleExample).to.be.instanceof(smartsystem.LazyModule)
})

tap.test('should load the module', async () => {
  await lazyModuleExample.load().then(async m => {
    console.log(m.exportedTestBoolean)
  })
})

tap.start()
