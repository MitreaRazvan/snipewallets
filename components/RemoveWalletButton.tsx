'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RemoveWalletButtonProps {
  walletAddress: string;
}

export default function RemoveWalletButton({ walletAddress }: RemoveWalletButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove this wallet?')) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/wallets/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      if (response.ok) {
        router.refresh(); // Reload the page to show updated list
      } else {
        alert('Failed to remove wallet');
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition text-sm disabled:opacity-50"
    >
      {loading ? 'Removing...' : 'Remove'}
    </button>
  );
}