"use client";

import { useState } from "react";
import About from "./pages/About"; // optional
import ItemMarket from "./pages/ItemMarket"; // optional

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "blockcoin" | "market">("blockcoin");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="text-xl font-bold">CryptoCraft Dashboard</div>
        <div className="flex gap-4">
          <div className={navClasses("about")} onClick={() => setActiveTab("about")}>About</div>
          <div className={navClasses("market")} onClick={() => setActiveTab("market")}>Item Market</div>
        </div>
      </nav>
      <main className="p-4">
        {activeTab === "about" && <About />}
        {activeTab === "market" && <ItemMarket />}
      </main>
    </div>
  );
}
