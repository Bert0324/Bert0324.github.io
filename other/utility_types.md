# Utility Types

See Official Documents in here <https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterst>.

The concept of Utility Types in TS, for me, it is kink of similar to  `Option<T>` and `Result<T, E>` in Rust.

There are some of real implementation of common Utility Types in here.

## `Pick<T,K>` and `Omit<T,K>`

## `Exclude<T,U>` and `Extract<T,U>`

## `Partial<T>` and `Required<T>`

## `Parameters<T>` and `ReturnType<T>`

```ts
const f = (p1: string, p2: number) => ({ p1, p2 });
type P = Parameters<typeof f>;
type R = ReturnType<typeof f>;
const p: P = ['1', 2];
const r: R = f(...p);
```

## `Readonly<T>`

## `Record<K,T>`
