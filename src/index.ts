
export namespace StrictRoutes {
  export interface ParamTypes {
    number: number;
    string: string;
    'string | number': string | number;
    'number | string': string | number;
  }

  type GetParamType1<T extends string> = 
  T extends keyof ParamTypes 
  ? ParamTypes[T] 
  : never;

  type GetParamType<T extends string> = 
    T extends `${infer _Name}:${infer Type}` 
    ? GetParamType1<Type> 
    : string | number;

  type GetParamName<T extends string> = 
    T extends `${infer Name}:${infer _Type}` 
    ? Name 
    : T;

  export type ExtractRouteParams<T extends string> =
    string extends T
    ? Record<string, string>
    // recurse
    : T extends `${infer _Start}/{${infer Param}}${infer Rest}`
    // result (recursive)
    ? { [k in GetParamName<Param>]: GetParamType<Param> } & ExtractRouteParams<Rest>
    // final element
    : T extends `${infer _Start}/{${infer Param}}`
    // result
    ? { [k in GetParamName<Param>]: GetParamType<Param> }
    : {};

  export type HasParams<R extends string> = 
    R extends `${infer _Start}/{${infer _Param}}${infer _Rest}` 
    ? true 
    : false;

  export type RouteWithValues<R extends string> = {
    [P in keyof ExtractRouteParams<R> | 'path']:
      P extends 'path'
        ? R
        : P extends keyof ExtractRouteParams<R>
        ? ExtractRouteParams<R>[P]
        : never
  }

  export type RoutesWithValues<Rs extends string> = {
    [R in Rs]: HasParams<R> extends true
      ? RouteWithValues<R>
      : R | { path: R }
  }[Rs]
}

export const strictRoutes = <Routes extends string>() => {
  return <
    T extends Record<
      string,
      (route: StrictRoutes.RoutesWithValues<Routes>) => void
    >
  >(
    functions: T
  ): T => functions;
};
