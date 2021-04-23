import { app } from 'electron';
import { Logger } from '../logger';
import { initialize } from '../services';

import dialog from './dialog';
import main from './main';

export default (): void => {
  dialog();
  main();

  //initialize service
  const logger = new Logger();
  logger.initialize(app.getPath('userData'));
  initialize(logger);
};
