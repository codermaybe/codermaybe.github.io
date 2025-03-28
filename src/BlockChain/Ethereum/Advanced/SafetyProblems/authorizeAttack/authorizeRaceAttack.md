# 授权竞争攻击（Approval Race Condition）

[EIP20提案中approve函数声明](https://github.com/ethereum/ercs/blob/master/ERCS/erc-20.md#approve)提过的一种数据攻击。

### 缺陷代码示例

在区块链中，**授权竞争攻击（Approval Race Condition）**是一种与代币授权机制（如ERC-20标准中的`approve`函数）相关的攻击方式。它利用了区块链交易的异步性和用户授权行为的时间差，允许攻击者在用户不知情的情况下窃取代币。这种攻击通常发生在用户与去中心化应用（DApp）或智能合约交互时，尤其是在涉及代币转移的场景中。以下是对授权竞争攻击的详细讲解：

---

### 1. **背景：ERC-20的授权机制**
在ERC-20代币标准中，`approve`函数允许用户授权某个地址（通常是智能合约）代表自己花费一定数量的代币。例如：
- 用户A调用`approve(合约地址, 100)`，授权某个合约从A的账户中转移100个代币。
- 随后，合约可以通过`transferFrom`函数执行实际的代币转移。

这种机制广泛用于DeFi协议、NFT市场等场景。然而，如果用户需要调整授权额度，就会引发潜在的竞争条件问题。

---

### 2. **授权竞争攻击的原理**
授权竞争攻击的核心在于以下步骤：
1. **初始授权**：用户A已经授权了一个攻击者控制的合约（或恶意DApp）一定的代币额度，比如100个代币。
2. **用户调整授权**：用户A发现需要更改授权额度（例如从100减少到50，或增加到200），于是调用`approve`函数发起新交易。
3. **攻击者抢跑**：攻击者监控区块链的内存池（mempool），发现用户A的新`approve`交易尚未确认。攻击者在用户交易确认前，迅速提交一笔`transferFrom`交易，使用旧的授权额度（100个代币）提取代币。
4. **结果**：用户A的新授权交易最终确认，但攻击者已经利用旧授权偷走了代币。

这种攻击利用了区块链交易的**非原子性**（即交易不是瞬间完成，而是需要时间确认）和**公开性**（内存池中的交易对所有人可见）。

---

### 3. **攻击流程示例**
假设用户A的代币余额为200，攻击者控制的合约为`MaliciousContract`：
1. 用户A调用`approve(MaliciousContract, 100)`，授权100个代币。
2. 后来，用户A决定减少授权，调用`approve(MaliciousContract, 50)`，并等待交易确认。
3. 攻击者看到内存池中的`approve(MaliciousContract, 50)`交易，立即调用`transferFrom(A, 攻击者地址, 100)`，使用旧的授权提取100个代币。
4. 用户A的`approve(MaliciousContract, 50)`交易确认，但此时100个代币已被转移，攻击得逞。

---

### 4. **为什么会发生？**
- **授权不是原子操作**：`approve`函数只更新授权额度，而不撤销之前的转移能力。在新授权生效前，旧授权仍然有效。
- **内存池透明**：攻击者可以实时监控未确认交易，并抢先提交自己的交易（通过提高Gas费用实现“抢跑”）。
- **用户行为**：许多用户直接调整授权额度，而不是先将授权设为0再设为新值。

---

### 5. **防范措施**
#### （1）**安全的授权流程**
- 用户在调整授权时，应采用“先清零，再设置新值”的两步操作：
  1. 调用`approve(合约地址, 0)`，等待确认。
  2. 确认后，再调用`approve(合约地址, 新额度)`。
- 这种方法确保旧授权被撤销，消除竞争窗口。
- <mark>注意</mark>`approve(合约地址, 0)`同样<b>无法完全避免攻击者抢跑的问题</b>。交易未确认前，旧授权仍然有效，攻击者可以抢先调用transferFrom。
它仅能保证新授权顺利执行：一旦清零交易确认，旧授权被撤销，新授权可以在安全状态下生效。
新授权后再次被转走的风险：取决于后续操作和合约的可信度。如果用户授权给了恶意合约，新授权的代币仍可能被转走，但这属于另一类问题（非竞争攻击）。

#### （2）**使用`increaseAllowance`和`decreaseAllowance`**
- ERC-20扩展函数`increaseAllowance`和`decreaseAllowance`允许用户增量调整授权，而无需直接覆盖旧值。
- 例如：`increaseAllowance(合约地址, 50)`增加50个代币的授权，而不是直接调用`approve`。
- 实现示例如USDC，可以查看本博客源码解析篇<mark>FiatTokenV2_2</mark>

#### （3）**合约端的保护**
- 智能合约开发者可以在`transferFrom`中添加检查，确保调用时的授权额度与预期一致，避免滥用旧授权。
- 使用一次性授权（Nonce）或时间锁，限制授权的有效期。

#### （4）**用户教育**
- 提醒用户谨慎授权，尤其是对未知合约，避免直接调整授权额度。
- 使用支持“撤销授权”的钱包（如MetaMask），定期检查并清理不必要的授权。

#### （5）**Gas竞争应对**
- 用户可以提高Gas费用，确保自己的`approve`交易尽快确认，减少攻击者的抢跑机会。

---

### 6. **实际案例**
- **Uniswap早期问题**：早期版本的Uniswap用户在调整流动性池授权时，偶尔会遇到类似问题，导致代币被恶意合约窃取。
- **DeFi协议漏洞**：一些小型DeFi项目因未提醒用户安全授权流程，遭受过授权竞争攻击。

---

### 7. **改进建议与新标准**
为了彻底解决这个问题，一些新代币标准（如ERC-777、ERC-1155）尝试改进授权机制：
- **ERC-777**：引入`operator`机制和回调函数，允许更灵活的授权管理。
- **Permit函数**（EIP-2612）：允许用户通过签名离线授权，避免直接调用`approve`，从而减少链上竞争风险。

