/*eslint-disable*/
export abstract class Request {
  get(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ) {}
  post(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ) {}
  put(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ) {}
  patch(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ) {}
  delete(
    path: string,
    action: string | CallableFunction,
    ...middleware: string[]
  ) {}
}
