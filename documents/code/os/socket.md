# Socket

## Demo

server:

```rust
use std::net::UdpSocket;
fn main() {
    let socket = UdpSocket::bind("0.0.0.0:8888").unwrap();

    let mut buf = [0; 65535];
    loop {
        let (amt, src) = socket.recv_from(&mut buf).unwrap();
        println!("received {} bytes from: {:?}", amt, src);
    }
}
```

client:

```rust
use std::net::UdpSocket;
use std::{thread, time};
fn main() {
    let socket = UdpSocket::bind("0.0.0.0:22222").unwrap();
    let buf = [1u8; 60000];
    let mut count = 100;
    loop {
        socket.send_to(&buf[0..count], "0.0.0.0:8888").unwrap();
        count = count + 1;
        println!("{}", count);
        if count == 102 {
            break;
        }
    }
    thread::sleep(time::Duration::from_millis(100000));
}
```
