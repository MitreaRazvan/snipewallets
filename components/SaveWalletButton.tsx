'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface SaveWalletButtonProps {
  walletAddress: string;
}

export default function SaveWalletButton({ walletAddress }: SaveWalletButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!session) {
      alert('Please log in to save wallets');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/wallets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaved(true);
        alert('Wallet saved successfully! Check your dashboard.');
      } else {
        alert(data.error || 'Failed to save wallet');
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className={`px-4 py-2 rounded-lg transition text-white font-medium ${
        saved
          ? 'bg-profit cursor-default'
          : 'bg-slate-800 hover:bg-slate-700'
      }`}
    >
      {saved ? '✓ Saved' : loading ? 'Saving...' : '💾 Save Wallet'}
    </button>
  );
}