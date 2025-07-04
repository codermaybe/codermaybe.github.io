# Summary

# [关于此站]()

- [免责声明](README.md)
- [资源导航](Resources.md)

# [个人资料(profile)]()

- [中文简历](./Personal/简历.md)
- [Self Introduntion](./Personal/resume.md)

---

# 区块链开发(BlockChain Develop)

- [BlockChain](./BlockChain/General/blockchain.md)
  - [基础常识](./BlockChain/General/BasicOfBlockchain.md)
    - [主流方向](./BlockChain/General/Mainstream_direction.md)
  - [共识机制](./BlockChain/General/Consensus/consensus.md)
    - [POW](./BlockChain/General/Consensus/pow.md)
    - [POS](./BlockChain/General/Consensus/pos.md)
    - [POH](./BlockChain/General/Consensus/poh.md)
    - [PBFT](./BlockChain/General/Consensus/pbft.md)
    - [BFT](./BlockChain/General/Consensus/bft.md)
    - [HOTSTUFF](./BlockChain/General/Consensus/hotstuff.md)
  - [密码学](./BlockChain/cryptography/cryptography.md)
    - [ED25519](./BlockChain/cryptography/ED25519/ED25519.md)
    - [RSA](./BlockChain/cryptography/RSA/RSA.md)
  - [技术概览](./BlockChain/./General/TechGuides/techguides.md)
  - [商机&&危机]()
- [Ethereum](./BlockChain/Ethereum/ethereum.md)

  - [以太坊基础](./BlockChain/Ethereum/Basic/EthereumBasic.md)
  - [Ethers]()
    - [以太坊简单合约交互]()
    - [私钥还原](./BlockChain/Ethereum/Ethers/simpleInteract/PrivatekeyCovert.md)
  - [ERC 标准](./BlockChain/Ethereum/ERC/ERC.md)
    - [ERC20](./BlockChain/Ethereum/ERC/ERC20.md)
    - [ERC712](./BlockChain/Ethereum/ERC/ERC712.md)
    - [ERC721](./BlockChain/Ethereum/ERC/ERC721.md)
    - [ERC777](./BlockChain/Ethereum/ERC/ERC777.md)
    - [EIP1155](./BlockChain/Ethereum/ERC/ERC1155.md)
    - [EIP2612](./BlockChain/Ethereum/ERC/ERC2612.md)
    - [EIP3009](./BlockChain/Ethereum/ERC/ERC3009.md)
    - [EIP4626](./BlockChain/Ethereum/ERC/ERC4626.md)
  - [Defi]()

    - [Uniswap](./BlockChain/Ethereum/Defi/Uniswap/uniswap.md)

      - [V1](./BlockChain/Ethereum/Defi/Uniswap/V1/uniswapv1.md)
      - [V2](./BlockChain/Ethereum/Defi/Uniswap/V2/uniswapv2.md)
        - [V2 白皮书](./BlockChain/Ethereum/Defi/Uniswap/V2/whitepaper/uniswapV2whitepaper.md)
      - [V3](./BlockChain/Ethereum/Defi/Uniswap/V3/uniswapv3.md)
        - [V3 白皮书](./BlockChain/Ethereum/Defi/Uniswap/V3/whitepaper/uniswapV3whitepaper.md)

  - [以太坊进阶]()
    - [安全问题](./BlockChain/Ethereum/Advanced/SafetyProblems/SafetyProblem.md)
      - [授权竞争攻击](./BlockChain/Ethereum/Advanced/SafetyProblems/authorizeAttack/authorizeRaceAttack.md)
      - [重入攻击](./BlockChain/Ethereum/Advanced/SafetyProblems/reentrancyAttack/reentrancyAttack.md)
      - [整数溢出](./BlockChain/Ethereum/Advanced/SafetyProblems/integerOverflow/overflow.md)
      - [权限控制问题](./BlockChain/Ethereum/Advanced/SafetyProblems/AccessControl/accessControl.md)
      - [Dos 攻击](./BlockChain/Ethereum/Advanced/SafetyProblems/DOS/DOS.md)
    - [Rollup](./BlockChain/Ethereum/Advanced/Rollup.md)
    - [零知识证明](./BlockChain/Ethereum/Advanced/ZK.md)

