# 循环优化

## 尝试避免不必要的循环、

在 Solidity 中，**循环和迭代的优化对 Gas 消耗有极大影响**，因为 EVM 是按操作步骤计费的。以下是针对循环优化的专业级实践方案：

---

### 1. **循环基础优化策略**

#### （1）数学替代法（最高效）

```solidity
// ❌ 低效循环求和
function sum(uint[] memory arr) public pure returns (uint) {
    uint total;
    for (uint i = 0; i < arr.length; i++) {
        total += arr[i]; // 每次迭代都SLOAD/SSTORE
    }
    return total;
}

// ✅ 使用assembly批量处理
function sumOptimized(uint[] memory arr) public pure returns (uint) {
    uint total;
    assembly {
        let len := mload(arr)
        let ptr := add(arr, 0x20)
        for { let end := add(ptr, mul(len, 0x20)) } lt(ptr, end) { ptr := add(ptr, 0x20) } {
            total := add(total, mload(ptr))
        }
    }
    return total;
}
```

**优化点**：

- 避免数组边界检查
- 直接内存操作减少 Gas

#### （2）循环展开（Loop Unrolling）

```solidity
// 手动展开4次迭代
function processBatch(uint[4] memory data) public pure {
    process(data[0]);
    process(data[1]);
    process(data[2]);
    process(data[3]);
}
```

**适用场景**：

- 固定次数小循环（3-5 次）

---

### 2. **高级循环优化技巧**

#### （1）缓存存储变量

```solidity
function updateUsers(User[] storage users) internal {
    uint length = users.length;
    for (uint i = 0; i < length; ) {
        User storage user = users[i]; // 缓存storage引用
        user.balance += 10;
        unchecked { i++; } // 关闭溢出检查
    }
}
```

**优化效果**：

- 减少每次循环的`SLOAD`（~2100 Gas）
- `unchecked`节省溢出检查 Gas

#### （2）位图批量处理

```solidity
uint256 public userBitmask; // 每位代表一个用户状态

function batchToggleUsers(uint256 idsBitmap) external {
    userBitmask ^= idsBitmap; // 单次操作完成批量修改
}
```

**优势**：

- 1 次 SSTORE 完成 N 个用户状态更新
- 适合布尔型状态管理

---

### 3. **循环终止策略**

#### （1）短路模式（Short-circuit）

```solidity
function find(uint[] memory arr, uint target) public pure returns (bool) {
    for (uint i = 0; i < arr.length; ) {
        if (arr[i] == target) return true; // 提前退出
        unchecked { i++; }
    }
    return false;
}
```

**Gas 对比**：

- 找到目标时立即省去后续迭代

#### （2）边界预计算

```solidity
function processArray(uint[] memory arr) public {
    uint end = arr.length;
    for (uint i = 0; i < end; ) {
        _process(arr[i]);
        unchecked { i++; }
    }
}
```

**优化原理**：

- 避免每次循环计算`arr.length`

---

### 4. **嵌套循环优化**

#### （1）笛卡尔积优化

```solidity
// ❌ 低效嵌套循环
for (uint i = 0; i < 10; i++) {
    for (uint j = 0; j < 10; j++) {
        // 100次迭代
    }
}

// ✅ 扁平化处理
for (uint k = 0; k < 100; ) {
    uint i = k / 10;
    uint j = k % 10;
    // 业务逻辑
    unchecked { k++; }
}
```

**Gas 节省**：

- 减少外层循环开销

---

### 5. **循环 Gas 消耗参考表**

| 操作              | 单次迭代 Gas 消耗 | 优化后 Gas |
| ----------------- | ----------------- | ---------- |
| 普通循环+存储读写 | ~5000             | ~2200      |
| 无存储读写的循环  | ~200              | ~80        |
| 嵌套循环(10x10)   | ~50000            | ~22000     |

---

### 6. **实战建议**

1. **优先使用映射替代数组遍历**

   ```solidity
   mapping(uint => Item) public items; // O(1)访问
   ```

2. **链下计算+链上验证模式**

   ```solidity
   function verifyBatch(bytes32 merkleRoot, bytes32[] calldata proofs) external {
       // 使用Merkle Proof验证批量数据
   }
   ```

3. **使用事件替代存储更新**

   ```solidity
   event BulkUpdate(uint256 indexed fromId, uint256 indexed toId);

   function bulkNotify(uint256 start, uint256 end) external {
       emit BulkUpdate(start, end); // 0 Gas成本
   }
   ```

**终极原则**：

- 能不用循环就不用
- 必须用循环时：减少存储访问 + 限制最大迭代次数 + 使用 unchecked
