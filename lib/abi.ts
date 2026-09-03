export const ERC20_ABI = [
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "owner", type: "address" }], outputs: [{ type: "uint256" }] },
  { name: "decimals", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { type: "function", name: "name", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { type: "function", name: "symbol", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
] as const;

export const UNISWAP_FACTORY_ABI = [
  { name: "getPair", type: "function", stateMutability: "view", inputs: [{ type: "address" }, { type: "address" }], outputs: [{ type: "address" }] },
] as const;

export const UNISWAP_PAIR_ABI = [
  { name: "getReserves", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint112" }, { type: "uint112" }, { type: "uint32" }] },
  { name: "token0", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "address" }] },
] as const;

export const ASSET_FACTORY_ABI = [
  { name: "getAllAssets", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "address[]" }] },
] as const;

export const ASSET_FACTORY_V2_ABI = [
  { name: "createAsset", type: "function", stateMutability: "nonpayable", inputs: [{name:"name",type:"string"},{name:"symbol",type:"string"}], outputs: [{type:"address"}] },
  { name: "tokenizeAndSellAsset", type: "function", stateMutability: "nonpayable", inputs: [{name:"assetAddress",type:"address"},{name:"recipient",type:"address"},{name:"amountIn",type:"uint256"}] },
  { name: "buyAssetAndBurn", type: "function", stateMutability: "nonpayable", inputs: [{name:"assetAddress",type:"address"},{name:"amountOut",type:"uint256"}] },
  { name: "tokenizeAndDeposit", type: "function", stateMutability: "nonpayable", inputs: [{name:"assetAddress",type:"address"},{name:"assetAmount",type:"uint256"},{name:"blockCoinAmount",type:"uint256"}] },
  { name: "withdrawLiquidity", type: "function", stateMutability: "nonpayable", inputs: [{name:"assetAddress",type:"address"}] },
  { name: "withdrawAllLiquidity", type: "function", stateMutability: "nonpayable", inputs: [] },
  { name: "getLpBalance", type: "function", stateMutability: "view", inputs: [{name:"player",type:"address"},{name:"assetAddress",type:"address"}], outputs: [{type:"uint256"}] },
  { name: "getLiquidityPositions", type: "function", stateMutability: "view", inputs: [{name:"player",type:"address"}], outputs: [{type:"address[]"}] },
  { name: "getAllAssets", type: "function", stateMutability: "view", inputs: [], outputs: [{type:"address[]"}] },
  { name: "isAsset", type: "function", stateMutability: "view", inputs: [{name:"",type:"address"}], outputs: [{type:"bool"}] },
  { name: "allAssets", type: "function", stateMutability: "view", inputs: [{name:"",type:"uint256"}], outputs: [{type:"address"}] },
  { name: "lpBalances", type: "function", stateMutability: "view", inputs: [{name:"player",type:"address"},{name:"assetAddress",type:"address"}], outputs: [{type:"uint256"}] },
  { name: "liquidityPositions", type: "function", stateMutability: "view", inputs: [{name:"player",type:"address"},{name:"",type:"uint256"}], outputs: [{type:"address"}] },
  { name: "ROUTER", type: "function", stateMutability: "view", inputs: [], outputs: [{type:"address"}] },
  { name: "UNISWAP_FACTORY", type: "function", stateMutability: "view", inputs: [], outputs: [{type:"address"}] },
  { name: "BLOCKCOIN", type: "function", stateMutability: "view", inputs: [], outputs: [{type:"address"}] },
] as const;
