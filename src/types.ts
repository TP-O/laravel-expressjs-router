export interface GroupOpts {
  prefix?: string;
  namespace?: string;
  middleware?: string[] | CallableFunction[];
}

export type Middleware = string[] | CallableFunction[];

export type Action = string | CallableFunction;
