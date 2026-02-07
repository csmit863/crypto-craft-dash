"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/viem";
import {
  ERC20_ABI,
  UNISWAP_FACTORY_ABI,
  UNISWAP_PAIR_ABI,
  ASSET_FACTORY_ABI,
} from "@/lib/abi";
import {
  BLOCKCOIN_ADDRESS,
  ASSETFACTORY_ADDRESS,
  UNISWAP_FACTORY_ADDRESS,
} from "@/lib/viem";
import { formatUnits, Address } from "viem";

import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";

const myTheme = themeQuartz.withPart(colorSchemeDark);

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

type MarketRow = {
  asset: Address;
  pair: Address;
  name: string;
  symbol: string;
  price: number;
  blockLiquidity: number;
  assetLiquidity: number;
  searchKey: string;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}


export default function ItemMarket() {
  const [rows, setRows] = useState<MarketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState("Starting…");
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    if (!search) return rows;

    const q = normalize(search);
    return rows.filter((r) => r.searchKey.includes(q));
  }, [rows, search]);


  const columnDefs = useMemo<ColDef[]>(
    () => [
        {
        headerName: "Symbol",
        field: "symbol",
        flex: 1,
        },
        {
        headerName: "Item",
        field: "name",
        flex: 1.5,
        },
        
        {
        headerName: "Price (BLCK)",
        field: "price",
        flex: 1,
        sort: "desc",
        valueFormatter: (p) =>
            p.value.toLocaleString(undefined, {
            minimumFractionDigits: 5,
            maximumFractionDigits: 5,
            }),
        },
        {
        headerName: "Blockcoin Liquidity",
        field: "blockLiquidity",
        flex: 1,
        valueFormatter: (p) =>
            p.value.toLocaleString() + " BLCK",
        },
        {
        headerName: "Item Liquidity",
        field: "assetLiquidity",
        flex: 1,
        valueFormatter: (p) =>
            p.value.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            }) + " items",
        },
    ],
    []
    );



  useEffect(() => {
    async function loadMarket() {
        try {
            setProgress("Fetching assets…");

            const assets = (await client.readContract({
            address: ASSETFACTORY_ADDRESS,
            abi: ASSET_FACTORY_ABI,
            functionName: "getAllAssets",
            })) as Address[];

            setProgress(`Found ${assets.length} assets. Checking pairs…`);

            const rows = await Promise.allSettled(
            assets.map(async (asset, i) => {
                setProgress(`Processing asset ${i + 1}/${assets.length}`);

                try {
                const pair = (await client.readContract({
                    address: UNISWAP_FACTORY_ADDRESS,
                    abi: UNISWAP_FACTORY_ABI,
                    functionName: "getPair",
                    args: [BLOCKCOIN_ADDRESS, asset],
                })) as Address;

                if (pair === "0x0000000000000000000000000000000000000000")
                    return null;

                const [name, symbol] = await Promise.all([
                    client.readContract({
                        address: asset,
                        abi: ERC20_ABI,
                        functionName: "name",
                    }) as Promise<string>,

                    client.readContract({
                        address: asset,
                        abi: ERC20_ABI,
                        functionName: "symbol",
                    }) as Promise<string>,
                ]);


                const [r0, r1] = (await client.readContract({
                    address: pair,
                    abi: UNISWAP_PAIR_ABI,
                    functionName: "getReserves",
                })) as [bigint, bigint, number];

                const token0 = (await client.readContract({
                    address: pair,
                    abi: UNISWAP_PAIR_ABI,
                    functionName: "token0",
                })) as Address;

                const [reserveBlock, reserveAsset] =
                    token0.toLowerCase() === BLOCKCOIN_ADDRESS.toLowerCase()
                    ? [r0, r1]
                    : [r1, r0];

                const rb = Number(formatUnits(reserveBlock, 18));
                const ra = Number(formatUnits(reserveAsset, 18));
                if (ra === 0) return null;

                

                return {
                    asset,
                    pair,
                    name,
                    symbol,
                    price: rb / ra,
                    blockLiquidity: rb,
                    assetLiquidity: ra,
                    searchKey: normalize(name),
                };


                } catch (err) {
                console.error("Asset failed:", asset, err);
                return null;
                }
            })
            );

            const cleaned = rows
            .filter((r): r is PromiseFulfilledResult<MarketRow | null> => r.status === "fulfilled")
            .map((r) => r.value)
            .filter((r): r is MarketRow => r !== null);

            cleaned.sort((a, b) => b.blockLiquidity - a.blockLiquidity);

            setRows(cleaned);
        } catch (err) {
            console.error("Market load failed:", err);
            setProgress("Failed to load market. Check console.");
        } finally {
            setLoading(false);
        }
        }


    loadMarket();
  }, []);

  return (
    <div className="p-8 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Minecraft Item Market</h1>

      {loading ? (
        <p>Loading market… {progress}</p> 
        
      ) : (
        loading ? (
            <p>Loading market…</p>
            ) : (
                <>
                <input
                    type="text"
                    placeholder="Search items (e.g. iron bar)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4 p-2 w-full max-w-md rounded bg-zinc-800 text-white border border-zinc-600"
                    />

            <div style={{ height: 600, width: "100%" }}>
                <AgGridReact
                theme={myTheme}
                rowData={filteredRows}
                columnDefs={columnDefs}
                animateRows
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true,
                }}
                />
            </div>
            </>
            )
      )}
    </div>
  );
}
