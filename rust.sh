#! /usr/bin/env bash

cd ./playground/rust
cargo build && RUST_BACKTRACE=1 ./target/debug/rust $1
