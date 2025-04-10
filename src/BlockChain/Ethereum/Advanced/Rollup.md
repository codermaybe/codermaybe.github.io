# Rollup

以太坊作为领先的去中心化应用平台，面临着日益增长的用户需求和交易吞吐量瓶颈。为了解决这些问题，Layer-2 扩展方案应运而生，而 **Rollup** 正是其中最具前景的技术之一。它的出现极大的提升了以太坊主链的交易速度，减少了交易频次还降低了 gas 费。但实质以太坊主链的 tps 并没有改变，只是转移到其他的更高处理速度的链进行了交易处理。

**以太坊的扩展性挑战**

以太坊主网（Layer-1）通过所有节点对每笔交易进行验证和执行，保证了高度的安全性与去中心化。然而，这种架构也限制了其交易处理能力（TPS）。随着 DeFi、NFT 等应用的爆发，网络拥堵和高昂的 Gas 费用成为阻碍以太坊大规模采用的关键挑战。

直接提高 Layer-1 TPS 的尝试 (目前已不再侧重)：

虽然直接在 Layer-1 上实现大幅 TPS 提升的分片技术仍在规划中，但目前以太坊提高交易吞吐量的主要策略是通过 Layer-2 Rollup 方案来实现的。

分片 (Sharding): 这是以太坊 2.0 (现为共识层) 愿景中的核心扩容技术。分片旨在将以太坊网络分割成多个称为“分片”的子网络，每个分片可以并行处理交易。理论上，这将极大地提高网络的总吞吐量。然而，由于技术复杂性和 Layer-2 解决方案的快速发展，以太坊社区目前已将重心更多地放在 Layer-2 扩容上，分片技术的实施计划有所调整，可能会以不同的形式逐步引入。

**Layer-2 扩展方案的理念**

Layer-2 扩展方案旨在将交易的执行和数据处理从以太坊主网转移到独立的链上（Layer-2），从而减轻主网的负担，提高整体吞吐量，并降低交易成本。Layer-2 仍然依赖于 Layer-1 的安全性，通过某种机制将交易结果或相关证明锚定回主网。

Rollup 的出现极大的提升了以太坊的交易速度，减少了交易频次。

**Rollup：核心思想与运作方式**

Rollup 的核心思想是将大量的 Layer-2 交易“汇总 (roll up)”成一笔在 Layer-1 上发布的交易。这笔 Layer-1 交易包含证明 Layer-2 交易有效性的必要信息，从而在不牺牲安全性的前提下显著提高吞吐量并降低 Gas 费用。

Rollup 的关键组成部分包括：

- **Layer-2 执行层:** 用户在 Rollup 链上提交和执行交易，这里的 Gas 费用通常远低于主网。
- **定序器 (Sequencer):** 负责接收 Layer-2 交易，将它们排序并打包成批次 (batches)。
- **证明生成器 (Prover):** 根据 Layer-2 的交易执行生成有效性证明。
- **Layer-1 合约 (Rollup Contract):** 部署在以太坊主网上的智能合约，用于存储 Rollup 的状态根、验证有效性证明以及处理提款等操作。
- **数据可用性 (Data Availability):** 确保 Layer-2 交易数据的可访问性，以便在需要时进行验证和重构 Layer-2 的状态。

**Rollup 的两种主要类型**

目前主流的 Rollup 类型主要有两种：

1.  **Optimistic Rollup:**

    - **原理:** Optimistic Rollup 假设 Layer-2 上的交易是有效的，并不主动提交有效性证明到 Layer-1。
    - **欺诈证明 (Fraud Proofs):** 如果有人怀疑 Layer-2 上存在无效交易，可以在 Layer-1 上提交欺诈证明。Layer-1 合约会验证该证明，如果欺诈行为被证实，相关的交易将被回滚，作恶者会受到惩罚。
    - **优势:** 实现相对简单，与 EVM (以太坊虚拟机) 的兼容性通常更好。
    - **劣势:** 由于需要等待潜在的欺诈证明期（通常为几天到一周），提款到 Layer-1 的时间较长。
    - **代表项目:** Arbitrum、Optimism。

2.  **zk-Rollup (Zero-Knowledge Rollup):**
    - **原理:** zk-Rollup 使用零知识证明（通常是 zk-SNARKs 或 zk-STARKs）来生成 Layer-2 交易批次的有效性证明。这个证明会与压缩后的交易数据一起提交到 Layer-1。
    - **有效性证明 (Validity Proofs):** Layer-1 合约只需要验证这个简洁的有效性证明，即可确信 Layer-2 上的交易是有效且正确执行的。
    - **优势:** 一旦 Layer-1 合约验证了有效性证明，提款可以更快地进行，通常只需要 Layer-1 的最终确认时间。安全性更高，因为有效性是通过密码学保证的，而不是依赖于可能不发生的欺诈挑战。
    - **劣势:** 技术实现更复杂，与 EVM 的完全兼容性更具挑战性（尽管这方面正在快速发展）。证明生成计算成本较高。
    - **代表项目:** zkSync、StarkNet、Polygon zkEVM (Hermez)。

**数据可用性 (Data Availability)**

无论是 Optimistic Rollup 还是 zk-Rollup，保证 Layer-2 交易数据的可用性至关重要。如果数据不可用，即使有效性证明存在，也无法重构 Layer-2 的状态，可能导致安全风险。目前主要的数据可用性方案包括：

- **链上数据可用性:** 将压缩后的交易数据直接发布到 Layer-1 的 calldata 中。这是最直接的方式，但会占用 Layer-1 的 Gas 资源。
- **链下数据可用性:** 将交易数据存储在 Layer-2 网络或专门的数据可用性层 (DA Layer) 中，并在 Layer-1 上发布数据的承诺（例如 Merkle 根）。这可以降低 Layer-1 的成本，但也引入了对链下数据存储的信任假设。

**Rollup 在以太坊生态系统中的重要性**

Rollup 被广泛认为是当前扩展以太坊最具潜力的解决方案之一。它们在以下方面发挥着关键作用：

- **提高吞吐量:** 通过将交易执行转移到 Layer-2 并批量处理，Rollup 可以显著提高以太坊网络的整体交易处理能力。
- **降低交易成本:** Layer-2 的 Gas 费用通常远低于 Layer-1，使得更多用户可以参与到以太坊生态中。
- **保持安全性:** Rollup 依赖于 Layer-1 的安全性进行最终的结算和数据锚定。
- **提升用户体验:** 更快的交易速度和更低的费用可以显著改善用户与以太坊应用的交互体验。

Layer-2 Rollup 代表了以太坊扩展道路上的重要一步。Optimistic Rollup 和 zk-Rollup 各有其优势和权衡，适用于不同的应用场景。随着技术的不断成熟和生态系统的发展，Rollup 有望解锁以太坊的巨大潜力，使其能够支持更大规模的用户和更复杂的应用，最终实现其成为全球性去中心化计算平台的愿景。
