import { Router } from 'express';

export interface GroupOpts {
  prefix?: string;
  namespace?: string;
  middleware?: string[] | CallableFunction[];
}

export interface RouterOpts {
  router: Router;
  currentDir: string;
  controllerPath?: string;
  middlewarePath?: string;
}

export interface MethodOpts {
  path: string;
  action: Action;
  middleware?: Middleware;
}

export type Middleware = (string | CallableFunction)[];

export type Action = string | CallableFunction;
