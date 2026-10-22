import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from './config';

const translations = {
  am: {
    welcomeBack: "ሰላም ጤና ይስጥልኝ",
    unverified: "Unverified",
    pending: "Pending ⏳",
    verified: "Verified ✅",
    totalBalance: "TOTAL BALANCE",
    searchPlaceholder: "መጽሐፍት፣ ንዋየ ቅድሳት፣ አልባሳት ይፈልጉ...",
    categories: ["ሁሉም", "መጽሐፍት", "ንዋየ ቅድሳት", "አልባሳት", "ሥዕላት"],
    buyNow: "ይግዙ",
    addToCart: "አስቀምጥ (Cart 🛒)",
    chatWithVendor: "💬 ከሻጭ ጋር ተወያይ (Chat)",
    vendorHub: "የነጋዴ KYC ምዝገባ",
    addProductTab: "እቃ መጫኛ",
    editProductTab: "እቃ ማስተካከያ (Edit)",
    usernamePh: "የቴሌግራም Username / ስም",
    shopNamePh: "የሱቅ ስም",
    phonePh: "ስልክ ቁጥር",
    sendOtp: "ኮድ ላክ",
    otpPh: "የማረጋገጫ ኮድ",
    telebirrPh: "የቴሌብር ስልክ ቁጥር (09... / 07...)",
    cbePh: "የንግድ ባንክ (CBE) አካውንት ቁጥር (1000...)",
    abyssiniaPh: "የአቢሲኒያ ባንክ አካውንት ቁጥር",
    idFrontLabel: "🪪 የመታወቂያ ፊት (Front)",
    idBackLabel: "🪪 የመታወቂያ ኋላ (Back)",
    openCameraBtn: "📸 ካሜራ",
    openGalleryBtn: "🖼️ ጋለሪ",
    submitKyc: "መታወቂያ እና የባንክ መረጃ ለአድሚን ላክ",
    submitting: "በመላክ ላይ...",
    uploadProdBtn: "እቃውን ወደ ገበያ ጫን",
    updateProdBtn: "ማስታወቂያውን ፎቶ ጨምሮ አስተካክል (Update)",
    recentActivity: "የግዢ/ሽያጭ ትዕዛዝ ክትትል",
    noTx: "እስካሁን ምንም ግብይት የለም",
    navHome: "ገበያ",
    navShop: "ሱቅ/KYC",
    navWallet: "ትዕዛዞች",
    navSettings: "ሴቲንግ",
    langName: "EN",
    checkoutTitle: "የክፍያ እና ዴሊቨሪ ማስተላለፊያ መመሪያ",
    deliveryRefPh: "የዴሊቨሪ ክፍያ ሪፈረስ ቁጥር (Delivery Ref)",
    itemRefPh: "የእቃ ዋጋ ሪፈረስ ቁጥር (Item Ref)",
    confirmPay: "ክፍያዎችን ፈጽሜአለሁ (Confirm All Payments)",
    cancel: "ሰርዝ",
    releaseEscrowBtn: "✅ እቃውን ተቀብያለሁ (ብሩን ለሻጭ ለቀቅ)",
    escrowNote: "🛡️ የእቃው ዋጋ በእስክሮ ተጠብቋል፤ ዴሊቨሪውን በቅድሚያ ከፍለዋል።",
    userStatsTitle: "📊 የእርስዎ የንግድ እንቅስቃሴ ማጠቃለያ",
    myPosted: "የለጠፏቸው እቃዎች",
    mySold: "የሸጧቸው እቃዎች",
    myBought: "የገዛቸው እቃዎች",
    instantSuccessMsg: "✅ ክፍያዎ እና የዴሊቨሪ ሪፈረስ ቁጥርዎ ተመዝግቧል!",
    deliveryToggleLabel: "🏠 ዴሊቨሪ እቤቴ ድረስ ይምጣልኝ",
    noDeliveryAvailableMsg: "ℹ️ ለዚህ እቃ ዴሊቨሪ አልተዘጋጀም፤ መጥተው በስልኩ ደውለው በቦታው ይውሰዱ (Pickup only)",
    backToMarket: "← ወደ ገበያ ተመለስ",
    addedToCartMsg: "🛒 እቃው ወደ ካርት (Cart) ተቀምጧል!",
    cartTitle: "🛒 ያስቀመጧቸው እቃዎች (Saved Cart)",
    emptyCart: "በካርት ውስጥ የተቀመጠ እቃ የለም",
    removeBtn: "አውጣ",
    pendingKycMessage: "⏳ ማመልከቻዎ እስኪጸድቅ ድረስ በትዕግስት ይጠብቁ። ማመልከቻዎ ከጸደቀ የሱቅ አገልግሎቱ ሙሉ በሙሉ ክፍት ይሆንልዎታል!",
    deleteBtn: "🗑️ አጥፋ",
    settingsBankTitle: "💳 የክፍያ አካውንቶች ማስተካከያ (በአድሚን እውቅና)",
    updateBankBtn: "የባንክ/ቴሌብር መረጃ ለአድሚን ላክ",
    bankUpdatePending: "⏳ የባንክ ማስተካከያ ጥያቄዎ ለአድሚን ተልኳል፤ በግምገማ ላይ ነው።",
    buyerAddressPh: "የዲሊቨሪ አድራሻዎን (ቦታ/ቤት ቁጥር) ያስገቡ",
    buyerPhonePh: "የእርስዎ ስልክ ቁጥር (ለዲሊቨሪ)"
  },
  en: {
    welcomeBack: "Welcome",
    unverified: "Unverified",
    pending: "Pending ⏳",
    verified: "Verified ✅",
    totalBalance: "TOTAL BALANCE",
    searchPlaceholder: "Search items...",
    categories: ["All", "Books", "Sacred Items", "Garments", "Icons"],
    buyNow: "Buy Now",
    addToCart: "Add to Cart 🛒",
    chatWithVendor: "💬 Chat with Vendor",
    vendorHub: "Vendor KYC",
    addProductTab: "Add Product",
    editProductTab: "Edit Product",
    usernamePh: "Telegram Username / Name",
    shopNamePh: "Store Name",
    phonePh: "Phone Number",
    sendOtp: "Send OTP",
    otpPh: "Enter OTP",
    telebirrPh: "Telebirr Phone Number (09... / 07...)",
    cbePh: "Commercial Bank (CBE) Account (1000...)",
    abyssiniaPh: "Bank of Abyssinia Account",
    idFrontLabel: "🪪 ID Front",
    idBackLabel: "🪪 ID Back",
    openCameraBtn: "📸 Camera",
    openGalleryBtn: "🖼️ Gallery",
    submitKyc: "Submit KYC & Bank Info",
    submitting: "Submitting...",
    uploadProdBtn: "Publish Product",
    updateProdBtn: "Update Product with Photo",
    recentActivity: "Order Tracking",
    noTx: "No transactions yet",
    navHome: "Market",
    navShop: "Shop/KYC",
    navWallet: "Orders",
    navSettings: "Settings",
    langName: "አማ",
    checkoutTitle: "Payment & Delivery Instructions",
    deliveryRefPh: "Delivery Payment Ref Number",
    itemRefPh: "Item Price Ref Number",
    confirmPay: "Confirm All Payments",
    cancel: "Cancel",
    releaseEscrowBtn: "✅ Item Received (Release Escrow)",
    escrowNote: "🛡️ Item price secured in escrow; delivery fee paid in advance.",
    userStatsTitle: "📊 Your Trading Statistics",
    myPosted: "Posted Items",
    mySold: "Sold Items",
    myBought: "Bought Items",
    instantSuccessMsg: "✅ Payment & Delivery reference saved successfully!",
    deliveryToggleLabel: "🏠 Home Delivery to my house",
    noDeliveryAvailableMsg: "ℹ️ No delivery available for this item, please call and pickup on site.",
    backToMarket: "← Back to Market",
    addedToCartMsg: "🛒 Item added to cart!",
    cartTitle: "🛒 Saved Cart Items",
    emptyCart: "Your cart is empty",
    removeBtn: "Remove",
    pendingKycMessage: "⏳ Please wait until your application is approved. Once approved, the shop service will be fully opened for you!",
    deleteBtn: "🗑️ Delete",
    settingsBankTitle: "💳 Payment Accounts (Admin Approval Required)",
    updateBankBtn: "Submit Account Changes to Admin",
    bankUpdatePending: "⏳ Your bank update request is sent to admin for review.",
    buyerAddressPh: "Enter your delivery address",
    buyerPhonePh: "Your phone number for delivery"
  }
};

