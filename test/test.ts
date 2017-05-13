import { tap, expect } from 'tapbundle'
import * as smartsystem from '../dist/index'
import * as _moduleExample from './assets/moduleExample'

tap.test('should load a module lazily', async (tools) => {
  let lazyModuleExample = new smartsystem.LazyModule<typeof _moduleExample>('./assets/moduleExample.js', __dirname)

  await lazyModuleExample.load().then(async m => {
    console.log(m.exportedTestBoolean)
  })
})

tap.start()
