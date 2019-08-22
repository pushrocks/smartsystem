import { tap, expect } from '@pushrocks/tapbundle';
import * as smartsystem from '../ts/index';

let smartsystemInstance: smartsystem.Smartsystem;

tap.test('should create a smartsystem instance', async tools => {
  smartsystemInstance = new smartsystem.Smartsystem();
  expect(smartsystemInstance).to.be.instanceOf(smartsystem.Smartsystem);
});

tap.test('should state the operating system', async () => {
  expect(smartsystemInstance.cpus.length).to.be.greaterThan(0);
});

tap.start();
