export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">SnipeWallets</h3>
            <p className="text-slate-400 text-sm">
              Track, analyze, and learn from the best Solana traders.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-400 hover:text-white text-sm transition">
                  Top Wallets
                </a>
              </li>
              <li>
                <a href="/guides" className="text-slate-400 hover:text-white text-sm transition">
                  Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 SnipeWallets. Built for Solana traders.
          </p>
        </div>
      </div>
    </footer>
  );
}