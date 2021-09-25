mod l_1;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let module_name = args[1].as_str();
    match module_name {
        "1" => println!("ret: {:?}", l_1::run()),
        _ => println!("no matched module: {:?}", module_name),
    }
}
