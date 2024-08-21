import { dlopen, FFIType } from "bun:ffi";
import path from "path"

function myOwnQuicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...myOwnQuicksort(left), ...middle, ...myOwnQuicksort(right)];
}

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
console.log(`Result from Rust: 3 + 4 = ${result}`);

const array = new Int32Array([5, 3, 8, 1, 2]);
console.log("Array before sort:", array);

lib.symbols.sort_array(array, array.length);
console.log("Array after sort:", array);

const bigArray = new Int32Array(Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000)))

console.time(`Rust big array ${bigArray.length} length Sort time`);
lib.symbols.sort_array(bigArray.slice(), bigArray.length);
console.timeEnd(`Rust big array ${bigArray.length} length Sort time`);

console.time(`JS sort method big array ${bigArray.length} length Sort time`);
bigArray.slice().sort((a, b) => a - b);
console.timeEnd(`JS sort method big array ${bigArray.length} length Sort time`);

console.time(`JS MyOwnQuic big array ${bigArray.length} length sort time`);
myOwnQuicksort(Array.from(bigArray.slice()))
console.timeEnd(`JS MyOwnQuic big array ${bigArray.length} length sort time`);


