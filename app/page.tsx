"use client";

import { useState } from "react";
import BlockcoinPage from "./pages/BlockcoinPage";
import About from "./pages/About";
import ItemMarket from "./pages/ItemMarket";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "blockcoin" | "market">("blockcoin");

  return (
    <div className="min-h-screen bg-[#c0c7c8] text-black font-sans" style={{fontFamily: '"Chicago", "MS Sans Serif", Tahoma, sans-serif'}}>
      {/* Win95 Title Bar */}
      <div className="flex items-center px-2 py-1 bg-gradient-to-r from-[#000080] to-[#1084d0] text-white text-sm font-bold border-b-2 border-[#dfdfdf]">
        <span>CryptoCraft Dashboard</span>
      </div>
      {/* Menu Bar */}
      <nav className="flex gap-0 px-2 py-1 bg-[#c0c7c8] border-b-2 border-[#808080] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]">
        {[
          {key: "blockcoin" as const, label: "Blockcoin"},
          {key: "market" as const, label: "Item Market"},
          {key: "about" as const, label: "About"},
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1 text-xs border-2 ${
              activeTab === t.key
                ? "border-[#808080] border-t-[#808080] border-l-[#808080] bg-[#c0c7c8] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]"
                : "border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#c0c7c8] hover:bg-[#dfdfdf]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="p-4">
        {activeTab === "about" && <About />}
        {activeTab === "blockcoin" && <BlockcoinPage />}
        {activeTab === "market" && <ItemMarket />}
      </main>
    </div>
  );
}
