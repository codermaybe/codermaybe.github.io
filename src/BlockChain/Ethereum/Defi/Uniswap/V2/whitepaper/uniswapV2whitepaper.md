个人针对 uniswapv2 白皮书精对翻译，附加个人理解部分。

whitepaper 原 pdf 经过 minerU 转换

[uniswapv2-whitepaper](https://docs.uniswap.org/whitepaper.pdf)

---

# Uniswap v2 Core

<table>
<tr>
<td>Hayden Adams </td>
<td> Noah Zinsmeister </td>
<td> Dan Robinson</td>
</tr>
<tr>
<td>hayden@uniswap.org</td>
<td> noah@uniswap.org</td>
<td> dan@paradigm.xyz</td>
</tr>
</table>
March 2020

---

Abstract

This technical whitepaper explains some of the design decisions behind the Uniswap v2 core contracts. It covers the contracts' new features—including arbitrary pairs between ERC20s, a hardened price oracle that allows other contracts to estimate the time-weighted average price over a given interval, "flash swaps" that allow traders to receive assets and use them elsewhere before paying for them later in the transaction, and a protocol fee that can be turned on in the future. It also re-architects the contracts to reduce their attack surface. This whitepaper describes the mechanics of Uniswap v2's "core" contracts including the pair contract that stores liquidity providers' funds—and the factory contract used to instantiate pair contracts.

摘要

本技术白皮书解释了 Uniswap v2 核心合约背后的一些设计决策。它涵盖了合约的新特性——包括任意 ERC20 代币对、一个强化的价格预言机（允许其他合约估计给定时间间隔内的时间加权平均价格）、"闪电兑换"（允许交易者在同一笔交易中先接收资产并在其他地方使用，然后再支付）、以及未来可以开启的协议费用。它还对合约进行了重新架构，以减少合约受攻击面。本白皮书描述了 Uniswap v2"核心"合约的机制，包括存储流动性提供者资金的交易对合约，以及用于实例化交易对合约的工厂合约。

## 1 Introduction (介绍)

Uniswap v1 is an on-chain system of smart contracts on the Ethereum blockchain, implementing an automated liquidity protocol based on a "constant product formula" [1](#ref-1). Each Uniswap v1 pair stores pooled reserves of two assets, and provides liquidity for those two assets, maintaining the invariant that the product of the reserves cannot decrease. Traders pay a 30-basis-point fee on trades, which goes to liquidity providers. The contracts are non-upgradeable.

Uniswap v1 是以太坊区块链上的一套链上智能合约系统，它基于"恒定乘积公式"[1](#ref-1) 实现了一种自动化的流动性协议。每个 Uniswap v1 交易对都存储着两种资产的汇集储备，并为这两种资产提供流动性，维持储备金乘积不能减少的不变性。交易者在交易时支付 30 个基点的费用，这笔费用会分配给流动性提供者。这些合约是不可升级的。

Uniswap v2 is a new implementation based on the same formula, with several new highlydesirable features. Most significantly, it enables the creation of arbitrary ERC20/ERC20 pairs, rather than supporting only pairs between ERC20 and ETH. It also provides a hardened price oracle that accumulates the relative price of the two assets at the beginning of each block. This allows other contracts on Ethereum to estimate the time-weighted average price for the two assets over arbitrary intervals. Finally, it enables "flash swaps" where users can receive assets freely and use them elsewhere on the chain, only paying for (or returning) those assets at the end of the transaction.

Uniswap v2 是基于相同公式的新实现，具有几个非常理想的新特性。最重要的是，它能够创建任意 ERC20/ERC20 交易对，而不仅仅是支持 ERC20 和 ETH 之间的交易对。它还提供了一个强化的价格预言机，该预言机在每个区块的开始累积两种资产的相对价格。这使得以太坊上的其他合约能够估算任意时间间隔内这两种资产的时间加权平均价格。最后，它启用了"闪电兑换"，用户可以免费接收资产并在链上的其他地方使用它们，只需在交易结束时支付（或归还）这些资产。

While the contract is not generally upgradeable, there is a private key that has the ability to update a variable on the factory contract to turn on an on-chain 5-basis-point fee on trades. This fee will initially be turned off, but could be turned on in the future, after which liquidity providers would earn 25 basis points on every trade, rather than 30 basis points.

虽然该合约通常是不可升级的，但存在一个私钥，该私钥能够更新工厂合约上的一个变量以开启收取链上 5 个基点的交易费用。此费用最初将处于关闭状态，但未来可能会开启，之后流动性提供者将在每笔交易中赚取 25 个基点，而不是 30 个基点。

As discussed in section 3, Uniswap v2 also fixes some minor issues with Uniswap v1, as well as rearchitecting the implementation, reducing Uniswap's attack surface and making the system more easily upgradeable by minimizing the logic in the "core" contract that holds liquidity providers' funds.

正如第 3 节所讨论的，Uniswap v2 还修复了 Uniswap v1 的一些小问题，并重新设计了架构实现，从而减少了 Uniswap 的受攻击面，并通过最小化存储流动性提供者资金的"核心"合约中的逻辑，使系统更容易升级。

This paper describes the mechanics of that core contract, as well as the factory contract used to instantiate those contracts. Actually using Uniswap v2 will require calling the pair contract through a "router" contract that computes the trade or deposit amount and transfers funds to the pair contract.

本文描述了该核心合约以及用于实例化这些合约的工厂合约的机制。实际上使用 Uniswap v2 需要通过一个"路由器"合约来调用交易对合约，该路由器合约计算交易或存款金额并将资金转移到交易对合约。

## 2 New features （新特性）

### 2.1 ERC-20 pairs （ERC-20 币对）

Uniswap v1 used ETH as a bridge currency. Every pair included ETH as one of its assets. This makes routing simpler—every trade between ABC and XYZ goes through the ETH/ABC pair and the ETH/XYZ pair—and reduces fragmentation of liquidity.

Uniswap v1 使用 ETH 作为桥接货币。每个交易对都包含 ETH 作为其资产之一。这使得路由更简单——ABC 和 XYZ 之间的每笔交易都通过 ETH/ABC 交易对和 ETH/XYZ 交易对进行——并减少了流动性的分散。

However, this rule imposes significant costs on liquidity providers. All liquidity providers have exposure to ETH, and suffer impermanent loss based on changes in the prices of other assets relative to ETH. When two assets ABC and XYZ are correlated—for example, if they are both USD stablecoins—liquidity providers on a Uniswap pair ABC/XYZ would generally be subject to less impermanent loss than the ABC/ETH or XYZ/ETH pairs.

然而，这条规则给流动性提供者带来了显著的成本。所有流动性提供者都暴露于 ETH 的风险之下，并会因其他资产相对于 ETH 的价格变动而遭受无常损失。当两种资产 ABC 和 XYZ 相关联时——例如，如果它们都是美元稳定币——与 ABC/ETH 或 XYZ/ETH 交易对相比，Uniswap 上 ABC/XYZ 交易对的流动性提供者通常会遭受更少的无常损失。

Using ETH as a mandatory bridge currency also imposes costs on traders. Traders have to pay twice as much in fees as they would on a direct ABC/XYZ pair, and they suffer slippage twice.

使用 ETH 作为强制性的桥接货币也给交易者带来了成本。与直接的 ABC/XYZ 交易对相比，交易者需要支付双倍的费用，并且遭受双倍的滑点。

Uniswap v2 allows liquidity providers to create pair contracts for any two ERC-20s.

Uniswap v2 允许流动性提供者为任意两种 ERC-20 代币创建交易对合约。

A proliferation of pairs between arbitrary ERC-20s could make it somewhat more difficult to find the best path to trade a particular pair, but routing can be handled at a higher layer (either off-chain or through an on-chain router or aggregator).

任意 ERC-20 代币之间大量交易对的出现可能会使得寻找特定交易对的最佳交易路径变得更加困难，但路由可以在更高的层级处理（无论是链下还是通过链上路由器或聚合器）。

### 2.2 Price oracle (价格预言机)

The marginal price offered by Uniswap (not including fees) at time \\(t\\) can be computed by dividing the reserves of asset \\(a\\) by the reserves of asset \\(b\\) .

在时间 \\(t\\)，Uniswap 提供的边际价格（不包括费用）可以通过将资产 \\(a\\) 的储备量除以资产 \\(b\\) 的储备量来计算。

$$
p_t = \frac{r_t^a}{r_t^b}
$$

Since arbitrageurs will trade with Uniswap if this price is incorrect (by a sufficient amount to make up for the fee), the price offered by Uniswap tends to track the relative market price of the assets, as shown by Angeris et al [2](#ref-2). This means it can be used as an approximate price oracle.

由于套利者会在 Uniswap 提供的价格不正确（达到足以弥补费用的程度）时与 Uniswap 进行交易，因此 Uniswap 提供的价格往往会跟踪资产的相对市场价格，正如 Angeris et al [2](#ref-2) 所展示的那样。这意味着它可以被用作一个近似的价格预言机。

However, Uniswap v1 is not safe to use as an on-chain price oracle, because it is very easy to manipulate. Suppose some other contract uses the current ETH-DAI price to settle a derivative. An attacker who wishes to manipulate the measured price can buy ETH from the ETH-DAI pair, trigger settlement on the derivative contract (causing it to settle based on the inflated price), and then sell ETH back to the pair to trade it back to the true price.[^1] This might even be done as an atomic transaction, or by a miner who controls the ordering of transactions within a block.

然而，Uniswap v1 作为链上价格预言机并不安全，因为它非常容易被操纵。假设某个其他合约使用当前的 ETH-DAI 价格来结算衍生品。一个希望操纵衡量价格的攻击者可以从 ETH-DAI 交易对中购买 ETH，触发衍生品合约的结算（导致其基于膨胀的价格结算），然后将 ETH 卖回该交易对以将其价格恢复到真实水平。[^1]这甚至可以作为原子交易完成，或者由控制区块内交易顺序的矿工完成。

Uniswap v2 improves this oracle functionality by measuring and recording the price before the first trade of each block (or equivalently, after the last trade of the previous block). This price is more difficult to manipulate than prices during a block. If the attacker submits a transaction that attempts to manipulate the price at the end of a block, some other arbitrageur may be able to submit another transaction to trade back immediately afterward in the same block. A miner (or an attacker who uses enough gas to fill an entire block) could manipulate the price at the end of a block, but unless they mine the next block as well, they may not have a particular advantage in arbitraging the trade back.

Uniswap v2 通过在每个区块的第一笔交易之前（或等效地，在上一个区块的最后一笔交易之后）测量和记录价格来改进此预言机功能。与区块内的价格相比，此价格更难被操纵。如果攻击者提交一笔试图在区块末尾操纵价格的交易，一些其他的套利者可能会立即在同一区块内提交另一笔交易以恢复价格。矿工（或使用足够 Gas 来填满整个区块的攻击者）可以在区块末尾操纵价格，但除非他们也挖掘下一个区块，否则他们在套利交易以恢复价格方面可能没有特别的优势。

Specifically, Uniswap v2 accumulates this price, by keeping track of the cumulative sum of prices at the beginning of each block in which someone interacts with the contract. Each price is weighted by the amount of time that has passed since the last block in which it was updated, according to the block timestamp.[^2] This means that the accumulator value at any given time (after being updated) should be the sum of the spot price at each second in the history of the contract.

具体来说，Uniswap v2 通过追踪每个有人与合约交互的区块开始时的累积价格总和来累积这个价格。每个价格都根据自上次更新的区块以来经过的时间（根据区块时间戳）进行加权[^2]。这意味着在任何给定时间（更新后），累积器的值应该是合约历史上每秒钟现货价格的总和。

$$
a_t = \sum_{i=1}^{t} p_i
$$

To estimate the time-weighted average price from time \\(t_1\\) to \\(t_2\\), an external caller can checkpoint the accumulator's value at \\(t_1\\) and then again at \\(t_2\\), subtract the first value from the second, and divide by the number of seconds elapsed. (Note that the contract itself does not store historical values for this accumulator—the caller has to call the contract at the beginning of the period to read and store this value.)

要估计从时间 \\(t_1\\) to \\(t_2\\) 的时间加权平均价格，外部调用者可以在\\(t_1\\) 时刻检查累加器的值，然后在\\(t_2\\)时刻再次检查，将第一个值从第二个值中减去，然后除以经过的秒数。（请注意，合约本身不存储此累加器的历史值——调用者必须在期间开始时调用合约以读取和存储此值。）

$$
p_{t_1,t_2} = \frac{\sum_{i=t_1}^{t_2} p_i}{t_2 - t_1} = \frac{\sum_{i=1}^{t_2} p_i - \sum_{i=1}^{t_1} p_i}{t_2 - t_1} = \frac{a_{t_2} - a_{t_1}}{t_2 - t_1}
$$

Users of the oracle can choose when to start and end this period. Choosing a longer period makes it more expensive for an attacker to manipulate the TWAP, although it results in a less up-to-date price.

预言机的用户可以选择时间范围的起始位置和结束位置。选择较长的时间区间会增加攻击者操纵 TWAP 的成本，尽管这会导致用户获取到不太实时的价格。

One complication: should we measure the price of asset A in terms of asset B, or the price of asset B in terms of asset A? While the spot price of A in terms of B is always the reciprocal of the spot price of B in terms of A, the mean price of asset A in terms of asset B over a particular period of time is not equal to the reciprocal of the mean price of asset B in terms of asset A.[^3] For example, if the USD/ETH price is 100 in block 1 and 300 in block 2, the average USD/ETH price will be 200 USD/ETH, but the average ETH/USD price will be 1/150 ETH/USD. Since the contract cannot know which of the two assets users would want to use as the unit of account, Uniswap v2 tracks both prices.

一个复杂的问题是：我们应该衡量资产 A 相对于资产 B 的价格，还是资产 B 相对于资产 A 的价格？虽然 A 相对于 B 的即时价格始终是 B 相对于 A 的即时价格的倒数，但在特定时间段内，资产 A 相对于资产 B 的平均价格不等于资产 B 相对于资产 A 的平均价格的倒数[^3]。例如，如果 USD/ETH 的价格在区块 1 中是 100，在区块 2 中是 300，那么平均 USD/ETH 价格将是 200 USD/ETH，但平均 ETH/USD 价格将是 1/150 ETH/USD。由于合约无法知道用户希望将两种资产中的哪一种用作记账单位，因此 Uniswap v2 会跟踪两种价格。

Another complication is that it is possible for someone to send assets to the pair contract—and thus change its balances and marginal price—without interacting with it, and thus without triggering an oracle update. If the contract simply checked its own balances and updated the oracle based on the current price, an attacker could manipulate the oracle by sending an asset to the contract immediately before calling it for the first time in a block. If the last trade was in a block whose timestamp was X seconds ago, the contract would incorrectly multiply the new price by X before accumulating it, even though nobody has had an opportunity to trade at that price. To prevent this, the core contract caches its reserves after each interaction, and updates the oracle using the price derived from the cached reserves rather than the current reserves. In addition to protecting the oracle from manipulation, this change enables the contract re-architecture described below in section 3.2.

另一个复杂的问题是，有人可能在不与交易对合约交互的情况下向此交易对合约发送资产，从而改变其余额和边际价格（因此也不会触发预言机更新）。如果合约只是检查自身的余额并根据当前价格更新预言机，攻击者可以通过在一个区块中首次调用合约之前立即向合约发送资产来操纵预言机。如果上次交易发生在 X 秒前的区块中，即使没有人有机会以该价格进行交易，合约也会错误地将新价格乘以 X 然后累积它。为了防止这种情况，核心合约在每次交互后缓存其资产储备值，并使用从缓存的储备而不是当前储备中得出的价格更新预言机。除了保护预言机免受操纵外，此更改还实现了下文 3.2 节中描述的合约重新架构。

### 2.2.1 Precision （精度）

Because Solidity does not have first-class support for non-integer numeric data types, the Uniswap v2 uses a simple binary fixed point format to encode and manipulate prices. Specifically, prices at a given moment are stored as UQ112.112 numbers, meaning that 112 fractional bits of precision are specified on either side of the decimal point, with no sign. These numbers have a range of \\([0,2^{112}-1]\\)[^4] and a precision of \\(\frac{1}{2^{112}}\\).

由于 Solidity 本身不支持非整数数值数据类型，Uniswap v2 使用一种简单的二进制定点格式来编码和操作价格。具体来说，某一时刻的价格存储为 UQ112.112 格式的数字，这意味着在小数点两侧都指定了 112 位的小数精度，并且没有符号。这些数字的范围是 \\([0,2^{112}-1]\\)[^4]，精度为 \\(\frac{1}{2^{112}}\\).
​

The UQ112.112 format was chosen for a pragmatic reason — because these numbers can be stored in a uint224, this leaves 32 bits of a 256 bit storage slot free. It also happens that the reserves, each stored in a uint112, also leave 32 bits free in a (packed) 256 bit storage slot. These free spaces are used for the accumulation process described above. Specifically, the reserves are stored alongside the timestamp of the most recent block with at least one trade, modded with \\(2^{32}\\) so that it fits into 32 bits. Additionally, although the price at any given moment (stored as a UQ112.112 number) is guaranteed to fit in 224 bits, the accumulation of this price over an interval is not. The extra 32 bits on the end of the storage slots for the accumulated price of A/B and B/A are used to store overflow bits resulting from repeated summations of prices. This design means that the price oracle only adds an additional three SSTORE operations (a current cost of about 15,000 gas) to the first trade in each block.

选择 UQ112.112 格式是出于务实的考虑——因为这些数字可以存储在 uint224 中，这使得一个 256 位的存储槽空闲了 32 位。碰巧的是，储备金（每个都存储在 uint112 中）也在一个（紧凑的）256 位存储槽中留出了 32 位空闲空间。这些空闲空间用于上述的累积过程。具体来说，储备金与最近一次至少发生一笔交易的区块的时间戳一起存储，该时间戳会进行模 \\(2^{32}\\)运算，以截取此时间戳的末尾 32 位。此外，虽然任何给定时刻的价格（存储为 UQ112.112 数字）保证可以容纳在 224 位中，但该价格在一段时间内的累积却不能。存储槽末尾用于存储 A/B 和 B/A 累积价格的额外 32 位用于存储重复的价格求和产生的溢出位。这种设计意味着价格预言机在每个区块的第一笔交易中仅额外增加三个 SSTORE 操作（目前成本约为 15,000 gas）。

The primary downside is that 32 bits isn't quite enough to store timestamp values that will reasonably never overflow. In fact, the date when the Unix timestamp overflows a uint32 is 02/07/2106. To ensure that this system continues to function properly after this date, and every multiple of \\(2^{32}-1\\) seconds thereafter, oracles are simply required to check prices at least once per interval (approximately 136 years). This is because the core method of accumulation (and modding of timestamp), is actually overflow-safe, meaning that trades across overflow intervals can be appropriately accounted for given that oracles are using the proper (simple) overflow arithmetic to compute deltas.

主要的缺点是 32 位不足以存储合理范围内永远不会溢出的时间戳值。事实上，Unix 时间戳溢出 uint32 的日期是 2106 年 2 月 7 日。为了确保该系统在此日期之后以及此后每隔 \\(2^{32}-1\\)秒的倍数都能正常运行，预言机只需要至少每隔一段时间（大约 136 年）检查一次价格即可。这是因为累积（以及时间戳的模运算）的核心方法实际上是溢出安全的，这意味着只要预言机使用正确的（简单的）溢出算术来计算增量，就可以适当地计算跨越溢出间隔的交易。

## 2.3 Flash Swaps （闪电互换）

In Uniswap v1, a user purchasing ABC with XYZ needs to send the XYZ to the contract before they could receive the ABC. This is inconvenient if that user needs the ABC they are buying in order to obtain the XYZ they are paying with. For example, the user might be using that ABC to purchase XYZ in some other contract in order to arbitrage a price difference from Uniswap, or they could be unwinding a position on Maker or Compound by selling the collateral to repay Uniswap.

在 Uniswap v1 中，用户用 XYZ 购买 ABC 需要先将 XYZ 发送到合约，然后才能收到 ABC。如果用户需要他们购买的 ABC 来获得他们用于支付的 XYZ，这会很不方便。例如，用户可能正在使用该 ABC 在某个其他合约中购买 XYZ，以赚取此合约与 Uniswap 的差价，或者他们可以通过出售抵押品来偿还 Uniswap 来平仓 Maker 或 Compound 的头寸。

> 头寸: 投资者拥有或借用的资金数量

Uniswap v2 adds a new feature that allows a user to receive and use an asset before paying for it, as long as they make the payment within the same atomic transaction. The swap function makes a call to an optional user-specified callback contract in between transferring out the tokens requested by the user and enforcing the invariant. Once the callback is complete, the contract checks the new balances and confirms that the invariant is satisfied (after adjusting for fees on the amounts paid in). If the contract does not have sufficient funds, it reverts the entire transaction.

Uniswap v2 增加了一项新功能，允许用户在付款之前接收和使用资产，只要他们在同一个原子交易中完成付款即可。swap 函数在转出用户请求的代币和强制执行不变量之间，调用一个可选的用户指定的回调合约。回调完成后，合约检查新的余额，并确认不变量得到满足（在根据支付金额调整费用后）。如果合约没有足够的资金，它将回滚整个交易。

A user can also repay the Uniswap pool using the same token, rather than completing the swap. This is effectively the same as letting anyone flash-borrow any of assets stored in a Uniswap pool (for the same \\(0.30\\%\\) fee as Uniswap charges for trading).[^5]

用户也可以使用相同的代币偿还 Uniswap 池，而不是完成兑换。这实际上等同于允许任何人闪电借用存储在 Uniswap 池中的任何资产（费用与 Uniswap 收取的交易费用相同，为 0.30%）[^5]。

## 2.4 Protocol fee

Uniswap v2 includes a \\(0.05\\%\\) protocol fee that can be turned on and off. If turned on, this fee would be sent to a feeTo address specified in the factory contract.

Initially, feeTo is not set, and no fee is collected. A pre-specified address—feeToSetter—can call the setFeeTo function on the Uniswap v2 factory contract, setting feeTo to a different value. feeToSetter can also call the setFeeToSetter to change the feeToSetter address itself.

If the feeTo address is set, the protocol will begin charging a 5-basis-point fee, which is taken as a \\(\frac{1}{6}\\) cut of the 30-basis-point fees earned by liquidity providers. That is, traders will continue to pay a \\(0.30\\%\\) fee on all trades; \\(83.\overline{3}\\%\\) of that fee ( \\(0.25\\%\\) of the amount traded) will go to liquidity providers, and \\(16.\overline{6}\\%\\) of that fee ( \\(0.05\\%\\) of the amount traded) will go to the feeTo address.

Collecting this \\(0.05\\%\\) fee at the time of the trade would impose an additional gas cost on every trade. To avoid this, accumulated fees are collected only when liquidity is deposited or withdrawn. The contract computes the accumulated fees, and mints new liquidity tokens to the fee beneficiary, immediately before any tokens are minted or burned.

The total collected fees can be computed by measuring the growth in \\(\sqrt{k}\\) (that is, \\(\sqrt{x \cdot y}\\)) since the last time fees were collected.[^6] This formula gives you the accumulated fees between \\(t_1\\) and \\(t_2\\) as a percentage of the liquidity in the pool at \\(t_2\\):

$$
f_{1,2} = 1 - \frac{\sqrt{k_1}}{\sqrt{k_2}}
$$

If the fee was activated before \\(t*1\\), the feeTo address should capture \\(\frac{1}{6}\\) of fees that were accumulated between \\(t_1\\) and \\(t_2\\). Therefore, we want to mint new liquidity tokens to the feeTo address that represent \\( \phi \cdot f*{1,2} \\) of the pool, where \\(\phi\\) is \\(\frac{1}{6}\\).

That is, we want to choose \\(s_m\\) to satisfy the following relationship, where \\(s_1\\) is the total quantity of outstanding shares at time \\(t_1\\):

$$
\frac{s_m}{s_m + s_1} = \phi \cdot f_{1,2}
$$

After some manipulation, including substituting \\(1 - \frac{\sqrt{k*1}}{\sqrt{k_2}}\\) for \\(f*{1,2}\\) and solving for \\(s_m\\), we can rewrite this as:

$$
s_m = \frac{\sqrt{k_2} - \sqrt{k_1}}{(\frac{1}{\phi} - 1) \cdot \sqrt{k_2} + \sqrt{k_1}} \cdot s_1
$$

Setting \\(\phi\\) to \\(\frac{1}{6}\\) gives us the following formula:

$$
s_m = \frac{\sqrt{k_2} - \sqrt{k_1}}{5 \cdot \sqrt{k_2} + \sqrt{k_1}} \cdot s_1
$$

Suppose the initial depositor puts 100 DAI and 1 ETH into a pair, receiving 10 shares. Some time later (without any other depositor having participated in that pair), they attempt to withdraw it, at a time when the pair has 96 DAI and 1.5 ETH. Plugging those values into the above formula gives us the following:

$$
s_m = \frac{\sqrt{1.5 \cdot 96} - \sqrt{1 \cdot 100}}{5 \cdot \sqrt{1.5 \cdot 96} + \sqrt{1 \cdot 100}} \cdot 10 \approx 0.0286
$$

## 2.5 Meta transactions for pool shares

Pool shares minted by Uniswap v2 pairs natively support meta transactions. This means users can authorize a transfer of their pool shares with a signature[^7], rather than an on-chain transaction from their address. Anyone can submit this signature on the user's behalf by calling the permit function, paying gas fees and possibly performing other actions in the same transaction.

# 3 Other changes

## 3.1 Solidity

Uniswap v1 is implemented in Vyper, a Python-like smart contract language. Uniswap v2 is implemented in the more widely-used Solidity, since it requires some capabilities that were not yet available in Vyper (such as the ability to interpret the return values of non-standard ERC-20 tokens, as well as access to new opcodes such as chainid via inline assembly) at the time it was being developed.

## 3.2 Contract re-architecture

One design priority for Uniswap v2 is to minimize the surface area and complexity of the core pair contract—the contract that stores liquidity providers' assets. Any bugs in this contract could be disastrous, since millions of dollars of liquidity might be stolen or frozen.

When evaluating the security of this core contract, the most important question is whether it protects liquidity providers from having their assets stolen or locked. Any feature that is meant to support or protect traders—other than the basic functionality of allowing one asset in the pool to be swapped for another—can be handled in a "router" contract.

In fact, even part of the swap functionality can be pulled out into the router contract. As mentioned above, Uniswap v2 stores the last recorded balance of each asset (in order to prevent a particular manipulative exploit of the oracle mechanism). The new architecture takes advantage of this to further simplify the Uniswap v1 contract.

In Uniswap v2, the seller sends the asset to the core contract before calling the swap function. Then, the contract measures how much of the asset it has received, by comparing the last recorded balance to its current balance. This means the core contract is agnostic to the way in which the trader transfers the asset. Instead of transferFrom, it could be a meta transaction, or any other future mechanism for authorizing the transfer of ERC-20s.

### 3.2.1 Adjustment for fee

Uniswap v1's trading fee is applied by reducing the amount paid into the contract by \\(0.3\\%\\) before enforcing the constant-product invariant. The contract implicitly enforces the following formula:

$$
(x_1 - 0.003 \cdot x_{in}) \cdot y_1 \geq x_0 \cdot y_0
$$

With flash swaps, Uniswap v2 introduces the possibility that \\(x*{in}\\) and \\(y*{in}\\) might both be non-zero (when a user wants to pay the pair back using the same asset, rather than swapping). To handle such cases while properly applying fees, the contract is written to enforce the following invariant[^8]:

$$
(x_1 - 0.003 \cdot x_{in}) \cdot (y_1 - 0.003 \cdot y_{in}) \geq x_0 \cdot y_0
$$

To simplify this calculation on-chain, we can multiply each side of the inequality by 1,000,000:

$$
(1000 \cdot x_1 - 3 \cdot x_{in}) \cdot (1000 \cdot y_1 - 3 \cdot y_{in}) \geq 1000000 \cdot x_0 \cdot y_0
$$

### 3.2.2 sync() and skim()

To protect against bespoke token implementations that can update the pair contract's balance, and to more gracefully handle tokens whose total supply can be greater than \\(2^{112}\\), Uniswap v2 has two bail-out functions: sync() and skim().

sync() functions as a recovery mechanism in the case that a token asynchronously deflates the balance of a pair. In this case, trades will receive sub-optimal rates, and if no liquidity provider is willing to rectify the situation, the pair is stuck. sync() exists to set the reserves of the contract to the current balances, providing a somewhat graceful recovery from this situation.

skim() functions as a recovery mechanism in case enough tokens are sent to an pair to overflow the two uint112 storage slots for reserves, which could otherwise cause trades to fail. skim() allows a user to withdraw the difference between the current balance of the pair and \\(2^{112}-1\\) to the caller, if that difference is greater than 0.

## 3.3 Handling non-standard and unusual tokens

The ERC-20 standard requires that transfer() and transferFrom() return a boolean indicating the success or failure of the call [4]. The implementations of one or both of these functions on some tokens—including popular ones like Tether (USDT) and Binance Coin (BNB)—instead have no return value. Uniswap v1 interprets the missing return value of these improperly defined functions as false—that is, as an indication that the transfer was not successful—and reverts the transaction, causing the attempted transfer to fail.

Uniswap v2 handles non-standard implementations differently. Specifically, if a transfer() call[^9] has no return value, Uniswap v2 interprets it as a success rather than as a failure. This change should not affect any ERC-20 tokens that conform to the standard (because in those tokens, transfer() always has a return value).

Uniswap v1 also makes the assumption that calls to transfer() and transferFrom() cannot trigger a reentrant call to the Uniswap pair contract. This assumption is violated by certain ERC-20 tokens, including ones that support ERC-777's "hooks" [^5]. To fully support such tokens, Uniswap v2 includes a "lock" that directly prevents reentrancy to all public state-changing functions. This also protects against reentrancy from the user-specified callback in a flash swap, as described in section 2.3.

## 3.4 Initialization of liquidity token supply

When a new liquidity provider deposits tokens into an existing Uniswap pair, the number of liquidity tokens minted is computed based on the existing quantity of tokens:

$$
s_{minted} = \frac{x_{deposited}}{x_{starting}} \cdot s_{starting}
$$

But what if they are the first depositor? In that case, \\(x\_{starting}\\) is \\(0\\), so this formula will not work.

Uniswap v1 sets the initial share supply to be equal to the amount of ETH deposited (in wei). This was a somewhat reasonable value, because if the initial liquidity was deposited at the correct price, then 1 liquidity pool share (which, like ETH, is an 18-decimal token) would be worth approximately 2 ETH.

However, this meant that the value of a liquidity pool share was dependent on the ratio at which liquidity was initially deposited, which was fairly arbitrary, especially since there was no guarantee that that ratio reflected the true price. Additionally, Uniswap v2 supports arbitrary pairs, so many pairs will not include ETH at all.

Instead, Uniswap v2 initially mints shares equal to the geometric mean of the amounts deposited:

$$
s_{minted} = \sqrt{x_{deposited} \cdot y_{deposited}}
$$

This formula ensures that the value of a liquidity pool share at any time is essentially independent of the ratio at which liquidity was initially deposited. For example, suppose that the price of 1 ABC is currently 100 XYZ. If the initial deposit had been 2 ABC and 200 XYZ (a ratio of 1:100), the depositor would have received \\(\sqrt{2 \cdot 200} = 20\\) shares. Those shares should now still be worth 2 ABC and 200 XYZ, plus accumulated fees.

If the initial deposit had been 2 ABC and 800 XYZ (a ratio of 1:400), the depositor would have received \\(\sqrt{2 \cdot 800} = 40\\) pool shares.[^10]

The above formula ensures that a liquidity pool share will never be worth less than the geometric mean of the reserves in that pool. However, it is possible for the value of a liquidity pool share to grow over time, either by accumulating trading fees or through "donations" to the liquidity pool. In theory, this could result in a situation where the value of the minimum quantity of liquidity pool shares (1e-18 pool shares) is worth so much that it becomes infeasible for small liquidity providers to provide any liquidity.

To mitigate this, Uniswap v2 burns the first 1e-15 (0.000000000000001) pool shares that are minted (1000 times the minimum quantity of pool shares), sending them to the zero address instead of to the minter. This should be a negligible cost for almost any token pair.[^11] But it dramatically increases the cost of the above attack. In order to raise the value of a liquidity pool share to \\(\$100\\), the attacker would need to donate \$100,000 to the pool, which would be permanently locked up as liquidity.

## 3.5 Wrapping ETH

The interface for transacting with Ethereum's native asset, ETH, is different from the standard interface for interacting with ERC-20 tokens. As a result, many other protocols on Ethereum do not support ETH, instead using a canonical "wrapped ETH" token, WETH [^6].

Uniswap v1 is an exception. Since every Uniswap v1 pair included ETH as one asset, it made sense to handle ETH directly, which was slightly more gas-efficient.

Since Uniswap v2 supports arbitrary ERC-20 pairs, it now no longer makes sense to support unwrapped ETH. Adding such support would double the size of the core codebase, and risks fragmentation of liquidity between ETH and WETH pairs[^12]. Native ETH needs to be wrapped into WETH before it can be traded on Uniswap v2.

## 3.6 Deterministic pair addresses

As in Uniswap v1, all Uniswap v2 pair contracts are instantiated by a single factory contract. In Uniswap v1, these pair contracts were created using the CREATE opcode, which meant that the address of such a contract depended on the order in which that pair was created. Uniswap v2 uses Ethereum's new CREATE2 opcode [^8] to generate a pair contract with a deterministic address. This means that it is possible to calculate a pair's address (if it exists) off-chain, without having to look at the chain state.

## 3.7 Maximum token balance

In order to efficiently implement the oracle mechanism, Uniswap v2 only support reserve balances of up to \\(2^{112}-1\\). This number is high enough to support 18-decimal-place tokens with a totalSupply over 1 quadrillion.

If either reserve balance does go above \\(2^{112}-1\\), any call to the swap function will begin to fail (due to a check in the \_update() function). To recover from this situation, any user can call the skim() function to remove excess assets from the liquidity pool.

[^1]:
    For a real-world example of how using Uniswap v1 as an oracle can make a contract vulnerable to such
    an attack, see [^3].对于现实世界中使用 uniswap v1 作为预言机能让合约本身易受到攻击的例子，可见[^3]

[^2]:
    Since miners have some freedom to set the block timestamp, users of the oracle should be aware that
    these values may not correspond precisely to real-world times.由于矿工本身对于设置区块时间戳有一定的自由度，使用预言机的用户应该清楚获取到的时间戳不一定精准地与现实世界同步。

[^3]:
    The arithmetic mean price of asset A in terms of asset B over a given period is equal to the reciprocal
    of the harmonic mean price of asset B in terms of asset A over that period. If the contract measured the
    geometric mean price, then the prices would be the reciprocals of each other. However, the geometric mean
    TWAP is less commonly used, and is difficult to compute on Ethereum.

[^4]:
    The theoretical upper bound of \\(2^{112} - (1/2^{112})\\) does not apply in this setting, as UQ112.112 numbers in
    Uniswap are always generated from the ratio of two uint112s. The largest such ratio is \\(\frac{2^{112}-1}{1} = 2^{112}-1\\)

[^5]:
    Because Uniswap charges fees on input amounts, the fee relative to the withdrawn amount is actually
    slightly higher: \\(\frac{1}{1-0.003} - 1 = \frac{3}{997} \approx 0.3009203\%\\)

[^6]:
    We can use this invariant, which does not account for liquidity tokens that were minted or burned,
    because we know that fees are collected every time liquidity is deposited or withdrawn.

[^7]: The signed message conforms to the EIP-712 standard, the same one used by meta transactions for tokens like CHAI and DAI.
[^8]:
    Note that using the new architecture, \\(x*{in}\\) is not provided by the user; instead, it is calculated by
    measuring the contract's balance after the callback, \\(x_1\\), and subtracting \\((x_0 - x*{out})\\) from it. This logic does
    not distinguish between assets sent into the contract before it is called and assets sent into the contract
    during the callback. \\(y*{in}\\) is computed in the same way, based on \\(y_0\\), \\(y_1\\), and \\(y*{out}\\).

[^9]: As described above in section 3.2, Uniswap v2 core does not use transferFrom().
[^10]:
    This also reduces the likelihood of rounding errors, since the number of bits in the quantity of shares
    will be approximately the mean of the number of bits in the quantity of asset X in the reserves, and the
    number of bits in the quantity of asset Y in the reserves:
    \\(\log_2 \sqrt{x \cdot y} = \frac{\log_2 x + \log_2 y}{2}\\)

[^11]:
    In theory, there are some cases where this burn could be non-negligible, such as pairs between high-value
    zero-decimal tokens. However, these pairs are a poor fit for Uniswap anyway, since rounding errors would
    make trading infeasible.

[^12]: As of this writing, one of the highest-liquidity pairs on Uniswap v1 is the pair between ETH and WETH[7].

# References

<div id="ref-1">[1] Hayden Adams. 2018. url: https://hackmd.io/@477aQ9OrQTCbVR3fq1Qzxg/HJ9jLsfTz?type=view.</div>
<div id="ref-2">[2] Guillermo Angeris et al. An analysis of Uniswap markets. 2019. arXiv: 1911.03380 [q-fin.TR].</div>
<div id="ref-3">[3] samczsun. Taking undercollateralized loans for fun and for profit. Sept. 2019. url: https://samczsun.com/taking-undercollateralized-loans-for-fun-and-for-profit/.</div>
<div id="ref-4">[4] Fabian Vogelsteller and Vitalik Buterin. Nov. 2015. url: https://eips.ethereum.org/EIPS/eip-20.</div>
<div id="ref-5">[5] Jordi Baylina Jacques Dafflon and Thomas Shababi. EIP 777: ERC777 Token Standard. Nov. 2017. url: https://eips.ethereum.org/EIPS/eip-777.</div>
<div id="ref-6">[6] Radar. WTF is WETH? url: https://weth.io/.</div>
<div id="ref-7">[7] Uniswap.info. Wrapped Ether (WETH). url: https://uniswap.info/token/0xc02aaa39b22.</div>
<div id="ref-8">[8] Vitalik Buterin. EIP 1014: Skinny CREATE2. Apr. 2018. url: https://eips.ethereum.org/EIPS/eip-1014.</div>

# 4 Disclaimer

This paper is for general information purposes only. It does not constitute investment advice or a recommendation or solicitation to buy or sell any investment and should not be used in the evaluation of the merits of making any investment decision. It should not be relied upon for accounting, legal or tax advice or investment recommendations. This paper reflects current opinions of the authors and is not made on behalf of Paradigm or its affiliates and does not necessarily reflect the opinions of Paradigm, its affiliates or individuals associated with Paradigm. The opinions reflected herein are subject to change without being updated.
