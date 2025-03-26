# RSA 加密算法

## 相关链接
- [百度百科](https://baike.baidu.com/item/RSA%E7%AE%97%E6%B3%95/263310)

- [知乎](https://zhuanlan.zhihu.com/p/450180396)


RSA（Rivest-Shamir-Adleman）是一种非对称加密算法，由 Ron Rivest、Adi Shamir 和 Leonard Adleman 在 1977 年提出。它是目前最广泛使用的公钥加密算法之一。

## 基本原理

RSA 的安全性基于大数分解的困难性。具体来说，它依赖于以下数学原理：

1. 欧拉函数：对于两个互质的正整数 p 和 q，有 φ(pq) = (p-1)(q-1)
2. 欧拉定理：如果 a 和 n 互质，则 a^φ(n) ≡ 1 (mod n)
3. 大数分解的困难性：将一个大数分解为其质因数的乘积在计算上是困难的

## 密钥生成过程

1. 选择两个大素数 p 和 q
2. 计算 n = p × q
3. 计算欧拉函数 φ(n) = (p-1)(q-1)
4. 选择一个与 φ(n) 互质的整数 e（通常选择 65537）
5. 计算 e 关于 φ(n) 的模反元素 d，即满足 e × d ≡ 1 (mod φ(n))
6. 公钥为 (n, e)，私钥为 (n, d)

## 加密和解密过程

### 加密
对于明文 M，密文 C 的计算公式为：
C = M^e mod n

### 解密
对于密文 C，明文 M 的计算公式为：
M = C^d mod n

## 安全性考虑

1. 密钥长度：现代应用中通常使用 2048 位或更长的密钥
2. 素数选择：p 和 q 应该足够大且随机
3. 填充方案：实际应用中需要使用适当的填充方案（如 PKCS#1）
4. 侧信道攻击防护：实现时需要考虑时序攻击等侧信道攻击

## 应用场景

1. 数字签名
2. 安全通信（如 HTTPS）
3. 软件分发
4. 数字证书
5. 安全电子邮件

## 优缺点

### 优点
- 安全性高
- 应用广泛
- 支持数字签名
- 密钥分发方便

### 缺点
- 计算速度较慢
- 密钥长度较长
- 不适合加密大量数据
- 需要妥善保管私钥

## 代码示例

以下是一个 Rust 实现示例。首先需要在 `Cargo.toml` 中添加依赖：

```toml
[dependencies]
num-bigint = "0.4"
num-traits = "0.2"
```

然后是 Rust 实现代码：

```rust
use num_bigint::{BigInt, Sign};
use num_traits::{One, Zero};

fn generate_key_pair(p: u64, q: u64) -> ((BigInt, BigInt), (BigInt, BigInt)) {
    // 将输入转换为 BigInt
    let p = BigInt::from(p);
    let q = BigInt::from(q);
    
    // 计算 n = p * q
    let n = &p * &q;
    
    // 计算 φ(n) = (p-1)(q-1)
    let phi = (&p - BigInt::one()) * (&q - BigInt::one());
    
    // 选择公钥 e (通常使用 65537)
    let e = BigInt::from(65537u64);
    
    // 计算私钥 d = e^(-1) mod φ(n)
    let d = mod_inverse(&e, &phi).unwrap();
    
    ((n.clone(), e), (n, d))
}

fn encrypt(message: u64, public_key: &(BigInt, BigInt)) -> BigInt {
    let (n, e) = public_key;
    let m = BigInt::from(message);
    
    // 计算 C = M^e mod n
    m.modpow(e, n)
}

fn decrypt(ciphertext: &BigInt, private_key: &(BigInt, BigInt)) -> BigInt {
    let (n, d) = private_key;
    
    // 计算 M = C^d mod n
    ciphertext.modpow(d, n)
}

// 计算模反元素
fn mod_inverse(a: &BigInt, m: &BigInt) -> Option<BigInt> {
    let mut t = BigInt::zero();
    let mut newt = BigInt::one();
    let mut r = m.clone();
    let mut newr = a.clone();
    
    while !newr.is_zero() {
        let quotient = &r / &newr;
        let temp = newt.clone();
        newt = t - &quotient * &temp;
        t = temp;
        
        let temp = newr.clone();
        newr = r - &quotient * &temp;
        r = temp;
    }
    
    if r > BigInt::one() {
        None
    } else {
        if t < BigInt::zero() {
            t = t + m;
        }
        Some(t)
    }
}

fn main() {
    // 示例使用（注意：实际应用中应使用更大的素数）
    let p = 61u64;
    let q = 53u64;
    
    let (public_key, private_key) = generate_key_pair(p, q);
    
    let message = 42u64;
    let ciphertext = encrypt(message, &public_key);
    let decrypted = decrypt(&ciphertext, &private_key);
    
    println!("原始消息: {}", message);
    println!("加密后: {}", ciphertext);
    println!("解密后: {}", decrypted);
}
```



## 最佳实践

1. 使用足够长的密钥（至少 2048 位）
2. 使用安全的随机数生成器
3. 实现适当的填充方案
4. 定期更新密钥
5. 使用经过验证的密码库
6. 注意密钥的安全存储
7. 考虑使用混合加密系统（RSA + 对称加密）

