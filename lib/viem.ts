import { createPublicClient, defineChain, http } from "viem";
import { mainnet, goerli } from "viem/chains";

export const quttestnet = defineChain({
    id: 452,
    name: "QUT Testnet",
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.qutblockchain.club']
        }
    }
})

export const client = createPublicClient({
  chain: quttestnet,
  transport: http(),
});

export const BLOCKCOIN_ADDRESS = "0x6e0a5725dD4071e46356bD974E13F35DbF9ef367"
export const ASSETFACTORY_ADDRESS = "0xA9d0Fb5837f9c42c874e16da96094b14Af0e2784"
export const UNISWAP_FACTORY_ADDRESS = "0x1f53E116c31F171e59f45f0752AEc5d1F5aA3714"
export const UNISWAP_ROUTER_ADDRESS = "0xa31F4c0eF2935Af25370D9AE275169CCd9793DA3"
export const TESTNET_RPC = "https://testnet.qutblockchain.club"
export const TESTNET_NETID = 452