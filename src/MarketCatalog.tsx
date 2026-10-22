// ==============================================================
// FOLDER: mini-app-frontend
// FILE: src/MarketCatalog.tsx
// ==============================================================
import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ShoppingBag, ShieldCheck, Plus, Minus } from 'lucide-react';
import { API_BASE_URL } from './config';

interface Product {
  id: string;
  title: string;
  amharic_title?: string;
  category: string;
  price_etb: number;
  stock_quantity: number;
}

export const MarketCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [paymentGateway, setPaymentGateway] = useState<'TELEBIRR' | 'CBE_BIRR'>('TELEBIRR');
  const [deliveryAddress, setDeliveryAddress] = useState('Bole, Addis Ababa');
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/market/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = products.find((p) => p.id === id);
    return sum + (item ? Number(item.price_etb) * qty : 0);
  }, 0);

  const platformFee = totalAmount * 0.015;
  const vendorNet = totalAmount - platformFee;

  const handleCheckout = async () => {
    if (totalItems === 0) return;
    setIsCheckingOut(true);
    WebApp.HapticFeedback.impactOccurred('medium');

    const items = Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/market/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-telegram-init-data': WebApp.initData,
        },
        body: JSON.stringify({
          items,
          paymentGateway,
          deliveryAddress,
        }),
      });

      const data = await res.json();
      if (data.paymentUrl) {
        WebApp.openLink(data.paymentUrl);
      } else {
        WebApp.showAlert(`Order #${data.orderCode} placed! Held in 1.5% Escrow.`);
        setCart({});
      }
    } catch (error) {
      WebApp.showAlert('Checkout failed. Please verify connection.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="p-4 pb-32">
      {/* Platform Banner */}
      <div className="bg-[#131E18] border border-[#2E4538] rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="p-2.5 bg-[#084E2E] rounded-xl text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">EOTC Escrow Protected</h2>
          <p className="text-[11px] text-gray-400">
            Flat 1.5% commission fee. 98.5% is held in escrow until item is received.
          </p>
        </div>
      </div>

      {/* Catalog Grid */}
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Liturgical & Sacred Catalog</h3>

      {loading ? (
        <div className="text-center py-12 text-xs text-gray-500">Loading sacred goods...</div>
      ) : (
        <div className="grid gap-3">
          {products.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div key={item.id} className="bg-[#131E18] border border-[#2E4538] rounded-xl p-3.5 flex justify-between items-center">
                <div className="flex-1 pr-2">
                  <span className="text-[10px] text-emerald-400 font-semibold">{item.category}</span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  {item.amharic_title && <p className="text-xs text-[#FFC947]">{item.amharic_title}</p>}
                  <p className="text-sm font-black text-amber-400 mt-1">
                    {Number(item.price_etb).toLocaleString()} <span className="text-[10px] text-gray-400">ETB</span>
                  </p>
                </div>

                {count === 0 ? (
                  <button
                    onClick={() => {
                      WebApp.HapticFeedback.impactOccurred('light');
                      setCart({ ...cart, [item.id]: 1 });
                    }}
                    className="bg-[#0F8A52] hover:bg-[#28B473] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-[#1D2C24] border border-[#2E4538] rounded-lg p-1">
                    <button
                      onClick={() => {
                        const newCart = { ...cart };
                        if (count > 1) newCart[item.id] = count - 1;
                        else delete newCart[item.id];
                        setCart(newCart);
                      }}
                      className="p-1 text-gray-300"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white px-1">{count}</span>
                    <button
                      onClick={() => setCart({ ...cart, [item.id]: count + 1 })}
                      className="p-1 text-gray-300"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Sticky Checkout Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-[#131E18] border-t border-[#2E4538] p-4 shadow-2xl z-20">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-gray-400">Gross Total ({totalItems} items):</span>
            <span className="text-base font-black text-[#FFC947]">{totalAmount.toLocaleString()} ETB</span>
          </div>

          <div className="bg-[#1D2C24] p-2.5 rounded-lg border border-[#2E4538] text-[11px] mb-3 flex justify-between">
            <span className="text-amber-400">1.5% Platform Fee: {platformFee.toFixed(2)} ETB</span>
            <span className="text-emerald-400 font-semibold">98.5% Vendor Net: {vendorNet.toFixed(2)} ETB</span>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setPaymentGateway('TELEBIRR')}
              className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${paymentGateway === 'TELEBIRR' ? 'bg-[#0072CE] border-cyan-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
            >
              Telebirr Pay
            </button>
            <button
              onClick={() => setPaymentGateway('CBE_BIRR')}
              className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${paymentGateway === 'CBE_BIRR' ? 'bg-[#7A1442] border-fuchsia-400 text-white' : 'bg-[#1D2C24] border-[#2E4538] text-gray-400'}`}
            >
              CBE Birr
            </button>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-[#0F8A52] hover:bg-[#28B473] py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {isCheckingOut ? 'Securing Escrow...' : `Pay ${totalAmount.toLocaleString()} ETB with Escrow`}
          </button>
        </div>
      )}
    </div>
  );
};