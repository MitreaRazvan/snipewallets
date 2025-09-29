'use client';

import { formatCurrency, truncateAddress } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Wallet {
  walletAddress: string;
  rank: number;
  realizedPnl: number;
  unrealizedPnl: number;
  totalPnl: number;
  roi: number;
  winRate: number;
  totalTrades: number;
  volume7d: number;
  bestToken: string;
  lastActive: Date;
}

interface WalletTableProps {
  wallets: Wallet[];
}

export default function WalletTable({ wallets }: WalletTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm">#</th>
            <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm">Wallet</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Realized PnL</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Unrealized PnL</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Total PnL</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">ROI</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Win Rate</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Trades</th>
            <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm">Best Token</th>
            <th className="text-right py-4 px-4 text-slate-400 font-semibold text-sm">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr
              key={wallet.walletAddress}
              className="border-b border-slate-800 hover:bg-slate-800/50 transition cursor-pointer"
              onClick={() => window.location.href = `/wallet/${wallet.walletAddress}`}
            >
              <td className="py-4 px-4 text-slate-300">#{wallet.rank}</td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <code className="text-sm text-slate-300 bg-slate-800 px-2 py-1 rounded">
                    {truncateAddress(wallet.walletAddress)}
                  </code>
                </div>
              </td>
              <td className={`py-4 px-4 text-right font-semibold ${wallet.realizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
                {formatCurrency(wallet.realizedPnl)}
              </td>
              <td className={`py-4 px-4 text-right font-semibold ${wallet.unrealizedPnl > 0 ? 'text-profit' : 'text-loss'}`}>
                {formatCurrency(wallet.unrealizedPnl)}
              </td>
              <td className={`py-4 px-4 text-right font-bold ${wallet.totalPnl > 0 ? 'text-profit' : 'text-loss'}`}>
                {formatCurrency(wallet.totalPnl)}
              </td>
              <td className="py-4 px-4 text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  {wallet.roi.toFixed(1)}%
                </span>
              </td>
              <td className="py-4 px-4 text-right text-slate-300">
                {wallet.winRate.toFixed(1)}%
              </td>
              <td className="py-4 px-4 text-right text-slate-300">
                {wallet.totalTrades}
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
                  {wallet.bestToken}
                </span>
              </td>
              <td className="py-4 px-4 text-right text-slate-400 text-sm">
                {formatDistanceToNow(wallet.lastActive, { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}