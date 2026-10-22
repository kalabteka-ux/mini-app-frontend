// ==============================================================
// FOLDER: mini-app-frontend
// FILE: src/App.tsx
// ==============================================================
import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Store, UserCheck, Wallet2 } from 'lucide-react';
import { MarketCatalog } from './MarketCatalog';
import { VendorKycUpload } from './VendorKycUpload';
import { VendorWallet } from './VendorWallet';

export default function App() {
  const [activeTab, setActiveTab] = useState<'market' | 'kyc' | 'wallet'>('market');

  useEffect(() => {
    try {
      WebApp.ready();
      WebApp.expand();
      WebApp.setHeaderColor('#0B120E');
    } catch (e) {
      console.log('Running outside Telegram client environment');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B120E] text-white flex flex-col justify-between">
      {/* Top Telegram Header Bar */}
      <header className="px-4 py-3 bg-[#131E18] border-b border-[#2E4538] flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-base font-extrabold text-[#28B473]">EOTC Market</h1>
          <p className="text-[10px] text-gray-400">
            {WebApp.initDataUnsafe?.user?.first_name ? `Welcome, ${WebApp.initDataUnsafe.user.first_name}` : 'Ethiopian Orthodox Marketplace'}
          </p>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-[#FFC947] border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
          1.5% Escrow
        </span>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'market' && <MarketCatalog />}
        {activeTab === 'kyc' && <VendorKycUpload />}
        {activeTab === 'wallet' && <VendorWallet />}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#131E18] border-t border-[#2E4538] py-2 px-6 flex justify-around items-center z-30">
        <button
          onClick={() => {
            WebApp.HapticFeedback.selectionChanged();
            setActiveTab('market');
          }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'market' ? 'text-emerald-400' : 'text-gray-400'}`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-bold">Catalog</span>
        </button>

        <button
          onClick={() => {
            WebApp.HapticFeedback.selectionChanged();
            setActiveTab('kyc');
          }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'kyc' ? 'text-emerald-400' : 'text-gray-400'}`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-bold">Vendor KYC</span>
        </button>

        <button
          onClick={() => {
            WebApp.HapticFeedback.selectionChanged();
            setActiveTab('wallet');
          }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'wallet' ? 'text-emerald-400' : 'text-gray-400'}`}
        >
          <Wallet2 className="w-5 h-5" />
          <span className="text-[10px] font-bold">Wallet (98.5%)</span>
        </button>
      </nav>
    </div>
  );
}