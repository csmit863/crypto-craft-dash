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

// Contract addresses
export const BLOCKCOIN_ADDRESS = "0x95401dc811bb5740090279Ba06cfA8fcF6113778";
export const ASSETFACTORY_ADDRESS = "0x998abeb3E57409262aE5b751f60747921B33613E";
export const UNISWAP_FACTORY_ADDRESS = "0x4826533B4897376654Bb4d4AD88B7faFD0C98528";
export const UNISWAP_ROUTER_ADDRESS = "0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf";