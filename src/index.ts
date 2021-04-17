import { LRouter } from './lrouter';
import { RouterOpts } from './types';

const lrouter = (opts: RouterOpts) => {
  return new LRouter(
    opts.router,
    opts.currentDir,
    opts.controllerPath,
    opts.middlewarePath,
  );
};

export { lrouter, LRouter };
