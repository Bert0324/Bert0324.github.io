use std::env;
mod l_1;
mod l_102;
mod l_103;
mod l_105;
mod l_106;
mod l_107;
mod l_112;
mod l_114;
mod l_144;
mod l_1448;
mod l_145;
mod l_146;
mod l_200;
mod l_230;
mod l_236;
mod l_297;
mod l_538;
mod l_450;
mod l_94;
mod l_98;
mod l_987;
mod l_701;
mod l_1038;
mod tree_builder;
mod utils;

fn main() {
    let args: Vec<String> = env::args().collect();
    let module_name = args[1].as_str();
    println!("Start No.{}", module_name);
    match module_name {
        "1" => println!("ret: {:?}", l_1::run()),
        "94" => println!("ret: {:?}", l_94::run()),
        "98" => println!("ret: {:?}", l_98::run()),
        "102" => println!("ret: {:?}", l_102::run()),
        "103" => println!("ret: {:?}", l_103::run()),
        "105" => println!("ret: {:?}", l_105::run()),
        "106" => println!("ret: {:?}", l_106::run()),
        "107" => println!("ret: {:?}", l_107::run()),
        "112" => println!("ret: {:?}", l_112::run()),
        "114" => println!("ret: {:?}", l_114::run()),
        "144" => println!("ret: {:?}", l_144::run()),
        "145" => println!("ret: {:?}", l_145::run()),
        "146" => println!("ret: {:?}", l_146::run()),
        "200" => println!("ret: {:?}", l_200::run()),
        "230" => println!("ret: {:?}", l_230::run()),
        "236" => println!("ret: {:?}", l_236::run()),
        "297" => println!("ret: {:?}", l_297::run()),
        "450" => println!("ret: {:?}", l_450::run()),
        "538" => println!("ret: {:?}", l_538::run()),
        "701" => println!("ret: {:?}", l_701::run()),
        "987" => println!("ret: {:?}", l_987::run()),
        "1038" => println!("ret: {:?}", l_1038::run()),
        "1448" => println!("ret: {:?}", l_1448::run()),
        _ => println!("no matched module: {:?}", module_name),
    }
}
