#! /usr/bin/env bash

cd ./playground/rust
cargo build && ./target/debug/rust $1
