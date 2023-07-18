type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
}

type Either<T, U> = Only<T, U> | Only<U, T>

type TValueOf<T, R = void> = R extends void ? T[keyof T] : T[keyof T] | R

type TArrayItem<T> = Exclude<T, null | undefined | number | string | boolean>[number]

type TStartWith<Prefix, T = string> = `${Prefix}${T}` | Prefix

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

type DeepExclude<T, U> =
  T extends U ? never :
  T extends object ? {
    [K in keyof T]: DeepExclude<T[K], U>
  } : T

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K]
}
