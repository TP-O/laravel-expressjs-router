import { Router } from 'express';
import { Importer } from './importer';
import { Action, GroupOpts, Middleware } from './types';

export class LRouter {
  /**
   * Function importer.
   */
  private _importer: Importer;

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
  private _middleware: any[] = [];

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
    private _constrollerPath = '/controllers',
    private _middlewarePath = '/middleware',
  ) {
    this._importer = new Importer();
  }

  /**
   * Return the router,
   */
  public init() {
    return this._router;
  }

  /**
   * Group routes
   *
   * @param opts group options
   * @param callback routes defined in callback will be in the same group
   */
  public group(opts: GroupOpts, callback: CallableFunction) {
    this.addOption(opts);
    callback();
    this.removeOption(opts);
  }

  /**
   * Add options of the group
   *
   * @param opts group options
   */
  private addOption(opts: GroupOpts): void {
    if (opts.prefix) {
      this._prefix.push(opts.prefix);
    }
    if (opts.namespace) {
      this._namespace.push(
        opts.namespace[0] === '/' ? opts.namespace : `/${opts.namespace}`,
      );
    }
    if (opts.middleware) {
      this._middleware.push(...opts.middleware);
    }
  }

  /**
   * Remove options of the group
   *
   * @param opts group options
   */
  private removeOption(opts: GroupOpts): void {
    if (opts.prefix) {
      this._prefix.pop();
    }
    if (opts.namespace) {
      this._namespace.pop();
    }
    if (opts.middleware) {
      this._middleware = this._middleware.slice(
        0,
        this._middleware.length - opts.middleware.length,
      );
    }
  }

  /**
   * GET request.
   */
  public get(path: string, action: Action, middleware?: Middleware) {
    this._router.get(
      this._prefix.join('') + path,
      ...this.importMiddleware(this._middleware),
      ...this.importMiddleware(middleware || []),
      this.importAction(action),
    );
  }

  /**
   * POST request.
   */
  public post(path: string, action: Action, middleware?: Middleware) {
    this._router.post(
      this._prefix.join('') + path,
      ...this.importMiddleware(this._middleware),
      ...this.importMiddleware(middleware || []),
      this.importAction(action),
    );
  }

  /**
   * PUT request.
   */
  public put(path: string, action: Action, middleware?: Middleware) {
    this._router.put(
      this._prefix.join('') + path,
      ...this.importMiddleware(this._middleware),
      ...this.importMiddleware(middleware || []),
      this.importAction(action),
    );
  }

  /**
   * PATCH request.
   */
  public patch(path: string, action: Action, middleware?: Middleware) {
    this._router.patch(
      this._prefix.join('') + path,
      ...this.importMiddleware(middleware || []),
      this.importAction(action),
    );
  }

  /**
   * DELETE request.
   */
  public delete(path: string, action: Action, middleware?: Middleware) {
    this._router.delete(
      this._prefix.join('') + path,
      ...this.importMiddleware(this._middleware),
      ...this.importMiddleware(middleware || []),
      this.importAction(action),
    );
  }

  /**
   * Import an action
   *
   * @param action handler.
   */
  private importAction(action: Action) {
    return this._importer.import(
      action,
      `${this._dir}${this._constrollerPath}/${this._namespace.join('')}/`,
    );
  }

  /**
   * Import middlewares.
   *
   * @param middleware list of middleware.
   */
  private importMiddleware(middleware: Middleware) {
    return middleware.map((m: any) => {
      if (typeof m === 'string') {
        const [method, args] = m.split(':');

        if (args) {
          return this._importer.import(
            method,
            `${this._dir}${this._middlewarePath}/`,
          )(...args.split(','));
        }
      }

      return this._importer.import(m, `${this._dir}${this._middlewarePath}/`)();
    });
  }
}
