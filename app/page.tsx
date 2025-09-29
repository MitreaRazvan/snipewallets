import WalletTable from '@/components/WalletTable';
import { mockWallets } from '@/lib/mockData';

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Discover Profitable Solana Wallets
        </h1>
        <p className="text-xl text-slate-400 mb-8">
          Track, analyze, and learn from the best traders on Solana
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Enter wallet address to analyze..."
            className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Total Wallets</div>
          <div className="text-3xl font-bold text-white">127</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Avg ROI</div>
          <div className="text-3xl font-bold text-profit">+156%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Total Volume (7d)</div>
          <div className="text-3xl font-bold text-white">$8.9M</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Avg Win Rate</div>
          <div className="text-3xl font-bold text-white">69.3%</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
            7 Days
          </button>
          <button className="px-4 py-2 bg-slate-900 text-slate-400 rounded-lg hover:bg-slate-800 transition">
            30 Days
          </button>
          <button className="px-4 py-2 bg-slate-900 text-slate-400 rounded-lg hover:bg-slate-800 transition">
            All Time
          </button>
        </div>
        <div className="text-slate-400 text-sm">
          Last updated: Just now
        </div>
      </div>

      {/* Top Wallets Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Top Wallets</h2>
        </div>
        <WalletTable wallets={mockWallets} />
      </div>
    </div>
  );
}