# 🍞🦀 FFI Bun Rust

## About
This project demonstrates how to integrate Rust code, with TypeScript for web applications using bun:ffi module. It showcases how Rust's performance and safety, combined with TypeScript's ease of development, provide a powerful combination for modern web development.

## Features
- Performance: Rust provides low-level control and performance optimizations, ideal for compute-intensive tasks in web applications.

- Safety: Rust's strong type system and ownership model prevent common bugs such as null pointer dereferences and data races.

- Developer Experience: TypeScript offers a productive environment with type checking and modern JavaScript features, enhancing code quality and maintainability.

## How It Works

1. Compilation: Rust code compiles into native executable binaries tailored for the target platform.

2. Integration: TypeScript imports and interacts with these compiled binaries using bun:ffi module, facilitating seamless functionality within web applications.

## Benchmark Example
The project includes a benchmark comparing JavaScript and Rust sorting capabilities:

```ts
const bigArray = new Int32Array(Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000)))

console.time("Rust Sort time");
lib.symbols.sort_array(bigArray.slice(), bigArray.length);
console.timeEnd("Rust Sort time");

console.time("JS Sort time");
bigArray.sort((a, b) => a - b);
console.timeEnd("JS Sort time");
```

output:
```
[Rust Sort time]: 56.76ms
[JS Sort time]: 301.31ms
```

## Usage

To run the project:

1. Navigate to the bun project folder:

```sh
cd src/bun_project &&
```

2. Execute the following command to build and run the project:

```sh
bun run dev
```
