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

export const BLOCKCOIN_ADDRESS = "0x5901Ba547b8994d89da8737b3733aC0C97d8B061"
export const ASSETFACTORY_ADDRESS = "0xe14058B1c3def306e2cb37535647A04De03Db092"
export const UNISWAP_FACTORY_ADDRESS = "0x1f53E116c31F171e59f45f0752AEc5d1F5aA3714"
export const UNISWAP_ROUTER_ADDRESS = "0xa31F4c0eF2935Af25370D9AE275169CCd9793DA3"
export const TESTNET_RPC = "https://testnet.qutblockchain.club"
export const TESTNET_NETID = 452