const categoryMapAm = ["ሁሉም", "መጽሐፍት", "ንዋየ ቅድሳት", "አልባሳት", "ሥዕላት"];

export default function App() {
  const [lang, setLang] = useState<'am' | 'en'>('am');
  const [activeTab, setActiveTab] = useState<'market' | 'wallet' | 'shop' | 'settings'>('market');
  const [shopSubTab, setShopSubTab] = useState<'kyc' | 'add' | 'my_products'>('kyc');
  const [showBalance, setShowBalance] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [buyerNameInput, setBuyerNameInput] = useState('');
  const [showBuyerModal, setShowBuyerModal] = useState(false);

  // 💬 የቻት ስቴቶች (Chat States)
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const [tgUser, setTgUser] = useState<{ id?: number; username?: string; first_name?: string }>({
    id: undefined,
    username: 'guest_shopper',
    first_name: 'Guest'
  });

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorsList, setVendorsList] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [vendorStatus, setVendorStatus] = useState<string>('Unverified');
  const [adminFeedback, setAdminFeedback] = useState<string>('');
  
  const [myStoreName, setMyStoreName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  const bankInitialized = useRef(false);

  const [kycForm, setKycForm] = useState({
    username: '',
    store_name: '',
    phone: '',
    telebirr_account: '',
    cbe_account: '',
    abyssinia_account: '',
    id_front_image: '',
    id_back_image: ''
  });

  const [settingsBank, setSettingsBank] = useState({
    telebirr_account: '',
    cbe_account: '',
    abyssinia_account: ''
  });
  const [bankUpdateStatus, setBankUpdateStatus] = useState('');

  const [prodForm, setProdForm] = useState({
    id: null as number | null,
    name: '',
    price: '',
    category: 'መጽሐፍት',
    condition: 'አዲስ',
    city: 'አዲስ አበባ',
    location: '',
    has_delivery: true,
    delivery_fee: '100',
    quantity: '1',
    image: '',
    author: '',
    pub_year: '',
    publisher: '',
    book_sub_category: 'መንፈሳዊ',
    size: 'M',
    color: 'ጥቁር',
    material: 'ወርቅ/ብር',
    dimension: 'መካከለኛ'
  });

  const [cameraOpen, setCameraOpen] = useState(false);
  const [activePhotoSlot, setActivePhotoSlot] = useState<'id_front' | 'id_back' | 'product'>('id_front');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [viewingProduct, setViewingProduct] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryRef, setDeliveryRef] = useState('');
  const [itemRef, setItemRef] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});

  const t = translations[lang];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    let userObj = { id: undefined as number | undefined, username: 'guest_shopper', first_name: 'Guest' };
    const tg = (window as any).Telegram?.WebApp;
    
    if (tg && tg.initDataUnsafe?.user) {
      tg.ready();
      tg.expand();
      userObj = {
        id: tg.initDataUnsafe.user.id,
        username: tg.initDataUnsafe.user.username || tg.initDataUnsafe.user.first_name || 'user',
        first_name: tg.initDataUnsafe.user.first_name || 'User'
      };
      setTgUser(userObj);
      setKycForm(prev => ({ ...prev, username: userObj.username || '' }));
    } else {
      let savedShopper = localStorage.getItem('eotc_shopper_name');
      if (!savedShopper) {
        savedShopper = `ገዢ_${Math.floor(1000 + Math.random() * 9000)}`;
        localStorage.setItem('eotc_shopper_name', savedShopper);
      }
      userObj = { id: undefined, username: savedShopper, first_name: savedShopper };
      setTgUser(userObj);
    }

    syncData(userObj);
    const interval = setInterval(() => syncData(userObj), 6000);
    return () => clearInterval(interval);
  }, []);

  const syncData = async (currentUser: { id?: number; username?: string; first_name?: string }) => {
    const activeUsername = (currentUser.username || currentUser.first_name || 'guest_shopper').toLowerCase();
    try {
      const pRes = await fetch(`${API_BASE_URL}/products`);
      if (pRes.ok) {
        const pData = await pRes.json();
        if (Array.isArray(pData)) setProducts(pData);
      }
    } catch {}

    try {
      const vRes = await fetch(`${API_BASE_URL}/vendors`);
      if (vRes.ok) {
        const vData = await vRes.json();
        if (Array.isArray(vData)) {
          setVendorsList(vData);
          const myVendor = vData.find(
            (v: any) => (currentUser.id && v.telegram_id === currentUser.id) || (v.username && v.username.toLowerCase() === activeUsername)
          );
          if (myVendor) {
            setVendorStatus(myVendor.status);
            setAdminFeedback(myVendor.admin_feedback || '');
            setMyStoreName(myVendor.store_name);
            if (!bankInitialized.current) {
              setSettingsBank({
                telebirr_account: myVendor.telebirr_account || '',
                cbe_account: myVendor.cbe_account || '',
                abyssinia_account: myVendor.abyssinia_account || ''
              });
              bankInitialized.current = true;
            }
          }
        }
      }
    } catch {}

    try {
      const oRes = await fetch(`${API_BASE_URL}/orders`);
      if (oRes.ok) {
        const oData = await oRes.json();
        if (Array.isArray(oData)) setOrders(oData);
      }
    } catch {}

    // 💬 የቻት መልዕክቶችን በየሰከንዱ ማመሳሰል
    if (viewingProduct) {
      fetchChatMessages(viewingProduct.id);
    }
  };

  const fetchChatMessages = async (productId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chats/${productId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setChatMessages(data);
      }
    } catch {}
  };

  const handleSendChatMessage = async () => {
    if (!newMessage.trim() || !viewingProduct) return;
    const currentShopper = localStorage.getItem('eotc_shopper_name') || tgUser.username || 'ገዢ';
    
    try {
      const res = await fetch(`${API_BASE_URL}/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: viewingProduct.id,
          sender: currentShopper,
          receiver: viewingProduct.seller_username,
          message: newMessage.trim()
        })
      });
      if (res.ok) {
        setNewMessage('');
        fetchChatMessages(viewingProduct.id);
      }
    } catch {
      showToast("⚠️ መልዕክት መላክ አልተቻለም።");
    }
  };

  const processHighQualityImage = (canvas: HTMLCanvasElement, source: HTMLVideoElement | HTMLImageElement, srcW: number, srcH: number) => {
    const maxDim = 800;
    const scale = srcW > maxDim ? maxDim / srcW : 1;
    canvas.width = Math.round(srcW * scale);
    canvas.height = Math.round(srcH * scale);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    }
    return canvas.toDataURL('image/jpeg', 0.82);
  };

  const startCamera = async (target: 'id_front' | 'id_back' | 'product') => {
    setActivePhotoSlot(target);
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraOpen(false);
      showToast("⚠️ ካሜራ መክፈት አልተቻለም።");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const captureFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const base64 = processHighQualityImage(canvas, video, video.videoWidth || 800, video.videoHeight || 600);

    if (activePhotoSlot === 'id_front') {
      setKycForm(prev => ({ ...prev, id_front_image: base64 }));
      showToast("🪪 የመታወቂያ ፊት ተነስቷል!");
    } else if (activePhotoSlot === 'id_back') {
      setKycForm(prev => ({ ...prev, id_back_image: base64 }));
      showToast("🪪 የመታወቂያ ኋላ ተነስቷል!");
    } else {
      setProdForm(prev => ({ ...prev, image: base64 }));
      showToast("📸 ፎቶው በከፍተኛ ጥራት ተነስቷል!");
    }
    stopCamera();
  };

  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const base64 = processHighQualityImage(canvas, img, img.width, img.height);
        callback(base64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSendOtpUsername = async () => {
    if (!kycForm.username) return showToast("⚠️ ዩዘርናም ያስገቡ!");
    try {
      const res = await fetch(`${API_BASE_URL}/send-otp-username`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: kycForm.username.replace('@', '').trim(), telegram_id: tgUser.id || null })
      });
      const data = await res.json();
      setOtpSent(true);
      showToast(`📩 ኮድ፦ ${data.fallback_code}`);
    } catch {
      const fallback = Math.floor(1000 + Math.random() * 9000).toString();
      setOtpSent(true);
      showToast(`📩 ኮድ፦ ${fallback}`);
    }
  };

  const handleKycSubmit = async () => {
    if (!kycForm.username || !kycForm.store_name || !kycForm.phone || !kycForm.id_front_image || !kycForm.id_back_image) {
      return showToast("⚠️ እባክዎ ዩዘርናም፣ የሱቅ ስም፣ ስልክ እና መታወቂያ ፊትና ኋላ ይሙሉ!");
    }
    if (!kycForm.telebirr_account.trim() && !kycForm.cbe_account.trim() && !kycForm.abyssinia_account.trim()) {
      return showToast("⚠️ ቢያንስ ከሶስቱ የክፍያ አድራሻዎች (ቴሌብር፣ CBE፣ አቢሲኒያ) አንዱን መሙላት ግዴታ ነው!");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        username: kycForm.username.replace('@', '').trim(),
        store_name: kycForm.store_name.trim(),
        phone: kycForm.phone.trim(),
        telebirr_account: kycForm.telebirr_account.trim(),
        cbe_account: kycForm.cbe_account.trim(),
        abyssinia_account: kycForm.abyssinia_account.trim(),
        id_front_image: kycForm.id_front_image,
        id_back_image: kycForm.id_back_image,
        telegram_id: tgUser.id || null
      };

      const res = await fetch(`${API_BASE_URL}/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setVendorStatus('Pending');
        setMyStoreName(kycForm.store_name);
        setSettingsBank({
          telebirr_account: kycForm.telebirr_account.trim(),
          cbe_account: kycForm.cbe_account.trim(),
          abyssinia_account: kycForm.abyssinia_account.trim()
        });
        bankInitialized.current = true;
        showToast("✅ የ KYC ማመልከቻዎ ለአድሚን ተልኳል!");
      }
    } catch {
      showToast("⚠️ የሰርቨር ስህተት አጋጥሟል።");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBankSettings = async () => {
    if (!settingsBank.telebirr_account.trim() && !settingsBank.cbe_account.trim() && !settingsBank.abyssinia_account.trim()) {
      return showToast("⚠️ ቢያንስ ከሶስቱ የክፍያ አድራሻዎች አንዱን መሙላት አለብዎት!");
    }
    try {
      const activeUsername = (tgUser.username || tgUser.first_name || 'guest_shopper').toLowerCase();
      const res = await fetch(`${API_BASE_URL}/vendors/update-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: activeUsername,
          telebirr_account: settingsBank.telebirr_account.trim(),
          cbe_account: settingsBank.cbe_account.trim(),
          abyssinia_account: settingsBank.abyssinia_account.trim()
        })
      });
      if (res.ok) {
        setVendorStatus('Pending');
        setBankUpdateStatus(t.bankUpdatePending);
        showToast("✅ የባንክ ማስተካከያ ጥያቄዎ ለአድሚን ተልኳል!");
      }
    } catch {
      showToast("⚠️ ማስተካከል አልተቻለም።");
    }
  };

  const handleSaveProduct = async () => {
    if (vendorStatus !== 'Approved ✅') return showToast("⚠️ ሱቅዎ በአድሚን አልጸደቀም!");
    if (!prodForm.name.trim() || !prodForm.price || !prodForm.location.trim() || !prodForm.city.trim() || !prodForm.image) {
      return showToast("⚠️ እባክዎ የእቃ ስም፣ ዋጋ፣ ከተማ፣ አድራሻ እና ፎቶ በግዴታ ይሙሉ!");
    }

    const finalDeliveryFee = prodForm.has_delivery ? Number(prodForm.delivery_fee || 0) : 0;
    const payload = {
      ...prodForm,
      price: Number(prodForm.price),
      delivery_fee: finalDeliveryFee,
      seller_username: tgUser.username || 'vendor',
      store_name: myStoreName,
      seller_telegram_id: tgUser.id || null
    };

    try {
      const url = prodForm.id ? `${API_BASE_URL}/products/${prodForm.id}` : `${API_BASE_URL}/products`;
      const method = prodForm.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(prodForm.id ? "✏️ ማስታወቂያው ተስተካክሏል!" : "🎉 እቃው በቋሚነት ተጭኗል!");
        setProdForm({
          id: null,
          name: '',
          price: '',
          category: 'መጽሐፍት',
          condition: 'አዲስ',
          city: 'አዲስ አበባ',
          location: '',
          has_delivery: true,
          delivery_fee: '100',
          quantity: '1',
          image: '',
          author: '',
          pub_year: '',
          publisher: '',
          book_sub_category: 'መንፈሳዊ',
          size: 'M',
          color: 'ጥቁር',
          material: 'ወርቅ/ብር',
          dimension: 'መካከለኛ'
        });
        syncData(tgUser);
        setActiveTab('market');
      }
    } catch {
      showToast("⚠️ ማከናወን አልተቻለም።");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("እርግጠኛ ኖት ይህንን ማስታወቂያ ማጥፋት ይፈልጋሉ?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        showToast("🗑️ ማስታወቂያው ተሰርዟል!");
        syncData(tgUser);
      }
    } catch {
      showToast("⚠️ ማጥፋት አልተቻለም።");
    }
  };

  const handleEditProduct = (item: any) => {
    setProdForm({
      id: item.id,
      name: item.name || '',
      price: String(item.price || ''),
      category: item.category || 'መጽሐፍት',
      condition: item.condition || 'አዲስ',
      city: item.city || 'አዲስ አበባ',
      location: item.location || '',
      has_delivery: Number(item.delivery_fee || 0) > 0,
      delivery_fee: String(item.delivery_fee || '100'),
      quantity: item.quantity || '1',
      image: item.image || '',
      author: item.author || '',
      pub_year: item.pub_year || '',
      publisher: item.publisher || '',
      book_sub_category: item.book_sub_category || 'መንፈሳዊ',
      size: item.size || 'M',
      color: item.color || 'ጥቁር',
      material: item.material || 'ወርቅ/ብር',
      dimension: item.dimension || 'መካከለኛ'
    });
    setShopSubTab('add');
    setActiveTab('shop');
  };

  const getSellerInfo = (sellerUsername: string, productObj?: any) => {
    const cleanSellerName = (sellerUsername || '').replace('@', '').trim().toLowerCase();
    const v = vendorsList.find(item => (item.username || '').replace('@', '').trim().toLowerCase() === cleanSellerName);
    const soldCount = orders.filter(
      o => (o.seller_username || '').replace('@', '').trim().toLowerCase() === cleanSellerName && (o.status?.includes('Released') || o.status?.includes('Verified') || o.status?.includes('ተረጋግጧል'))
    ).length;

    return {
      username: sellerUsername || 'vendor',
      store_name: v?.store_name || productObj?.store_name || 'EOTC Official Store',
      phone: v?.phone || productObj?.phone || '0910573232',
      city: productObj?.city || 'አዲስ አበባ',
      location: productObj?.location || 'ቦሌ',
      address: `${productObj?.city || 'አዲስ አበባ'}, ${productObj?.location || 'ቦሌ'}`,
      soldCount,
      telebirr_account: (v?.telebirr_account && v.telebirr_account.trim() !== '') ? v.telebirr_account : 'አልተመዘገበም',
      cbe_account: (v?.cbe_account && v.cbe_account.trim() !== '') ? v.cbe_account : 'አልተመዘገበም',
      abyssinia_account: (v?.abyssinia_account && v.abyssinia_account.trim() !== '') ? v.abyssinia_account : 'አልተመዘገበም'
    };
  };

  const handleProceedToPayment = () => {
    const buyerName = buyerNameInput.trim();
    if (!buyerName) {
      return showToast("⚠️ እባክዎ ስምዎን ወይም ስልክ ቁጥርዎን ያስገቡ!");
    }
    localStorage.setItem('eotc_shopper_name', buyerName);
    setShowBuyerModal(false);
    executePayment(buyerName);
  };

  const executePayment = async (shopperName: string) => {
    const deliveryFee = Number(selectedProduct.delivery_fee || 0);
    const hasDeliveryService = deliveryFee > 0;

    if (hasDeliveryService) {
      if (!buyerAddress.trim() || !buyerPhone.trim()) {
        return showToast("⚠️ እባክዎ የዲሊቨሪ አድራሻዎን እና ስልክ ቁጥር ያስገቡ!");
      }
      if (!deliveryRef.trim()) {
        return showToast("⚠️ የዲሊቨሪ ክፍያ የደረሰኝ ሪፈረስ ቁጥር ያስገቡ!");
      }
    }
    if (!itemRef.trim()) {
      return showToast("⚠️ የእቃ ዋጋ የደረሰኝ ሪፈረስ ቁጥር (Item Ref) ያስገቡ!");
    }

    const combinedRef = hasDeliveryService 
      ? `Shopper: ${shopperName} | Address: ${buyerAddress} | Phone: ${buyerPhone} | DeliveryRef: ${deliveryRef} | ItemRef: ${itemRef}` 
      : `Shopper: ${shopperName} | Pickup | ItemRef: ${itemRef}`;
    
    const totalAmount = hasDeliveryService ? Number(selectedProduct.price) + deliveryFee : Number(selectedProduct.price);

    try {
      await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyer: shopperName,
          buyer_telegram_id: tgUser.id || null,
          seller_username: selectedProduct.seller_username,
          product_name: selectedProduct.name,
          amount: totalAmount,
          payment_method: hasDeliveryService ? 'Telebirr/Bank + Delivery Fee' : 'Telebirr/Bank Pickup',
          tx_ref: combinedRef,
          status: 'Escrow Under Protection 🛡️'
        })
      });
      showToast(t.instantSuccessMsg);
    } catch {
      showToast("⚠️ ማከናወን አልተቻለም።");
    }
    setSelectedProduct(null);
    setViewingProduct(null);
    setBuyerAddress('');
    setBuyerPhone('');
    setItemRef('');
    setDeliveryRef('');
    setBuyerNameInput('');
    setActiveTab('wallet');
  };

  const handleConfirmPayment = () => {
    const savedName = localStorage.getItem('eotc_shopper_name');
    if (!savedName) {
      setShowBuyerModal(true);
      return;
    }
    executePayment(savedName);
  };

  const handleBuyerReleaseEscrow = async (orderId: number) => {
    try {
      await fetch(`${API_BASE_URL}/orders/${orderId}/approve`, { method: 'POST' });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Released to Vendor ✅' } : o));
      showToast("✅ ገንዘቡ ለሻጩ ተለቀቀ!");
    } catch {
      showToast("⚠️ ማከናወን አልተቻለም።");
    }
  };

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 0 || item.category === categoryMapAm[selectedCategory];
    const matchesSearch = !searchQuery.trim() || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const escrowBalance = orders
    .filter(o => o.status && (o.status.includes('Escrow') || o.status.includes('በሂደት')))
    .reduce((sum, o) => sum + Number(o.amount || 0), 0);

  const activeUsername = (tgUser.username || tgUser.first_name || 'guest_shopper').toLowerCase();
  const myProducts = products.filter(p => (p.seller_username || '').replace('@', '').trim().toLowerCase() === activeUsername);
  const myPostedCount = myProducts.length;
  const mySoldCount = orders.filter(o => (o.seller_username || '').replace('@', '').trim().toLowerCase() === activeUsername && o.status?.includes('Released')).length;
  const myBoughtCount = orders.filter(o => o.buyer?.toLowerCase() === activeUsername || (localStorage.getItem('eotc_shopper_name') && o.buyer?.toLowerCase() === localStorage.getItem('eotc_shopper_name')?.toLowerCase())).length;

  return (
    <div className="min-h-screen bg-[#161A20] text-white pb-28 font-sans select-none antialiased">
      {notification && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-[#2C221E] border border-[#FB923C] text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold text-center animate-bounce">
          {notification}
        </div>
      )}

      {/* 👤 ገዢው ስሙን የሚያስገባበት ሞዳል */}
      {showBuyerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E232B] w-full max-w-sm rounded-3xl p-5 border border-orange-500/40 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-[#FB923C]">👤 የእርስዎ ስም ወይም ስልክ ቁጥር</h3>
            <p className="text-xs text-gray-300">ትዕዛዝዎን ለመከታተል የሚረዳዎትን ስምዎን ወይም ስልክዎን ያስገቡ፦</p>
            <input 
              value={buyerNameInput} 
              onChange={e => setBuyerNameInput(e.target.value)} 
              type="text" 
              placeholder="ለምሳሌ፦ አበበ ከበደ ወይም 0911..." 
              className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 focus:border-[#FB923C] focus:outline-none"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowBuyerModal(false)} className="flex-1 bg-[#262C36] text-gray-300 text-xs font-bold py-3 rounded-xl">
                ሰርዝ
              </button>
              <button onClick={handleProceedToPayment} className="flex-1 bg-[#FB923C] text-black text-xs font-bold py-3 rounded-xl">
                ቀጥል (Continue)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💬 የቻት ፖፕአፕ ሞዳል (In-App Chat Modal) */}
      {showChatModal && viewingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E232B] w-full max-w-sm rounded-3xl p-5 border border-orange-500/40 space-y-4 shadow-2xl flex flex-col h-[75vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#FB923C]">💬 ከሻጭ ጋር ውይይት</h3>
                <p className="text-[10px] text-gray-400">እቃ፦ {viewingProduct.name}</p>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-xs text-gray-400 font-bold px-2 py-1">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 p-2 bg-[#161A20] rounded-2xl border border-white/5">
              {chatMessages.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-10">እስካሁን የተደረገ መልዕክት የለም። ውይይት ይጀምሩ!</p>
              ) : (
                chatMessages.map((msg, idx) => {
                  const currentShopper = localStorage.getItem('eotc_shopper_name') || tgUser.username || 'ገዢ';
                  const isMe = msg.sender.toLowerCase() === currentShopper.toLowerCase();
                  return (
                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] text-gray-400 px-1">@{msg.sender}</span>
                      <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs ${isMe ? 'bg-[#FB923C] text-black font-semibold rounded-br-none' : 'bg-[#2A303C] text-white rounded-bl-none'}`}>
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <input 
                value={newMessage} 
                onChange={e => setNewMessage(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                type="text" 
                placeholder="መልዕክት ይጻፉ..." 
                className="flex-1 bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 focus:outline-none focus:border-[#FB923C]"
              />
              <button onClick={handleSendChatMessage} className="bg-[#FB923C] text-black font-bold text-xs px-4 rounded-xl">
                ላክ
              </button>
            </div>
          </div>
        </div>
      )}

      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1E232B] rounded-3xl p-4 border border-orange-500/40 space-y-4 text-center shadow-2xl">
            <h3 className="text-sm font-bold text-[#FB923C]">ካሜራ</h3>
            <div className="relative w-full h-64 bg-black rounded-2xl overflow-hidden border border-[#FB923C]">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <button onClick={stopCamera} className="flex-1 bg-[#262C36] text-gray-300 text-xs font-bold py-3 rounded-xl">ሰርዝ</button>
              <button onClick={captureFromCamera} className="flex-1 bg-[#FB923C] text-black text-xs font-bold py-3 rounded-xl">📸 ፎቶ አንሳ</button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#161A20]/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-white/5 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="font-bold text-white text-sm">✥</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white">EOTC Market</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCartModal(true)} className="relative bg-[#222831] text-[#FB923C] text-xs font-bold px-3 py-1.5 rounded-full border border-orange-500/20">
            🛒 {cartItems.length}
          </button>
          <button onClick={() => setLang(lang === 'am' ? 'en' : 'am')} className="bg-[#222831] text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
            🌐 {t.langName}
          </button>
          <div className="bg-[#222831] text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-white/5">
            <span>{vendorStatus === 'Approved ✅' ? t.verified : vendorStatus === 'Pending' ? t.pending : t.unverified}</span>
          </div>
        </div>
      </header>

      <main className="px-5 pt-4 max-w-md mx-auto space-y-5">
        <section className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium">{t.welcomeBack}</p>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              {localStorage.getItem('eotc_shopper_name') || 'ክቡር ገዢ'}
            </h2>
          </div>
        </section>

        {adminFeedback && vendorStatus !== 'Approved ✅' && (
          <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-2xl space-y-1">
            <p className="text-xs font-bold text-red-400">⚠️ ከአድሚን የተላከ የማስተካከያ መልእክት፦</p>
            <p className="text-xs text-gray-200">{adminFeedback}</p>
          </div>
        )}

        {/* 🏠 1. ገበያ */}
        {activeTab === 'market' && !viewingProduct && (
          <section className="space-y-4">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder={t.searchPlaceholder} className="w-full bg-[#1E232B] text-white text-xs rounded-2xl px-4 py-3 border border-white/5 focus:border-[#FB923C] focus:outline-none" />
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {t.categories.map((cat, idx) => (
                <button key={idx} onClick={() => setSelectedCategory(idx)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${selectedCategory === idx ? 'bg-[#3A281E] text-[#FB923C] border border-orange-500/30' : 'bg-[#1E232B] text-gray-400'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => { setViewingProduct(item); fetchChatMessages(item.id); }} 
                  className="bg-[#1E232B] rounded-2xl p-3.5 border border-white/5 hover:border-[#FB923C]/50 transition cursor-pointer flex flex-col justify-between shadow-md active:scale-95"
                >
                  <div>
                    <div className="h-28 rounded-xl bg-gradient-to-br from-[#262C36] to-[#1A1E26] mb-3 flex items-center justify-center relative overflow-hidden">
                      {item.image ? <img src={item.image} loading="lazy" alt="" className="w-full h-full object-cover" /> : <span className="text-3xl">{item.category === 'መጽሐፍት' ? '📚' : '🛍️'}</span>}
                    </div>
                    <h4 className="text-sm font-extrabold text-white underline decoration-[#FB923C]/60 underline-offset-4 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1">📍 {item.city || 'አዲስ አበባ'}, {item.location || 'ቦሌ'}</p>
                    <p className="text-sm font-black text-[#FB923C] mt-1.5">{item.price} ETB</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 📦 2. የእቃው ዝርዝር */}
        {activeTab === 'market' && viewingProduct && (() => {
          const cat = viewingProduct.category;
          const seller = getSellerInfo(viewingProduct.seller_username, viewingProduct);
          const deliveryFee = Number(viewingProduct.delivery_fee || 0);

          return (
            <section className="bg-[#1E232B] rounded-3xl p-5 border border-white/5 space-y-4 shadow-xl">
              <button onClick={() => setViewingProduct(null)} className="text-xs text-[#FB923C] font-bold flex items-center gap-1">
                {t.backToMarket}
              </button>

              {cat === 'መጽሐፍት' ? (
                <>
                  <div className="bg-gradient-to-br from-[#232933] to-[#161A20] p-4 rounded-2xl border border-orange-500/30 flex gap-4 items-center shadow-lg">
                    <div className="w-28 h-40 rounded-xl bg-white/10 overflow-hidden border border-white/15 flex-shrink-0 flex items-center justify-center shadow-md">
                      {viewingProduct.image ? <img src={viewingProduct.image} alt="" className="w-full h-full object-cover" /> : <span className="text-5xl">📚</span>}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="inline-block bg-[#3A281E] text-[#FB923C] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
                        📂 {viewingProduct.book_sub_category || 'መንፈሳዊ'} መጽሐፍ
                      </span>
                      <h3 className="text-base font-extrabold text-white leading-snug">{viewingProduct.name}</h3>
                      <p className="text-xs text-gray-300">✍️ <strong>ጸሐፊ፦</strong> {viewingProduct.author || 'ያልተጠቀሰ'}</p>
                      <div className="pt-2">
                        <span className="text-[10px] text-gray-400 block">የመሸጫ ዋጋ</span>
                        <span className="text-xl font-black text-[#FB923C]">{viewingProduct.price} ETB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#161A20] p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
                    <h4 className="text-[#FB923C] font-bold border-b border-white/10 pb-1.5">📖 የመጽሐፉ ሙሉ መረጃ</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-gray-200">
                      <p>📕 <strong>ርዕስ፦</strong> {viewingProduct.name}</p>
                      <p>✍️ <strong>ጸሐፊ፦</strong> {viewingProduct.author || 'ያልተጠቀሰ'}</p>
                      <p>📅 <strong>የህትመት ዘመን፦</strong> {viewingProduct.pub_year || 'ያልተጠቀሰ'}</p>
                      <p>🏢 <strong>አሳታሚ፦</strong> {viewingProduct.publisher || 'ያልተጠቀሰ'}</p>
                      <p>✨ <strong>ሁኔታ፦</strong> <span className="text-emerald-400 font-bold">{viewingProduct.condition || 'አዲስ'}</span></p>
                      <p>🏙️ <strong>ከተማ፦</strong> {seller.city}</p>
                      <p>📍 <strong>ቦታ፦</strong> {seller.location}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-52 rounded-2xl bg-[#161A20] overflow-hidden border border-white/10 flex items-center justify-center relative">
                    {viewingProduct.image ? <img src={viewingProduct.image} alt="" className="w-full h-full object-cover" /> : <span className="text-6xl">🛍️</span>}
                    <span className="absolute top-3 left-3 bg-black/80 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/30">
                      ሁኔታ፦ {viewingProduct.condition || 'አዲስ'}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-[#252B37] to-[#2C221E] p-4 rounded-2xl border border-orange-500/30 flex items-center justify-between gap-3 shadow-md">
                    <div>
                      <span className="text-[10px] text-orange-300 font-bold uppercase">🛍️ {cat}</span>
                      <h3 className="text-base font-extrabold text-white mt-0.5">{viewingProduct.name}</h3>
                    </div>
                    <div className="text-right bg-[#161A20] px-3.5 py-2 rounded-xl border border-orange-500/40">
                      <span className="text-[9px] text-gray-400 block">የመሸጫ ዋጋ</span>
                      <span className="text-lg font-black text-[#FB923C] whitespace-nowrap">{viewingProduct.price} ETB</span>
                    </div>
                  </div>
                </>
              )}

              {/* 💬 ከሻጭ ጋር መወያያ (Chat) ቁልፍ */}
              <button 
                onClick={() => { fetchChatMessages(viewingProduct.id); setShowChatModal(true); }}
                className="w-full bg-[#252B37] text-[#FB923C] border border-orange-500/30 text-xs font-bold py-3 rounded-xl shadow active:scale-95 transition flex items-center justify-center gap-2"
              >
                {t.chatWithVendor}
              </button>

              <div className="bg-[#161A20] p-4 rounded-2xl border border-orange-500/30 space-y-2 text-xs">
                <h4 className="text-xs font-bold text-[#FB923C]">🚚 የዴሊቨሪ ሁኔታ</h4>
                {deliveryFee > 0 ? (
                  <p className="text-emerald-400 font-bold">✅ የቤት ለቤት ዴሊቨሪ አገልግሎት አለው (+{deliveryFee} ETB)</p>
                ) : (
                  <p className="text-amber-400 font-bold">{t.noDeliveryAvailableMsg}</p>
                )}
              </div>

              <div className="bg-[#161A20] p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-[#FB923C] font-bold">🏪 የሻጩ መረጃ እና ታማኝነት</h4>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    🏆 እስካሁን {seller.soldCount} እቃ ሸጧል
                  </span>
                </div>

                <div className="space-y-1 text-gray-300">
                  <p>👤 <strong>የሻጩ ስም፦</strong> @{seller.username} ({seller.store_name})</p>
                  <p>📍 <strong>የሻጩ አድራሻ፦</strong> {seller.address}</p>
                  <p>📞 <strong>የሻጩ ስልክ ቁጥር፦</strong> <a href={`tel:${seller.phone}`} className="text-orange-300 underline font-bold">{seller.phone}</a></p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setCartItems([...cartItems, viewingProduct]);
                    showToast(t.addedToCartMsg);
                  }} 
                  className="flex-1 bg-[#262C36] text-[#FB923C] border border-orange-500/30 text-xs font-bold py-3.5 rounded-xl shadow active:scale-95 transition"
                >
                  {t.addToCart}
                </button>
                <button 
                  onClick={() => setSelectedProduct(viewingProduct)} 
                  className="flex-1 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-black text-xs font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition"
                >
                  {t.buyNow}
                </button>
              </div>
            </section>
          );
        })()}

        {/* 🏪 3. ሱቅ / ሻጭ KYC */}
        {activeTab === 'shop' && (
          <div className="space-y-5">
            <section className="bg-[#1E232B] rounded-3xl p-5 border border-white/5 space-y-4 shadow-lg">
              <div className="flex gap-2">
                <button onClick={() => setShopSubTab('kyc')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${shopSubTab === 'kyc' ? 'bg-[#3A281E] text-[#FB923C] border border-orange-500/30' : 'bg-[#161A20] text-gray-400'}`}>
                  🪪 {t.vendorHub}
                </button>
                <button onClick={() => setShopSubTab('add')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${shopSubTab === 'add' ? 'bg-[#3A281E] text-[#FB923C] border border-orange-500/30' : 'bg-[#161A20] text-gray-400'}`}>
                  📦 {prodForm.id ? t.editProductTab : t.addProductTab}
                </button>
                {vendorStatus === 'Approved ✅' && (
                  <button onClick={() => setShopSubTab('my_products')} className={`px-4 py-2.5 rounded-xl text-xs font-bold ${shopSubTab === 'my_products' ? 'bg-[#3A281E] text-[#FB923C] border border-orange-500/30' : 'bg-[#161A20] text-gray-400'}`}>
                    📋 እቃዎቼ ({myProducts.length})
                  </button>
                )}
              </div>

              {shopSubTab === 'kyc' ? (
                <div>
                  {vendorStatus === 'Approved ✅' ? (
                    <div className="bg-[#161A20] border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 shadow-xl">
                      <span className="text-3xl">🎉</span>
                      <p className="text-xs font-bold text-emerald-300 leading-relaxed">
                        እንኳን ደስ አሎት! ማመልከቻዎ በአድሚን ጸድቋል። አሁን ሱቅዎ ሙሉ በሙሉ ክፍት ነው፤ እቃዎችዎን መለጠፍና ማስተካከል ይችላሉ።
                      </p>
                    </div>
                  ) : vendorStatus === 'Pending' ? (
                    <div className="bg-[#161A20] border border-amber-500/40 p-6 rounded-2xl text-center space-y-3 shadow-xl">
                      <span className="text-3xl">⏳</span>
                      <p className="text-xs font-bold text-amber-300 leading-relaxed">
                        {t.pendingKycMessage}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[11px] text-gray-400">💡 እቃ ለመሸጥ ዩዘርናም፣ ስልክ እና <strong>ቢያንስ ከሶስቱ የክፍያ አድራሻዎች (ቴሌብር፣ CBE፣ አቢሲኒያ) አንዱን</strong> መሙላት ግዴታ ነው፦</p>
                      
                      <input value={kycForm.username} onChange={e => setKycForm(prev => ({...prev, username: e.target.value}))} type="text" placeholder={t.usernamePh} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                      <input value={kycForm.store_name} onChange={e => setKycForm(prev => ({...prev, store_name: e.target.value}))} type="text" placeholder={t.shopNamePh} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                      
                      <div className="flex gap-2">
                        <input value={kycForm.phone} onChange={e => setKycForm(prev => ({...prev, phone: e.target.value}))} type="tel" placeholder={t.phonePh} className="flex-1 bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                        <button type="button" onClick={handleSendOtpUsername} className="bg-[#3A281E] text-[#FB923C] border border-orange-500/30 text-xs font-bold px-3.5 rounded-xl whitespace-nowrap">
                          {t.sendOtp}
                        </button>
                      </div>

                      {otpSent && <input value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} type="text" placeholder={t.otpPh} className="w-full bg-[#161A20] text-[#FB923C] font-bold text-xs rounded-xl px-3.5 py-3 border border-orange-500/40" />}

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-[#FB923C] font-bold">💳 የክፍያ አካውንቶችዎ (ቢያንስ 1 መሞላት አለበት) *</p>
                        
                        <div>
                          <label className="text-[10px] text-gray-400">📱 የቴሌብር ስልክ ቁጥር</label>
                          <input 
                            name="telebirr_account"
                            value={kycForm.telebirr_account} 
                            onChange={e => setKycForm(prev => ({...prev, telebirr_account: e.target.value}))} 
                            type="tel" 
                            placeholder={t.telebirrPh} 
                            className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" 
                          />
                        </div>
                        
                        <div>
                          <label className="text-[10px] text-gray-400">🏦 የንግድ ባንክ (CBE) ሂሳብ ቁጥር</label>
                          <input 
                            name="cbe_account"
                            value={kycForm.cbe_account} 
                            onChange={e => setKycForm(prev => ({...prev, cbe_account: e.target.value}))} 
                            type="text" 
                            placeholder={t.cbePh} 
                            className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" 
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400">🏦 የአቢሲኒያ ባንክ ሂሳብ ቁጥር</label>
                          <input 
                            name="abyssinia_account"
                            value={kycForm.abyssinia_account} 
                            onChange={e => setKycForm(prev => ({...prev, abyssinia_account: e.target.value}))} 
                            type="text" 
                            placeholder={t.abyssiniaPh} 
                            className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-gray-300 font-semibold">{t.idFrontLabel}</p>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button type="button" onClick={() => startCamera('id_front')} className="bg-[#3A281E] border border-[#FB923C]/50 text-[#FB923C] text-xs font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5">
                            {t.openCameraBtn}
                          </button>
                          <label className="bg-[#161A20] border border-white/10 text-gray-300 text-xs font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                            {t.openGalleryBtn}
                            <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && compressImage(e.target.files[0], base64 => setKycForm(prev => ({...prev, id_front_image: base64})))} className="hidden" />
                          </label>
                        </div>
                        {kycForm.id_front_image && <div className="w-full h-28 rounded-xl overflow-hidden bg-white border border-emerald-500/40 mt-1"><img src={kycForm.id_front_image} alt="" className="w-full h-full object-contain" /></div>}
                      </div>

                      <div className="space-y-2 pt-2">
                        <p className="text-xs text-gray-300 font-semibold">{t.idBackLabel}</p>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button type="button" onClick={() => startCamera('id_back')} className="bg-[#3A281E] border border-[#FB923C]/50 text-[#FB923C] text-xs font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5">
                            {t.openCameraBtn}
                          </button>
                          <label className="bg-[#161A20] border border-white/10 text-gray-300 text-xs font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                            {t.openGalleryBtn}
                            <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && compressImage(e.target.files[0], base64 => setKycForm(prev => ({...prev, id_back_image: base64})))} className="hidden" />
                          </label>
                        </div>
                        {kycForm.id_back_image && <div className="w-full h-28 rounded-xl overflow-hidden bg-white border border-emerald-500/40 mt-1"><img src={kycForm.id_back_image} alt="" className="w-full h-full object-contain" /></div>}
                      </div>

                      <button disabled={isSubmitting} onClick={handleKycSubmit} className="w-full bg-gradient-to-r from-[#F97316] to-[#FB923C] text-black font-bold text-xs py-3.5 rounded-xl shadow-lg mt-3">
                        {isSubmitting ? t.submitting : t.submitKyc}
                      </button>
                    </div>
                  )}
                </div>
              ) : shopSubTab === 'add' ? (
                <div className="space-y-3">
                  {vendorStatus !== 'Approved ✅' ? (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl text-center space-y-2">
                      <span className="text-2xl">⏳</span>
                      <p className="text-xs font-bold text-amber-300">ሱቅዎ ገና በአድሚን አልጸደቀም</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#FB923C]">
                          {prodForm.id ? "✏️ ማስታወቂያ ማስተካከያ (Edit)" : "📦 አዲስ እቃ መጫኛ"}
                        </h4>
                        {prodForm.id && (
                          <button onClick={() => setProdForm({ id: null, name: '', price: '', category: 'መጽሐፍት', condition: 'አዲስ', city: 'አዲስ አበባ', location: '', has_delivery: true, delivery_fee: '100', quantity: '1', image: '', author: '', pub_year: '', publisher: '', book_sub_category: 'መንፈሳዊ', size: 'M', color: 'ጥቁር', material: 'ወርቅ/ብር', dimension: 'መካከለኛ' })} className="text-[10px] text-gray-400 underline">
                            አዲስ ለመጫን ቀይር
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-400">ዋና ምድብ *</label>
                          <select value={prodForm.category} onChange={e => setProdForm(prev => ({...prev, category: e.target.value}))} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3 py-3 border border-white/10 mt-1">
                            <option value="መጽሐፍት">መጽሐፍት</option>
                            <option value="ንዋየ ቅድሳት">ንዋየ ቅድሳት</option>
                            <option value="አልባሳት">አልባሳት</option>
                            <option value="ሥዕላት">ሥዕላት</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400">የእቃው ሁኔታ *</label>
                          <select value={prodForm.condition} onChange={e => setProdForm(prev => ({...prev, condition: e.target.value}))} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3 py-3 border border-white/10 mt-1">
                            <option value="አዲስ">አዲስ (New)</option>
                            <option value="አሮጌ (ያገለገለ)">አሮጌ / ያገለገለ</option>
                          </select>
                        </div>
                      </div>

                      <input value={prodForm.name} onChange={e => setProdForm(prev => ({...prev, name: e.target.value}))} type="text" placeholder="የእቃው ስም (Required) *" className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />

                      {prodForm.category === 'መጽሐፍት' && (
                        <div className="bg-[#161A20]/70 p-3 rounded-2xl border border-orange-500/30 space-y-2.5">
                          <p className="text-[11px] font-bold text-[#FB923C]">📚 የመጽሐፍ ዝርዝር መሙያ</p>
                          <div className="grid grid-cols-2 gap-2">
                            <input value={prodForm.author} onChange={e => setProdForm(prev => ({...prev, author: e.target.value}))} type="text" placeholder="የጸሐፊው ስም" className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3 py-2.5 border border-white/10" />
                            <input value={prodForm.pub_year} onChange={e => setProdForm(prev => ({...prev, pub_year: e.target.value}))} type="text" placeholder="የህትመት ዘመን" className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3 py-2.5 border border-white/10" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input value={prodForm.publisher} onChange={e => setProdForm(prev => ({...prev, publisher: e.target.value}))} type="text" placeholder="አሳታሚ" className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3 py-2.5 border border-white/10" />
                            <select value={prodForm.book_sub_category} onChange={e => setProdForm(prev => ({...prev, book_sub_category: e.target.value}))} className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3 py-2.5 border border-white/10">
                              <option value="መንፈሳዊ">መንፈሳዊ</option>
                              <option value="የትምህርት">የትምህርት</option>
                              <option value="የሳይንስ">የሳይንስ</option>
                              <option value="ታሪክ እና ሌሎች">ታሪክ እና ሌሎች</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <input value={prodForm.price} onChange={e => setProdForm(prev => ({...prev, price: e.target.value}))} type="number" placeholder="ዋጋ (ETB) *" className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                        
                        <div className="bg-[#161A20] p-2 rounded-xl border border-white/10 flex flex-col justify-center">
                          <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-[10px] font-bold text-gray-300">ዴሊቨሪ አለው?</span>
                            <input 
                              type="checkbox" 
                              checked={prodForm.has_delivery} 
                              onChange={e => setProdForm(prev => ({...prev, has_delivery: e.target.checked}))} 
                              className="w-4 h-4 accent-[#FB923C] cursor-pointer" 
                            />
                          </label>
                        </div>
                      </div>

                      {prodForm.has_delivery && (
                        <input value={prodForm.delivery_fee} onChange={e => setProdForm(prev => ({...prev, delivery_fee: e.target.value}))} type="number" placeholder="የዴሊቨሪ ዋጋ (ETB)" className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <input value={prodForm.city} onChange={e => setProdForm(prev => ({...prev, city: e.target.value}))} type="text" placeholder="ከተማ (አ.አ) *" className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                        <input value={prodForm.location} onChange={e => setProdForm(prev => ({...prev, location: e.target.value}))} type="text" placeholder="ቦታ (ቦሌ) *" className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => startCamera('product')} className="bg-[#3A281E] text-[#FB923C] text-xs font-bold py-3 rounded-xl border border-[#FB923C]/30">📸 ካሜራ</button>
                        <label className="bg-[#161A20] text-gray-300 text-xs font-bold py-3 rounded-xl flex items-center justify-center cursor-pointer border border-white/10">
                          🖼️ ጋለሪ (ማንኛውም ጥራት)
                          <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && compressImage(e.target.files[0], base64 => setProdForm(prev => ({...prev, image: base64})))} className="hidden" />
                        </label>
                      </div>
                      {prodForm.image && <img src={prodForm.image} alt="" className="w-full h-28 object-cover rounded-xl border border-emerald-500/40" />}
                      <button onClick={handleSaveProduct} className="w-full bg-[#FB923C] text-black font-bold text-xs py-3.5 rounded-xl shadow-lg">
                        {prodForm.id ? t.updateProdBtn : t.uploadProdBtn}
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#FB923C]">የለጠፏቸው እቃዎች ዝርዝር (አስተካክል ወይም አጥፋ)</h4>
                  {myProducts.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-6">እስካሁን የለጠፉት እቃ የለም።</p>
                  ) : (
                    <div className="space-y-2">
                      {myProducts.map(p => (
                        <div key={p.id} className="bg-[#161A20] p-3 rounded-2xl flex items-center justify-between gap-2 border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center">
                              {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <span className="text-lg">🛍️</span>}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{p.name}</p>
                              <p className="text-xs text-[#FB923C] font-bold">{p.price} ETB</p>
                            </div>
                          </div>
                          <div className="flex gap-1.5">
                            <button onClick={() => handleEditProduct(p)} className="bg-[#3A281E] text-[#FB923C] border border-orange-500/30 text-[10px] font-bold px-3 py-2 rounded-xl">
                              ✏️ Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2.5 py-2 rounded-xl">
                              {t.deleteBtn}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {/* 📋 4. ትዕዛዞች */}
        {activeTab === 'wallet' && (
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase">{t.recentActivity}</h3>
            {orders.length === 0 ? (
              <div className="bg-[#1E232B] rounded-3xl p-10 text-center border border-white/5"><p className="text-gray-500 text-sm">{t.noTx}</p></div>
            ) : (
              orders.map(o => (
                <div key={o.id} className="bg-[#1E232B] p-4 rounded-2xl border border-white/5 space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">{o.product_name}</p>
                      <p className="text-[11px] text-gray-400">Ref: <code className="text-orange-300">{o.tx_ref}</code></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-[#FB923C]">{o.amount} ETB</p>
                      <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300">{o.status}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-300 bg-[#161A20] p-2.5 rounded-xl border border-white/5">{t.escrowNote}</p>
                  {(!o.status.includes('Released') && !o.status.includes('ተለቋል')) && (
                    <button onClick={() => handleBuyerReleaseEscrow(o.id)} className="w-full bg-emerald-500 text-black text-xs font-bold py-2.5 rounded-xl shadow active:scale-95 transition">
                      {t.releaseEscrowBtn}
                    </button>
                  )}
                </div>
              ))
            )}
          </section>
        )}

        {/* ⚙️ 5. ሴቲንግ */}
        {activeTab === 'settings' && (
          <section className="space-y-4">
            <div className="bg-[#1E232B] rounded-3xl p-5 border border-white/5 space-y-3 shadow-lg">
              <h3 className="text-xs font-bold text-[#FB923C] uppercase">💳 {t.settingsBankTitle}</h3>
              <p className="text-[11px] text-gray-400">ከሶስቱ የክፍያ አድራሻዎች ቢያንስ አንዱን ሞልተው ማስተካከል ይችላሉ (አድሚን ሲያጸድቀው ስራ ላይ ይውላል)፦</p>
              
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="text-[10px] text-gray-400">📱 የቴሌብር ስልክ ቁጥር</label>
                  <input value={settingsBank.telebirr_account} onChange={e => setSettingsBank(prev => ({...prev, telebirr_account: e.target.value}))} type="tel" placeholder={t.telebirrPh} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400">🏦 የንግድ ባንክ (CBE) ሂሳብ ቁጥር</label>
                  <input value={settingsBank.cbe_account} onChange={e => setSettingsBank(prev => ({...prev, cbe_account: e.target.value}))} type="text" placeholder={t.cbePh} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400">🏦 የአቢሲኒያ ባንክ ሂሳብ ቁጥር</label>
                  <input value={settingsBank.abyssinia_account} onChange={e => setSettingsBank(prev => ({...prev, abyssinia_account: e.target.value}))} type="text" placeholder={t.abyssiniaPh} className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-3 border border-white/10 mt-0.5" />
                </div>
              </div>

              <button onClick={handleUpdateBankSettings} className="w-full bg-[#3A281E] text-[#FB923C] border border-orange-500/30 text-xs font-bold py-3 rounded-xl shadow">
                {t.updateBankBtn}
              </button>
              {bankUpdateStatus && <p className="text-[11px] text-amber-400 text-center">{bankUpdateStatus}</p>}
            </div>

            <div className="bg-[#1E232B] rounded-3xl p-5 border border-white/5 space-y-3 shadow-lg">
              <h3 className="text-xs font-bold text-[#FB923C] uppercase">{t.userStatsTitle}</h3>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-[#161A20] p-3 rounded-2xl text-center border border-white/5">
                  <p className="text-lg font-extrabold text-[#FB923C]">{myPostedCount}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.myPosted}</p>
                </div>
                <div className="bg-[#161A20] p-3 rounded-2xl text-center border border-white/5">
                  <p className="text-lg font-extrabold text-emerald-400">{mySoldCount}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.mySold}</p>
                </div>
                <div className="bg-[#161A20] p-3 rounded-2xl text-center border border-white/5">
                  <p className="text-lg font-extrabold text-sky-400">{myBoughtCount}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.myBought}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 🛒 ካርት ሞዳል */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E232B] w-full max-w-sm rounded-3xl p-5 border border-white/10 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#FB923C]">{t.cartTitle}</h3>
              <button onClick={() => setShowCartModal(false)} className="text-xs text-gray-400">✕</button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-6">{t.emptyCart}</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="bg-[#161A20] p-3 rounded-2xl flex items-center justify-between gap-2 border border-white/5">
                    <div>
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <p className="text-xs text-[#FB923C] font-bold">{item.price} ETB</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setShowCartModal(false); setViewingProduct(item); }} className="bg-[#FB923C] text-black text-[11px] font-bold px-3 py-1.5 rounded-xl">
                        ዝርዝር / ይግዙ
                      </button>
                      <button onClick={() => setCartItems(cartItems.filter((_, i) => i !== idx))} className="bg-red-500/10 text-red-400 text-[11px] font-bold px-2.5 py-1.5 rounded-xl">
                        {t.removeBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 💳 ክፍያ እና ዴሊቨሪ ፖፕአፕ */}
      {selectedProduct && (() => {
        const seller = getSellerInfo(selectedProduct.seller_username, selectedProduct);
        const itemPrice = Number(selectedProduct.price || 0);
        const deliveryFee = Number(selectedProduct.delivery_fee || 0);
        const hasDelivery = deliveryFee > 0;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1E232B] w-full max-w-sm rounded-3xl p-5 border border-orange-500/40 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-sm font-bold text-[#FB923C]">💳 {t.checkoutTitle}</h3>
              
              <div className="bg-[#161A20] p-3.5 rounded-2xl border border-white/10 space-y-2 text-xs">
                <p className="font-bold text-white">🛍️ እቃ፦ {selectedProduct.name} ({itemPrice} ETB)</p>
                
                {hasDelivery ? (
                  <p className="text-emerald-400 font-bold">🚚 ዴሊቨሪ አለው፦ የዲሊቨሪ ዋጋ <span className="text-[#FB923C]">{deliveryFee} ETB</span> (ቅድሚያ የሚከፈል)</p>
                ) : (
                  <p className="text-amber-400 font-bold bg-amber-500/10 p-2 rounded-xl border border-amber-500/30">
                    {t.noDeliveryAvailableMsg}
                  </p>
                )}

                <div className="border-t border-white/10 pt-2 space-y-1 text-gray-300">
                  <p>🏪 <strong>የሱቅ ስም:</strong> {seller.store_name}</p>
                  <p>📞 <strong>ሻጭ የሚደወልበት ስልክ:</strong> <a href={`tel:${seller.phone}`} className="text-orange-300 underline font-bold">{seller.phone}</a></p>
                  
                  <div className="pt-2 space-y-1 bg-[#1E232B] p-2.5 rounded-xl border border-orange-500/20">
                    <p className="font-bold text-[#FB923C]">📱 ቴሌብር: <code className="text-orange-300">{seller.telebirr_account}</code></p>
                    <p className="font-bold text-[#FB923C] pt-1">🏦 CBE: <code className="text-orange-300">{seller.cbe_account}</code></p>
                    <p className="font-bold text-[#FB923C] pt-1">🏦 አቢሲኒያ: <code className="text-orange-300">{seller.abyssinia_account}</code></p>
                  </div>
                </div>
              </div>

              {hasDelivery && (
                <div className="space-y-2.5 bg-[#161A20] p-3.5 rounded-2xl border border-emerald-500/30">
                  <p className="text-xs font-bold text-emerald-400">📍 የዲሊቨሪ አድራሻዎን እና ስልክ ያስገቡ፦</p>
                  <input 
                    value={buyerAddress} 
                    onChange={e => setBuyerAddress(e.target.value)} 
                    type="text" 
                    placeholder={t.buyerAddressPh} 
                    className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none" 
                  />
                  <input 
                    value={buyerPhone} 
                    onChange={e => setBuyerPhone(e.target.value)} 
                    type="tel" 
                    placeholder={t.buyerPhonePh} 
                    className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none" 
                  />
                  <div>
                    <label className="text-[11px] text-emerald-400 font-bold block mt-1">🚚 የዲሊቨሪ ክፍያ ( {deliveryFee} ETB ) የከፈሉበት ሪፈረስ ቁጥር፦</label>
                    <input 
                      value={deliveryRef} 
                      onChange={e => setDeliveryRef(e.target.value)} 
                      type="text" 
                      placeholder={t.deliveryRefPh} 
                      className="w-full bg-[#1E232B] text-white text-xs rounded-xl px-3.5 py-2.5 border border-emerald-500/30 focus:outline-none mt-1" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] text-[#FB923C] font-bold">🛡️ የእቃ ዋጋ ( {itemPrice} ETB ) እስክሮ የከፈሉበት ሪፈረስ ቁጥር (Item Ref)፦</label>
                <input 
                  value={itemRef} 
                  onChange={e => setItemRef(e.target.value)} 
                  type="text" 
                  placeholder={t.itemRefPh} 
                  className="w-full bg-[#161A20] text-white text-xs rounded-xl px-3.5 py-2.5 border border-orange-500/30 focus:outline-none mt-1" 
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={() => { setSelectedProduct(null); setBuyerAddress(''); setBuyerPhone(''); setItemRef(''); setDeliveryRef(''); }} className="flex-1 bg-[#262C36] text-gray-300 text-xs font-bold py-3 rounded-xl">
                  {t.cancel}
                </button>
                <button onClick={handleConfirmPayment} className="flex-1 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-black text-xs font-bold py-3 rounded-xl shadow-lg">
                  {t.confirmPay}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F26]/95 backdrop-blur-md border-t border-white/5 py-2.5 px-6 grid grid-cols-4 items-center z-40 shadow-2xl">
        <button onClick={() => { setActiveTab('market'); setViewingProduct(null); }} className={`flex flex-col items-center gap-1 ${activeTab === 'market' ? 'text-[#FB923C]' : 'text-gray-500'}`}><span className="text-xl">🏠</span><span className="text-[10px]">ገበያ</span></button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-[#FB923C]' : 'text-gray-500'}`}><span className="text-xl">🏪</span><span className="text-[10px]">ሱቅ/KYC</span></button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center gap-1 ${activeTab === 'wallet' ? 'text-[#FB923C]' : 'text-gray-500'}`}><span className="text-xl">📋</span><span className="text-[10px]">ትዕዛዞች</span></button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-[#FB923C]' : 'text-gray-500'}`}><span className="text-xl">⚙️</span><span className="text-[10px]">ሴቲንግ</span></button>
      </nav>
    </div>
  );
}
