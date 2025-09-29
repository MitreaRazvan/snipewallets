import { formatCurrency, truncateAddress } from '@/lib/utils';
import { mockWalletDetail } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import SaveWalletButton from '@/components/SaveWalletButton';

export default async function WalletPage({ params }: { params: { address: string } }) {
  const wallet = mockWalletDetail;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/"
        className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition"
      >
        ← Back to Top Wallets
      </Link>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Wallet Analysis</h1>
            <div className="flex items-center space-x-3">
              <code className="text-sm text-slate-300 bg-slate-800 px-3 py-1 rounded">
                {truncateAddress(params.address, 8, 8)}
              </code>
              <button className="text-slate-400 hover:text-white transition">
                📋 Copy
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
           <SaveWalletButton walletAddress={params.address} />
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition">
              🔄 Refresh
            </button>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Last updated: {formatDistanceToNow(wallet.lastTradeDate, { addSuffix: true })}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Portfolio Value</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(wallet.portfolioValue)}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Realized PnL</div>
          <div className={`text-2xl font-bold ${wallet.realizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
            {formatCurrency(wallet.realizedPnl)}
          </div>
          <div className="text-sm text-slate-400 mt-1">
            +{wallet.roi.toFixed(1)}% ROI
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Unrealized PnL</div>
          <div className={`text-2xl font-bold ${wallet.unrealizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
            {formatCurrency(wallet.unrealizedPnl)}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Total PnL</div>
          <div className={`text-2xl font-bold ${wallet.totalPnl > 0 ? 'text-profit' : 'text-loss'}`}>
            {formatCurrency(wallet.totalPnl)}
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Win Rate</div>
          <div className="text-lg font-semibold text-white">{wallet.winRate}%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Total Trades</div>
          <div className="text-lg font-semibold text-white">{wallet.totalTrades}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Avg Trade Size</div>
          <div className="text-lg font-semibold text-white">{formatCurrency(wallet.avgTradeSize)}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Best Trade</div>
          <div className="text-lg font-semibold text-profit">{formatCurrency(wallet.bestTrade)}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Success Rate</div>
          <div className="text-lg font-semibold text-white">{wallet.winningTrades}W / {wallet.losingTrades}L</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Active Days</div>
          <div className="text-lg font-semibold text-white">{wallet.activeDays}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">SOL Balance</div>
          <div className="text-lg font-semibold text-white">{wallet.solBalance} SOL</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-xs mb-1">Tokens Held</div>
          <div className="text-lg font-semibold text-white">{wallet.tokenCount}</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trading History */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          </div>
          <div className="p-6 space-y-4">
            {wallet.transactions.map((tx) => (
              <div key={tx.id} className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      tx.action === 'BUY' ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'
                    }`}>
                      {tx.action}
                    </span>
                    <span className="font-semibold text-white">{tx.tokenSymbol}</span>
                  </div>
                  <span className="text-slate-400 text-sm">
                    {formatDistanceToNow(tx.date, { addSuffix: true })}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Amount:</span>
                    <span className="text-white ml-2">{tx.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Price:</span>
                    <span className="text-white ml-2">${tx.price}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Total:</span>
                    <span className="text-white ml-2">{formatCurrency(tx.totalValue)}</span>
                  </div>
                  {tx.realizedPnl !== null && (
                    <div>
                      <span className="text-slate-400">PnL:</span>
                      <span className={`ml-2 font-semibold ${tx.realizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
                        {formatCurrency(tx.realizedPnl)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Holdings */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Current Holdings</h2>
          </div>
          <div className="p-6 space-y-4">
            {wallet.holdings.map((holding) => (
              <div key={holding.tokenSymbol} className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white">{holding.tokenSymbol}</div>
                    <div className="text-sm text-slate-400">{holding.tokenName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{formatCurrency(holding.currentValue)}</div>
                    <div className={`text-sm ${holding.unrealizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
                      {formatCurrency(holding.unrealizedPnl)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400">Amount</div>
                    <div className="text-white">{holding.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Price</div>
                    <div className="text-white">${holding.currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">% Portfolio</div>
                    <div className="text-white">{holding.portfolioPercent}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}