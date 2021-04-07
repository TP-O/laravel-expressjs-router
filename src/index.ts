import { Router } from 'express';
import { LRouter } from './lrouter';

const lrouter = (
  expressRouter: Router,
  dir: string,
  controllerPath?: string,
  middlewarePath?: string,
) => {
  return new LRouter(expressRouter, dir, controllerPath, middlewarePath);
};

export { lrouter, LRouter };
