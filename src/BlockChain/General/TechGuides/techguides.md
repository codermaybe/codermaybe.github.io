# 区块链技术概览

## 引导

✔️❌ 标志文章更新时刻仍在维护

### [市值](https://defillama.com/chains)

<iframe src="https://defillama.com/chains" width="100%" height="400px"></iframe>

### 区块链开发部署工具

#### ✔️[Hardhat](https://hardhat.org/)

- 从开发到部署全覆盖的工具，内置 hardhat node 等内部测试链
- 工具全面但相对比较臃肿，类似 hardhat-ethers、hardhat-viem 等包均涉及
- 基础的开发部署命令例如 hardhat deploy 等已经具备部署能力
- 支持 TypeScript，提供完整的开发环境
- 丰富的插件生态系统

#### ✔️[Foundry](https://learnblockchain.cn/docs/foundry/i18n/zh/)

- 后起之秀，工具集健全，目前没有过于臃肿
- 使用 Rust 编写，性能优异
- 内置测试框架，支持快速开发
- 支持直接使用 Solidity 编写测试
- 提供完整的部署和验证工具链

#### ✔️[Truffle](https://trufflesuite.com/)

- 成熟的开发框架，历史悠久
- 提供完整的开发、测试和部署工具链
- 支持多种网络配置
- 内置控制台和调试工具
- 丰富的插件系统

### Solana 开发工具

#### ✔️[Anchor](https://www.anchor-lang.com/)

- Solana 智能合约开发框架
- 使用 Rust 编写合约
- 提供完整的开发工具链
- 支持 TypeScript/JavaScript 客户端
- 内置测试框架和部署工具

#### ✔️[Solana Program Library (SPL)](https://spl.solana.com/)

- Solana 标准程序库
- 包含代币、NFT 等标准实现
- 提供完整的文档和示例
- 活跃的社区维护
- 支持多种代币标准

#### ✔️[Seahorse](https://seahorse-lang.org/)

- Python 开发 Solana 智能合约
- 简化开发流程
- 适合 Python 开发者
- 提供完整的开发工具
- 活跃的社区支持

### 区块链交互工具

#### ❌<s>[web3.js](https://docs.web3js.org/)</s>

- 当前使用量最高的交互工具，大量的开发项目使用此库进行开发
- doc 文档丰富且全面，指引较多
- 截止 2025.3.4 号已经停更，详情可见[ChainSafe](https://blog.chainsafe.io/web3-js-sunset/)
- 建议新项目迁移到 ethers.js 或 viem

#### ✔️[ethers.js](https://ethers.org/)

- 截止 2025.3.25 仍在更新的交互工具
- doc 内容偏应用，没有太多说明
- 提供完整的 TypeScript 支持
- 内置多种实用工具和辅助函数
- 活跃的社区支持

#### ✔️[viem](https://viem.sh/)

- 截止 2025.3.25 仍在更新的交互工具
- 性能优异，[相关对比测试](https://viem.sh/docs/introduction#performance)
- TypeScript 优先，提供完整的类型支持
- 模块化设计，可按需引入
- 支持多种链和网络

### Solana 交互工具

#### ✔️[web3.js](https://solana-labs.github.io/solana-web3.js/)

- Solana 官方 JavaScript API
- 提供完整的 TypeScript 支持
- 支持所有 Solana 功能
- 活跃的社区维护
- 丰富的文档和示例

#### ✔️[Phantom Wallet](https://phantom.app/)

- 流行的 Solana 钱包
- 提供完整的 SDK
- 支持多种功能
- 良好的用户体验
- 活跃的社区支持

### 智能合约开发工具

#### ✔️[OpenZeppelin](https://www.openzeppelin.com/)

- 提供标准化的智能合约库
- 包含 ERC20、ERC721 等标准实现
- 提供完整的安全审计
- 活跃的社区维护
- 丰富的文档和示例

#### ✔️[Remix IDE](https://remix.ethereum.org/)

- 浏览器-based 开发环境
- 支持在线编译和部署
- 内置调试工具
- 支持插件扩展
- 适合快速原型开发

### 测试工具

#### ❌<s>[Ganache](https://archive.trufflesuite.com/ganache/)</s>

- 已经停更的本地测试工具，用于模拟以太坊节点交互。

#### ✔️[Waffle](https://getwaffle.io/)

- 基于 ethers.js 的测试框架
- 支持 TypeScript
- 提供丰富的断言库
- 支持快照测试
- 与 Hardhat 完美集成

#### ✔️[Chai](https://www.chaijs.com/)

- 流行的断言库
- 支持多种断言风格
- 丰富的插件系统
- 良好的文档支持
- 广泛用于智能合约测试

### 监控和分析工具

#### ✔️[Etherscan](https://etherscan.io/)

- 区块链浏览器
- 合约验证服务
- API 接口支持
- 丰富的分析工具
- 支持多链

#### ✔️[Tenderly](https://tenderly.co/)

- 实时监控和告警
- 交易模拟和调试
- 智能合约分析
- 支持多链
- 提供 API 服务

### Solana 监控工具

#### ✔️[Solana Explorer](https://explorer.solana.com/)

- Solana 区块链浏览器
- 实时交易监控
- 账户分析工具
- 程序部署验证
- 支持测试网和主网

#### ✔️[Solscan](https://solscan.io/)

- 专业的 Solana 分析工具
- 提供详细的链上数据
- 支持代币和 NFT 追踪
- 提供 API 服务
- 支持多语言

### 安全工具

#### ✔️[Slither](https://github.com/crytic/slither)

- 静态分析工具
- 支持多种漏洞检测
- 提供详细的报告
- 支持自定义规则
- 活跃的社区维护

#### ✔️[Mythril](https://github.com/ConsenSys/mythril)

- 智能合约安全分析工具
- 支持符号执行
- 提供漏洞检测
- 支持多种输出格式
- 持续更新维护
