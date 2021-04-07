import { Router } from 'express';
import { Request } from './request';
import { Option } from './option';
import { methods as supportedMethods } from './methods';

export class LRouter extends Request {
  /**
   * Current method
   */
  private _method = '';

  /**
   * Prefix of routes
   */
  private _prefix: string[] = [];

  /**
   * Namespace of controllers
   */
  private _namespace: string[] = [];

  /**
   * Registered middleware
   */
  private _middleware: string[] = [];

  /**
   *
   * @param _router Express router.
   * @param _dir current directory.
   * @param _constrollerPath Path to controller directory.
   * @param _middlewarePath Path to controller directory.
   */
  constructor(
    private _router: Router,
    private _dir: string,
    private _constrollerPath = '/',
    private _middlewarePath = '/',
  ) {
    super();
    return new Proxy(this, {
      get(target, prop) {
        if (typeof prop === 'string' && supportedMethods.includes(prop)) {
          target._method = prop;
          return target.registerRoute;
        }
        return target[prop];
      },
    });
  }

  init(): Router {
    return this._router;
  }

  /**
   * Register Express route
   *
   * @param path URI
   * @param action called when route is accessed
   */
  private registerRoute(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ): void {
    this._router[this._method].apply(this._router, [
      this._prefix.join('') + path,
      ...this._middleware.map((m) => this.importMiddleware(m)),
      ...middleware.map((m) => this.importMiddleware(m)),
      typeof action === 'string' ? this.importAction(action) : action,
    ]);
  }

  /**
   * Get method from controller
   *
   * @param action controller and its method
   */
  private importAction(action: string): CallableFunction {
    const [file, method] = action.split('@');

    /* eslint-disable-next-line */
    const controller = require(`${this._dir}${
      this._constrollerPath
    }/${this._namespace.join('')}/${file}`).default;

    return controller[method];
  }

  private importMiddleware(middlewareName: string): CallableFunction {
    /* eslint-disable-next-line */
    const middleware = require(`${this._dir}${this._middlewarePath}/${middlewareName}`)
      .default;

    return middleware.handle;
  }

  /**
   * Add options of the group
   *
   * @param opt group options
   */
  private addOption(opt: Option): void {
    if (opt.prefix) {
      this._prefix.push(opt.prefix);
    }
    if (opt.namespace) {
      this._namespace.push(
        opt.namespace[0] === '/' ? opt.namespace : `/${opt.namespace}`,
      );
    }
    if (opt.middleware) {
      this._middleware.push(...opt.middleware);
    }
  }

  /**
   * Remove options of the group
   *
   * @param opt group options
   */
  private removeOption(opt: Option): void {
    if (opt.prefix) {
      this._prefix.pop();
    }
    if (opt.namespace) {
      this._namespace.pop();
    }
    if (opt.middleware) {
      this._middleware = this._middleware.slice(
        0,
        this._middleware.length - opt.middleware.length,
      );
    }
  }

  /**
   * Group routes
   *
   * @param opt group options
   * @param callback routes defined in callback will be in the same group
   */
  group(opt: Option, callback: CallableFunction): void {
    this.addOption(opt);
    callback();
    this.removeOption(opt);
  }
}