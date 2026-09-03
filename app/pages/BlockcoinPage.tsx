"use client";

import { useEffect, useState } from "react";
import { client, BLOCKCOIN_ADDRESS } from "@/lib/viem";
import { ERC20_ABI } from "@/lib/abi";
import { Address, formatUnits } from "viem";
import Blockies from "react-blockies";

const HOLDERS: Address[] = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0xBcb1E9B24363BF3329F6dE1cF6fad5d9a4E34424",
  "0x3117ca8A842C71acB942F856cD69F2e6aEceAb57",
  "0x556F22c7691E8092B4159A6ea60Af6A9c69EB384",
  "0x08545C8f9f58eb37Ea7Fef37A2990a5bd89fB704",
  "0x7dB4C3b28f9e1E6d114Ec4268E172BA1f65c6CCC",
  "0x3401aD613C859f38eB4381e7f5b738D53D186BE0",
];

function truncateAddress(addr: string) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export default function BlockcoinPage() {
  const [balances, setBalances] = useState<{ address: string; balance: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalances() {
      const results = await Promise.all(
        HOLDERS.map(async (addr) => {
          const balance = await client.readContract({
            address: BLOCKCOIN_ADDRESS,
            abi: ERC20_ABI,
            functionName: "balanceOf",
            args: [addr],
          });
          const formatted = Number(formatUnits(balance as bigint, 18)).toLocaleString(undefined, {
            minimumFractionDigits: 5,
            maximumFractionDigits: 5,
          });
          return { address: addr, balance: formatted };
        })
      );

      // sort descending by balance
      results.sort((a, b) => Number(b.balance.replace(/,/g, "")) - Number(a.balance.replace(/,/g, "")));

      setBalances(results);
      setLoading(false);
    }

    fetchBalances();
  }, []);

  return (
    <div className="p-8 font-sans bg-zinc-50 dark:bg-black min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Top Blockcoin Holders</h1>
      {loading ? (
        <p>Loading balances...</p>
      ) : (
        <ul className="space-y-2">
          {balances.map((b) => (
            <li
              key={b.address}
              className="flex items-center gap-4 p-2 border rounded bg-white dark:bg-gray-900"
            >
              <Blockies seed={b.address.toLowerCase()} size={10} scale={4} />
              <span>
                <strong>{truncateAddress(b.address)}</strong>: {b.balance} blockcoins
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
