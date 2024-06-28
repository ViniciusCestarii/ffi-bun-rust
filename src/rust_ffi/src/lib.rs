#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[no_mangle]
pub extern "C" fn sort_array(ptr: *mut i32, len: usize) {
    // Safety: we need to ensure the pointer and length are valid
    let slice = unsafe { std::slice::from_raw_parts_mut(ptr, len) };
    slice.sort();
}