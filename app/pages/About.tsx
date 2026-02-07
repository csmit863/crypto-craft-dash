"use client";

export default function About() {
  return (
    <div className="p-8 font-sans bg-zinc-50 dark:bg-black min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">About CryptoCraft Dashboard</h1>
      <p className="mb-4">
        The CryptoCraft Dashboard is a tool to view and interact with Blockcoin and other tokenized assets
        within the Minecraft ecosystem. You can track balances, view top holders, and monitor item markets.
      </p>
      <p className="mb-4">
        This platform uses blockchain technology to integrate a real-world cryptocurrency economy into
        Minecraft. All transactions and asset information are pulled directly from smart contracts.
      </p>
      <p>
        Use the navigation bar at the top to switch between viewing Blockcoin holders and the item market.
        Future updates may include more analytics, swap interfaces, and additional blockchain integrations.
      </p>
    </div>
  );
}
