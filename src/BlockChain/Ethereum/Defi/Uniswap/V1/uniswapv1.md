# Uniswap V1

[推荐链接-知乎](https://zhuanlan.zhihu.com/p/552867213)

## 概述

Uniswap V1 是第一个完全去中心化的自动做市商（AMM）协议，由 Hayden Adams 于 2018 年 11 月推出。它通过智能合约实现了代币的自动交易，无需传统的订单簿。

## 核心机制

### AMM（Automated Market Maker）

Uniswap V1 使用恒定乘积做市商（Constant Product Market Maker）模型，其核心公式为：

```
x * y = k
```

其中：

- x 是代币 X 的储备量
- y 是代币 Y 的储备量
- k 是常数

### 价格计算

代币 X 相对于代币 Y 的价格计算公式为：

```
price = y / x
```

### 滑点

滑点（Slippage）是指实际成交价格与预期价格之间的差异。在 Uniswap V1 中，滑点主要由以下因素决定：

1. **交易规模**：

   - 交易规模越大，滑点越大
   - 这是因为 x \* y = k 的曲线特性

2. **流动性深度**：
   - 流动性池越大，滑点越小
   - 流动性提供者（LP）的数量和质量影响滑点

### 交易费用

1. **费率**：

   - 每笔交易收取 0.3% 的手续费
   - 手续费直接添加到流动性池中

2. **费用分配**：
   - 手续费按比例分配给所有流动性提供者
   - 分配基于 LP 在池中的份额

## 智能合约架构

### 核心合约

1. **Exchange.sol**：

   - 处理代币交换
   - 管理流动性池
   - 实现价格计算

2. **Factory.sol**：
   - 创建新的交易对
   - 管理所有交易对

### 主要函数

```solidity
// 添加流动性
function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external returns (uint256);

// 移除流动性
function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);

// 代币交换
function tokenToTokenSwap(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr) external returns (uint256);

// 获取价格
function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256);
```

## 特点

1. **完全去中心化**：

   - 无需中心化交易所
   - 无需订单簿
   - 无需做市商

2. **自动定价**：

   - 价格由算法自动确定
   - 基于供需关系动态调整

3. **流动性提供**：

   - 任何人都可以提供流动性
   - 获得交易手续费分成

4. **无需许可**：
   - 任何人都可以创建交易对
   - 任何人都可以进行交易

## 局限性

1. **高滑点**：

   - 大额交易滑点较高
   - 不适合大额交易

2. **价格偏差**：

   - 可能偏离市场价格
   - 需要套利者维持价格稳定

3. **无常损失**：
   - 流动性提供者面临价格波动风险
   - 可能导致比单纯持有代币更低的收益

## 安全考虑

1. **重入攻击防护**：

   - 使用检查-效果-交互模式
   - 实现重入锁

2. **精度控制**：

   - 使用足够大的精度
   - 防止舍入误差

3. **权限控制**：
   - 严格控制管理员权限
   - 实现时间锁机制
