/*eslint-disable*/
export abstract class Request {
  get(
    path: string,
    action: string | CallableFunction,
    middleware: CallableFunction[] = [],
  ) {}
  post(
    path: string,
    action: string | CallableFunction,
    middleware: CallableFunction[] = [],
  ) {}
  put(
    path: string,
    action: string | CallableFunction,
    middleware: CallableFunction[] = [],
  ) {}
  patch(
    path: string,
    action: string | CallableFunction,
    middleware: CallableFunction[] = [],
  ) {}
  delete(
    path: string,
    action: string | CallableFunction,
    middleware: CallableFunction[] = [],
  ) {}
}
