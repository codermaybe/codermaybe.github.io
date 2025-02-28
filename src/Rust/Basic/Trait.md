# 通过泛型和特征实现不同结构体实现相同效果
```Rust
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

fn main() {
    fn StageSpeech(T: &impl TellInfo) {
        let Info = T.SelfIntroduction();
        println!("{}", &Info);
    }

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