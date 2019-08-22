import * as plugins from './smartsystem.plugins';

export class Smartsystem {
  public env = new plugins.smartenv.Smartenv()
  public cpus = plugins.os.cpus();
}
