#


### 区块链开发部署工具
#### ✔️[hardhat](https://hardhat.org/)

### 区块链交互工具

#### ❌<s>[web3.js](https://docs.web3js.org/)</s>
- 当前使用量最高的交互工具，大量的开发项目使用此库进行开发
- doc文档丰富且全面，指引较多
- 截止2025.3.4号已经停更，详情可见[ChainSafe](https://blog.chainsafe.io/web3-js-sunset/)


#### ✔️[ethers.js](https://ethers.org/)
- 截止2025.3.25仍在更新的交互工具
- doc内容偏应用，没有太多说明

#### ✔️[viem](https://viem.sh/)

- 截止2025.3.25仍在更新的交互工具
- 性能不错，[相关对比测试](https://viem.sh/docs/introduction#performance)。暂未发现第三方的实验数据，按照官方文档看来处理交互数据速度极快，似乎相当适合cex/dex高频交易？对于链上追踪聪明钱并短线跟投谋利的公司具有**较强**吸引力。
- ts库，在纯 JavaScript 项目中使用 Viem 时，无法利用 TypeScript 提供的类型检查功能。需要自行确保传递给 Viem 函数的参数类型正确