// ==============================================================
// FOLDER: mini-app-frontend
// FILE: src/VendorKycUpload.tsx
// ==============================================================
import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react';
import { API_BASE_URL } from './config';

export const VendorKycUpload: React.FC = () => {
  const [docType, setDocType] = useState<'FAYDA_ID' | 'PASSPORT'>('FAYDA_ID');
  const [shopName, setShopName] = useState('');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      WebApp.showAlert('Please select a photo or PDF of your document.');
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    formData.append('doc_type', docType);
    formData.append('shop_name', shopName);
    formData.append('full_name', fullName);
    formData.append('id_number', idNumber);
    formData.append('document_front', file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/kyc/submit`, {
        method: 'POST',
        headers: {
          'x-telegram-init-data': WebApp.initData,
        },
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        WebApp.showAlert('KYC submitted! The Super Admin will verify your ID.');
      } else {
        const err = await res.json();
        WebApp.showAlert(err.detail || 'Failed to submit KYC.');
      }
    } catch {
      WebApp.showAlert('Network error. Check backend URL.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="bg-[#131E18] border border-[#2E4538] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Vendor KYC Verification</h2>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          In compliance with Ethiopian e-commerce rules, upload your <strong>Ethiopian Fayda National ID</strong> or <strong>Passport</strong> to open a storefront.
        </p>

        {submitted ? (
          <div className="bg-[#084E2E] border border-emerald-400/40 rounded-xl p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">Application Under Review</h3>
            <p className="text-xs text-gray-300 mt-1">
              Your store will activate automatically once verified by the Super Admin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDocType('FAYDA_ID')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border ${docType === 'FAYDA_ID' ? 'bg-[#0F8A52] border-emerald-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
              >
                Fayda Digital ID
              </button>
              <button
                type="button"
                onClick={() => setDocType('PASSPORT')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border ${docType === 'PASSPORT' ? 'bg-[#0F8A52] border-emerald-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
              >
                Ethiopian Passport
              </button>
            </div>

            <div>
              <label className="text-[11px] text-gray-400">Shop / Guild Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Lalibela Ecclesiastical Artisans"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full bg-[#1D2C24] border border-[#2E4538] rounded-lg p-2.5 text-xs text-white mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400">Full Legal Name on Document</label>
              <input
                type="text"
                required
                placeholder="e.g. Yohannes Gebremariam"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#1D2C24] border border-[#2E4538] rounded-lg p-2.5 text-xs text-white mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400">
                {docType === 'FAYDA_ID' ? 'Fayda ID Number (FIN)' : 'Passport Number'}
              </label>
              <input
                type="text"
                required
                placeholder={docType === 'FAYDA_ID' ? 'ET-FAYDA-XXXXXXXX' : 'EPXXXXXXX'}
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-[#1D2C24] border border-[#2E4538] rounded-lg p-2.5 text-xs text-white mt-1 font-mono"
              />
            </div>

            <div className="border border-dashed border-[#2E4538] rounded-xl p-4 text-center bg-[#1D2C24]">
              <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-300 font-medium">Attach Document Photo or PDF</p>
              <input
                type="file"
                required
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[#0F8A52] file:text-white mt-2 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#D49A1F] hover:bg-[#FFC947] text-black font-bold py-2.5 rounded-xl text-xs mt-2"
            >
              {submitting ? 'Submitting to Super Admin...' : 'Submit ID for Verification'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};