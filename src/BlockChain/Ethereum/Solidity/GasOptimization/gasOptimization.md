# 优化费率

## 浪费也是一种优化

- [UniswapV2Factory 节选代码](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Factory.sol)
  - 在尝试设计合约存储结构时时常发生的问题，想查询一个币对 A->B 时会发现必定有 B->A 的存储没用上导致的浪费。
    此处尽管浪费了一半的存储空间，但是逻辑上减少了合约的复杂度

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```
