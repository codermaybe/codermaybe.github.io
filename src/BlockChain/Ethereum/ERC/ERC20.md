# 概念

 
ERC-20 标准的 ABI 是一组函数和事件定义，用于在以太坊上实现可互换的代币标准。ERC-20 代币标准由以太坊社区提出，定义了一组基础接口和功能，如余额查询、转账和授权等。

>目前以太坊等支持evm的链上最活跃的合约标准，大量的加密货币依赖此合约进行交易。



---

### ERC-20 ABI 说明

- **Functions**：
  - `totalSupply`：返回代币的总供应量。
  - `balanceOf`：查询指定地址的余额。
  - `transfer`：从发送者地址向指定地址发送代币。
  - `approve`：批准某个地址可以花费指定数量的代币。
  - `allowance`：查询某个地址对另一个地址授权的代币数量。
  - `transferFrom`：从指定地址向另一个地址转移代币（需要先批准）。

- **Events**：
  - `Transfer`：代币转移事件，记录从一个地址向另一个地址转移的情况。
  - `Approval`：授权事件，记录某个地址被授权花费代币。

- **Metadata Functions**（非强制但通常包含）：
  - `name`：代币的名称。
  - `symbol`：代币的符号。
  - `decimals`：代币的小数位数，通常是 18。

### ERC-20 标准 ABI

以下是 **ERC-20 标准 ABI**，用于与符合 ERC-20 标准的合约进行交互：

```json
[
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {"name": "_owner", "type": "address"},
      {"name": "_spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_from", "type": "address"},
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transferFrom",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "owner", "type": "address"},
      {"indexed": true, "name": "spender", "type": "address"},
      {"indexed": false, "name": "value", "type": "uint256"}
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "from", "type": "address"},
      {"indexed": true, "name": "to", "type": "address"},
      {"indexed": false, "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
```



---

### 如何使用 ERC-20 ABI

使用上面的 ABI 和 `web3.js` 或 `ethers.js` 库，可以轻松与符合 ERC-20 标准的智能合约交互。

#### 使用 `ethers.js` 示例：




#### 使用 `web3.js` 示例：
```javascript
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const erc20ABI = [/* 这里粘贴上面的 ERC-20 ABI */];
const contractAddress = '0xTokenContractAddress'; // 替换为 ERC-20 代币合约地址

const erc20Contract = new web3.eth.Contract(erc20ABI, contractAddress);

erc20Contract.methods.balanceOf('0xYourAddress').call()
  .then(balance => console.log(`Token Balance: ${balance}`));
```

---

### 总结

ERC-20 标准 ABI 包含了代币的核心功能，如代币转移、余额查询和授权操作。通过使用此标准的 ABI，你可以与任何 ERC-20 兼容的合约进行交互。



# 如何调用任意ERC20合约

详见github项目[BlockChain_InteractTools](https://github.com/codermaybe/BlockChain_InteractTools)
