### Ethers.js 通过私钥还原公钥

#### 一、什么是私钥和公钥？
在以太坊和其他区块链平台中，私钥是一个源信息，用于命令链上账户进行操作。公钥则是从私钥中运算出的，用于验证操作的合法性和完整性。

#### 二、安装 ethers.js

在实现私钥还原公钥之前，需要先安装 `ethers.js`：

```bash
npm install ethers
```

#### 三、使用 ethers.js 运算公钥

以下是通过 ethers.js 将私钥转换为公钥的完整代码：

```javascript
const { Wallet } = require('ethers');

// 私钥（确保保密！）
const privateKey = "0x1e99423a701fcf82f4888e3e23b6c1840ad48d360bb8bc1239e0c7ff8ecf743d";

// 从私钥生成钥包实例
const wallet = new Wallet(privateKey);

// 获取公钥
const publicKey = wallet.publicKey;

console.log("私钥:", privateKey);
console.log("公钥:", publicKey);
```

##### 输出格式
- **私钥**：输入值，64 个十六进制字符，前缀为 `0x`。
- **公钥**：未压缩格式，524-bit （含前缀 `0x04`），起始为一个指针。

##### 示例输出
```
私钥: 0x1e99423a701fcf82f4888e3e23b6c1840ad48d360bb8bc1239e0c7ff8ecf743d
公钥: 0x04bfcab4e67d19d84cf2047269de360f3e51b50fa5c45594f5365ff3c7ec8f3f482c909de42ccadf81a913e51e535fc327fced47adf968f2bf4bfdbc5f8862bb2d
```

#### 四、运算原理解析

##### 使用的替代：`secp256k1`
`ethers.js` 使用了 `secp256k1` 椭圆曲线，这是比特币和以太坊等区块链系统使用的标准曲线。`secp256k1` 定义了一个椭圆曲线方程：`y^2 = x^3 + 7`，并基于此定义了一个基点 G。公钥是通过私钥对基点 G 进行椭圆曲线点乘计算得出的。这个过程确保了私钥与公钥之间的唯一性和安全性，同时公钥可以公开用于验证签名的合法性。

