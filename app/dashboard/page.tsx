import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { formatCurrency, truncateAddress } from '@/lib/utils';
import RemoveWalletButton from '@/components/RemoveWalletButton';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  // Get user's saved wallets
  const savedWallets = await prisma.savedWallet.findMany({
    where: {
      user: {
        email: session.user?.email!,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
        <p className="text-slate-400">
          Manage your saved wallets and track their performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Saved Wallets</div>
          <div className="text-3xl font-bold text-white">{savedWallets.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Account Type</div>
          <div className="text-3xl font-bold text-white">Email</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-slate-400 text-sm mb-2">Member Since</div>
          <div className="text-xl font-bold text-white">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Saved Wallets */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Saved Wallets</h2>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition text-sm font-medium">
            + Add Wallet
          </button>
        </div>

        {savedWallets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Saved Wallets Yet
            </h3>
            <p className="text-slate-400 mb-6">
              Start tracking profitable wallets to monitor their performance
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium"
            >
              Explore Top Wallets
            </a>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {savedWallets.map((saved: any) => (
              <div
                key={saved.id}
                className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <code className="text-sm text-slate-300 bg-slate-900 px-3 py-1 rounded">
                      {truncateAddress(saved.walletAddress)}
                    </code>
                    {saved.nickname && (
                      <span className="text-sm text-slate-400">
                        "{saved.nickname}"
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    Added {new Date(saved.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={`/wallet/${saved.walletAddress}`}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
                  >
                    View
                  </a>
                 <RemoveWalletButton walletAddress={saved.walletAddress} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Teaser */}
      <div className="mt-8 bg-gradient-to-r from-primary/20 to-purple-900/20 border border-primary/30 rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              👑 Upgrade to Premium
            </h3>
            <p className="text-slate-300 mb-4">
              Get real-time alerts, advanced analytics, and more
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>✓ Real-time wallet activity alerts</li>
              <li>✓ Advanced filtering and analytics</li>
              <li>✓ Export all data (CSV, PDF)</li>
              <li>✓ API access for developers</li>
            </ul>
          </div>
          <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-semibold text-lg whitespace-nowrap">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}