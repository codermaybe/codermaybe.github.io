# Proof of History（PoH）是什么？

[文档推荐 - Solana](https://solana.com/nl/news/proof-of-history)

**Proof of History（PoH，历史证明）** 是由Solana团队开发的一种时间排序机制，旨在通过加密时间戳和可验证延迟函数（VDF）记录事件顺序，提升区块链的性能和可扩展性。PoH并非独立的共识算法，而是与Proof of Stake（PoS）结合使用，专注于解决分布式系统中时间同步的效率问题，为高吞吐量区块链提供了创新基础。

---

## 使用Proof of History（PoH）的区块链项目

以下是截至2025年2月28日，已知与PoH直接关联的区块链项目及其应用情况：

### 1. Solana
- **概述**：Solana是PoH的主要实现者，作为一个高性能Layer 1区块链，支持大规模去中心化应用（DApps）。
- **PoH作用**：Solana将PoH作为其架构的核心组件，与PoS结合。PoH通过生成连续的时间戳序列，标记交易和事件的顺序，减少节点间的时间同步需求，从而实现高吞吐量。
- **特点**：
  - 高吞吐量：理论峰值超65,000 TPS，实际表现约为2,000-3,000 TPS（视网络状况）。
  - 低延迟：区块时间约400毫秒。
  - 应用场景：DeFi（如Serum）、NFT（如Magic Eden）、区块链游戏等。
- **现状**：截至2025年，Solana已成为领先公链之一，其生态系统持续扩展。

### 2. Filecoin（探索性研究）
- **概述**：Filecoin是一个去中心化存储网络，基于Proof of Replication（PoRep）和Proof of Spacetime（PoSt）。
- **PoH关联**：Filecoin本身不使用PoH，但社区和研究者曾探讨将其集成到架构中，以优化时间戳验证或存储证明效率。
- **特点**：
  - PoH可能提升数据检索的排序效率。
  - 目前仅为理论提案，未在主网实现。
- **现状**：PoH在Filecoin中未被正式采用，仅停留于实验讨论。

### 3. Arweave（潜在计划）
- **概述**：Arweave是一个永久存储区块链，使用Proof of Access（PoA）和“Blockweave”结构。
- **PoH关联**：Arweave未正式采用PoH，但其团队曾提及探索类似时间排序机制的可能性，以改进数据验证效率。
- **特点**：
  - PoH或可优化交易顺序记录。
  - 无明确证据显示已实现整合。
- **现状**：截至2025年，PoH在Arweave中仍属概念性讨论，未进入实际部署。

### 其他相关项目
- **Hashgraph**：Hedera Hashgraph是一种基于DAG的分布式账本技术，其事件排序机制与PoH有相似之处，但使用的是“Gossip about Gossip”和虚拟投票协议，非PoH。
- **小型实验链**：一些未具名的区块链项目可能在研究PoH，但缺乏公开文档和影响力，无法确认。

### PoH的应用前景
PoH的核心优势在于高效的时间排序，使其适用于需要高吞吐量和低延迟的场景，如金融交易和实时应用。然而，VDF的计算需求可能限制普通节点参与，引发中心化争议。Solana的成功表明PoH的潜力，未来或有更多项目借鉴其设计。

---

## PoH的核心特点

1. **时间序列生成**  
   PoH通过连续哈希运算生成不可篡改的时间记录，证明事件发生的顺序。
   
2. **与PoS协同**  
   PoH不决定区块生产者，而是为PoS提供时间框架，由质押的验证者负责区块确认。
   
3. **高效性**  
   通过本地计算替代网络通信，PoH显著提升交易处理速度。

---

## PoH的工作原理

PoH基于SHA-256哈希函数和可验证延迟函数（VDF），其运作流程如下：
- 一个领导节点（Leader）持续运行哈希运算，将前一输出作为下一输入，形成单向的时间序列。
- 交易和事件嵌入此序列，记录其相对时间戳。
- 其他节点验证序列的正确性，因VDF的单向性，无需重新计算即可确认。
- 在Solana中，PoS验证者轮流担任领导者，根据PoH序列打包并确认区块。

此设计将时间同步负担转移至本地计算，极大减少了网络通信开销。

---

## PoH的优缺点

### 优点
- **高吞吐量**：支持数千至数万TPS，适用于大规模应用。
- **低延迟**：区块确认时间短，提升用户体验。
- **可扩展性**：为高性能区块链提供了技术支持。

### 缺点
- **硬件要求**：生成PoH序列需要高性能硬件，可能提高参与门槛。
- **集中化风险**：领导节点的轮换若不平衡，可能削弱去中心化。
- **应用范围有限**：目前主要在Solana中实现，其他项目采用较少。

---

## PoH的历史与愿景

PoH由 **Anatoly Yakovenko** 于2017年首次提出，当时他试图解决分布式系统中时间协调的低效问题。传统共识如PoW依赖算力排序交易，耗能且缓慢；PoS虽降低能耗，仍需频繁通信以同步状态。Yakovenko受到密码学中VDF研究的启发，提出用加密手段生成时间序列，减少节点间依赖。

2018年2月，PoH在《Solana: A new architecture for a high performance blockchain》白皮书中正式亮相，结合PoS和VDF奠定了Solana的技术基础。2019年3月，Solana测试网上线，验证了PoH的可行性。2020年3月16日，Solana主网Beta版启动，PoH投入实际运行。此后，Solana凭借PoH实现的高性能迅速崛起，至2025年已成为公链领域的标杆。

未来，PoH可能在高吞吐量场景（如物联网、金融科技）中获得更多应用，尽管其硬件依赖性仍需优化。