- [Solidity]()

  - [ERC 常用实战](./BlockChain/Ethereum/Solidity/Basic/ErcImplementation/ErcImplementation.md)
    - [ERC20 实战](./BlockChain/Ethereum/Solidity/Basic/ErcImplementation/ERC20/CustomizedERC20V1.md)
  - [Gas 优化](./BlockChain/Ethereum/Solidity/GasOptimization/gasOptimization.md)
    - [变量优化](./BlockChain/Ethereum/Solidity/GasOptimization/variables/variables.md)
    - [循环优化](./BlockChain/Ethereum/Solidity/GasOptimization/loop/loop.md)
  - [热门项目源码分析]()
    - [BNB 源码分析](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/BNB/BNB.md)
      - [WBNB](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/BNB/WBNB/WBNB.md)
      - [BNB](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/BNB/BNB-ETH/BNB.md)
    - [USDC 源码分析](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/USDC.md)
      - [USDC 代理合约](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/FiatTokenProxy/FiatTokenProxy.md)
      - [USDC_V1 源码解析](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/USDCV1.md)
        - [Ownable](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/sourcecode/Ownable/Ownable.md)
        - [Pauseable](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/sourcecode/Pauseable/Pauseable.md)
        - [AbstractFiatTokenV1](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/sourcecode/AbstractFiatTokenV1/AbstractFiatTokenV1.md)
        - [Blacklistable](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/sourcecode/Blacklistable/Blacklistable.md)
        - [FiatTokenV1](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1/sourcecode/FiatTokenV1/FiatTokenV1.md)
      - [USDC_V1_1 源码解析](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1.1/USDCV1_1.md)
        - [FiatTokenV1_1](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1.1/sourcecode/FiatTokenV1_1/FiatTokenV1_1.md)
        - [Rescuable](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V1.1/sourcecode/Rescuable/Rescuable.md)
      - [USDC_V2 源码解析](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/USDCV2.md)
        - [AbstractFiatTokenV2](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/AbstractFiatTokenV2/AbstractFiatTokenV2.md)
        - [EIP712Domain](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/EIP712Domian/EIP712Domain.md)
        - [EIP2612](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/EIP2612/EIP2612.md)
        - [EIP3009](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/EIP3009/EIP3009.md)
        - [FiatTokenV2](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/FiatTokenV2/FiatTokenV2.md)
        - [FiatTokenV2_1](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/FiatTokenV2_1/FiatTokenV2_1.md)
        - [FiatTokenV2_2](./BlockChain/Ethereum/Solidity/SourceCodeAnalysis/USDC/V2/sourcecode/FiatTokenV2_2/FiatTokenV2_2.md)

- [Hardhat]()
  - [Hardhat-ignition]()
    - [Hardhat-ignition 再次部署问题](./BlockChain/Hardhat/Hardhat-Ignition/redeploy/ignition-redeploy.md)
- [Foundry](./BlockChain/Foundry/FoundryGuide.md)
  - [基础学习]()
    - [forge clone](./BlockChain/Foundry/ForgeClone/FrogeClone.md)
    - [forge soldeer](./BlockChain/Foundry/ForgeSoldeer/ForgeSoldeer.md)
- [Solana](./BlockChain/Solana/Basic/SolanaBasicGuide.md)
  - [基础学习]()
    - [账户模型](./BlockChain/Solana/Basic/accountmodel/accountmodel.md)
    - [交易和指令](./BlockChain/Solana/Basic/Transactions&Instructions/transactions&instructions.md)

---

# Rust

- [基础](./Rust/Basic.md)
  - [变量绑定与赋值](./Rust/Basic/变量绑定与赋值.md)
  - [变量类型](./Rust/Basic/Variables.md)
  - [特征](./Rust/Basic/Trait.md)
  - [泛型](./Rust/Basic/generics.md)
- [高级特性]()
  - [闭包](./Rust/Hard/closure.md)

---

# 计算机组成原理()

---

# 网络(Network)

- [OSI](./Network/Model/OSI.md)
- [TCP/IP](./Network/Model/TCP_IP.md)

---

# 前端开发(FrontEnd Dev)

- [网页基础]()
  - [HTML]()
  - [CSS3]()
  - [JavaScript]()
- [React]()
- [TypeScript]()
