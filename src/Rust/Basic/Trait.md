# 通过特征变量和特征实现不同结构体实现相同效果
```rust
use std::fmt::format;

#[derive(Debug)]
pub struct Teacher {
    age: i32,
    name: String,
    skill: String,
}
pub struct Student {
    age: i32,
    name: String,
    class: u32,
}
pub trait TellInfo {
    fn Sayage(&self);
    fn SelfIntroduction(&self) -> String;
    
}

impl TellInfo for Teacher {
    fn Sayage(&self) {
        println!("Teacher {}'s age is {}", self.name, self.age);
    }
    fn SelfIntroduction(&self) -> String {
        let brief_intro = format!(
            "As a teacher,my name is {},i'm {} years old and my skill includes {}",
            self.name, self.age, self.skill
        );
        brief_intro
    }
}

impl TellInfo for Student {
    fn Sayage(&self) {
        println!("Student {}'s age is {}", self.name, self.age);
    }
    fn SelfIntroduction(&self) -> String {
        let brief_intro = format!(
            "As a student,my name is {},i'm {} years old and my come from NO.{} class",
            self.name, self.age, self.class
        );
        brief_intro
    }
}

 fn StageSpeech(T: &impl TellInfo) { //引入特征变量
        let Info = T.SelfIntroduction();
        println!("{}", &Info);
    }

fn main() {
   

    let Teacher1 = Teacher {
        age: 33,
        name: "Tom".to_string(),
        skill: "Math/english/phyisc".to_string(),
    };
    let Student1 = Student {
        age: 14,
        name: "charles".to_string(),
        class: 3,
    };
    StageSpeech(&Teacher1);
    StageSpeech(&Student1);
}
```
- 特征类似于java等类语言中的接口，用于给自定义类型或者常见类型变量实现指定的方法
- 常见声明如下 `pub trait trait1 { fn a(&self)->Self{};}`,常用于声明和定义方法和函数：方法和函数的区别在于 方法中引用变量自身作为参数传入 ，而函数不依赖
- 特征变量：从各类变量中抽象出来，仅作为有某一特定特征的变量 调用方式:
  1. 在函数声明中直接声明，例 `fn a(T:&impl Display)`  
  2. Box<dyn Display> 使用智能指针封装并调用。 