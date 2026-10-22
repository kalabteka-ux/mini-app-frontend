// ==============================================================
// FOLDER: mini-app-frontend
// FILE: src/VendorWallet.tsx
// ==============================================================
import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Wallet, ArrowUpRight, DollarSign } from 'lucide-react';
import { API_BASE_URL } from './config';

export const VendorWallet: React.FC = () => {
  const [availableBalance, setAvailableBalance] = useState(12450.0);
  const [escrowLocked, setEscrowLocked] = useState(3400.0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [channel, setChannel] = useState<'TELEBIRR' | 'CBE_BIRR'>('TELEBIRR');
  const [payoutAccount, setPayoutAccount] = useState('+251911223344');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount > availableBalance) {
      WebApp.showAlert('Invalid withdrawal amount.');
      return;
    }
    setIsProcessing(true);

    try {
      // Mock withdrawal API endpoint
      const res = await fetch(`${API_BASE_URL}/api/v1/vendor/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-telegram-init-data': WebApp.initData,
        },
        body: JSON.stringify({ amount, channel, payoutAccount }),
      });

      if (res.ok) {
        setAvailableBalance((prev) => prev - amount);
        WebApp.showAlert(`Payout request of ${amount.toLocaleString()} ETB sent to Super Admin.`);
        setWithdrawAmount('');
      } else {
        WebApp.showAlert('Withdrawal failed or endpoint simulated.');
      }
    } catch {
      WebApp.showAlert('Simulated: Payout requested to Telebirr.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 pb-24">
      {/* Wallet Card */}
      <div className="bg-[#131E18] border border-[#2E4538] rounded-2xl p-5 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Vendor Virtual Wallet</h2>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
            98.5% Split
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-[#1D2C24] p-3 rounded-xl border border-emerald-500/30">
            <p className="text-[10px] text-gray-400">Available to Withdraw</p>
            <p className="text-lg font-black text-emerald-400 mt-1">{availableBalance.toLocaleString()} ETB</p>
          </div>
          <div className="bg-[#1D2C24] p-3 rounded-xl border border-amber-500/30">
            <p className="text-[10px] text-gray-400">Held in Escrow</p>
            <p className="text-lg font-black text-amber-400 mt-1">{escrowLocked.toLocaleString()} ETB</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-[#131E18] border border-[#2E4538] rounded-2xl p-5">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Request Payout</h3>

        <form onSubmit={handleWithdraw} className="space-y-3">
          <div>
            <label className="text-[11px] text-gray-400">Payout Channel</label>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => setChannel('TELEBIRR')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border ${channel === 'TELEBIRR' ? 'bg-[#0072CE] border-cyan-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
              >
                Telebirr
              </button>
              <button
                type="button"
                onClick={() => setChannel('CBE_BIRR')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border ${channel === 'CBE_BIRR' ? 'bg-[#7A1442] border-fuchsia-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
              >
                CBE Birr
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-gray-400">Phone or Account Number</label>
            <input
              type="text"
              required
              value={payoutAccount}
              onChange={(e) => setPayoutAccount(e.target.value)}
              className="w-full bg-[#1D2C24] border border-[#2E4538] rounded-lg p-2.5 text-xs text-white mt-1"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400">Amount in Ethiopian Birr (ETB)</label>
            <input
              type="number"
              required
              max={availableBalance}
              placeholder="e.g. 5000"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full bg-[#1D2C24] border border-[#2E4538] rounded-lg p-2.5 text-xs text-white mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing || availableBalance === 0}
            className="w-full bg-[#0F8A52] hover:bg-[#28B473] text-white font-bold py-2.5 rounded-xl text-xs flex justify-center items-center gap-1.5 mt-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            {isProcessing ? 'Processing Payout...' : 'Withdraw to ' + (channel === 'TELEBIRR' ? 'Telebirr' : 'CBE')}
          </button>
        </form>
      </div>
    </div>
  );
};