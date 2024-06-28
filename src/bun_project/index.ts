import { dlopen, FFIType } from "bun:ffi";
import path from "path"

let platformSuffix;
switch (process.platform) {
  case 'darwin':
    platformSuffix = 'dylib';
    break;
  case 'win32':
    platformSuffix = 'dll';
    break;
  default:
    platformSuffix = 'so';
    break;
}

const libPath = path.join(__dirname, `../rust_ffi/target/release/rust_ffi.${platformSuffix}`); // Adjust the path based on your OS and library name

const lib = dlopen(libPath, {
    add: {
        args: [FFIType.i32, FFIType.i32],
        returns: FFIType.i32,
    },
    sort_array: {
        args: [FFIType.pointer, FFIType.u64],
        returns: FFIType.void,
    },
});

const result = lib.symbols.add(3, 4);
console.log(`Result from Rust: ${result}`);

const array = new Int32Array([5, 3, 8, 1, 2]);
console.log("Array before sort:", array);

lib.symbols.sort_array(array, array.length);
console.log("Array after sort:", array);

const bigArray = new Int32Array(Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000)))

console.time("Rust Sort time");
lib.symbols.sort_array(bigArray.slice(), bigArray.length);
console.timeEnd("Rust Sort time");

console.time("JS Sort time");
bigArray.sort((a, b) => a - b);
console.timeEnd("JS Sort time");


