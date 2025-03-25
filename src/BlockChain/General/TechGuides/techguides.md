#

## 引导
✔️❌标志文章更新时刻仍在维护

### 市值记录


### 区块链开发部署工具
#### ✔️[hardhat](https://hardhat.org/)
- 从开发到部署全覆盖的工具，内置hardhat node等内部测试链。
- 工具全面但相对比较臃肿，类似hardhat-ethers、hardhat-viem等包均涉及，想将大部分内容包含进生态中。
- 基础的开发部署命令例如hardhat deploy等已经具备部署能力，又有hardhat ignition这类新加入的工具提供同样的效果，增加链上合约管理等功能。工具之间同质化较麻烦。

#### ✔️[Foundry-登链社区中文翻译](https://learnblockchain.cn/docs/foundry/i18n/zh/)
- 后起之秀，工具集健全，目前没有过于臃肿。

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