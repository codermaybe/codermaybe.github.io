# 泛型

[Java 中的泛型](https://www.runoob.com/java/java-generics.html)
代码复用的工具，

## 泛型：给不同类型的对象提供相同的实现

- 不同类型的史莱姆实现

```rust
struct Slime<T> {
    size: T,
    weight: T,
}

impl<T: std::fmt::Display + Copy> Slime<T> {
    fn new(size: T, weight: T) -> Slime<T> {
        Slime { size, weight }
    }

    fn yell(&self) {
        println!(
            "as a slim ,my size is {},and my weight is {}",
            self.size, self.weight
        );
    }
}

fn main() {
    let a = Slime::new(10, 20); //整形史莱姆
    a.yell();
    let b = Slime::new("infinite", "2kg"); //字符串史莱姆
    b.yell();
}

```
