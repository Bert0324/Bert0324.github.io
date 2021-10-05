use std::env;
mod tree_builder;
mod l_1;
mod l_102;
mod l_297;

fn main() {
    let args: Vec<String> = env::args().collect();
    let module_name = args[1].as_str();
    println!("Start No.{}", module_name);
    match module_name {
        "1" => println!("ret: {:?}", l_1::run()),
        "102" => println!("ret: {:?}", l_102::run()),
        "297" => println!("ret: {:?}", l_297::run()),
        _ => println!("no matched module: {:?}", module_name),
    }
}
