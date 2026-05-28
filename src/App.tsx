import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Users,
  ShieldCheck,
  ChevronDown,
  Phone
} from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    shopName: '',
    shopLink: '',
    email: '',
    whatsapp: '',
    shopAge: '',
    listings: '',
    sales: '',
    problem: '',
    preferredDate: ''
  });

  const [submittedData, setSubmittedData] = useState<{ date: string; submittedAt: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('auditSubmission');
    if (saved) {
      setSubmittedData(JSON.parse(saved));
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-Qyi69VbiI5P7LyEpZltAOEaWMvqJ8xfsWXyfguEH7G7avqqQo-ap5l3StlzlPx3Z/exec';

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          fullName: formData.fullName,
          shopName: formData.shopName,
          shopLink: formData.shopLink,
          email: formData.email,
          whatsapp: formData.whatsapp,
          shopAge: formData.shopAge,
          listings: formData.listings,
          sales: formData.sales,
          problem: formData.problem,
          preferredDate: formData.preferredDate,
          timestamp: new Date().toISOString()
        })
      });

      const subInfo = { date: formData.preferredDate, submittedAt: new Date().toISOString() };
      localStorage.setItem('auditSubmission', JSON.stringify(subInfo));
      setSubmittedData(subInfo);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        shopName: '',
        shopLink: '',
        email: '',
        whatsapp: '',
        shopAge: '',
        listings: '',
        sales: '',
        problem: '',
        preferredDate: ''
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to submit form: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-[#F1641E] selection:text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar Minimal */}
      <nav className="px-6 md:px-12 py-6 relative z-10 flex items-center justify-between shrink-0 container mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F1641E] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20 text-white font-bold">
            E
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">EtsyAudit<span className="text-[#F1641E]">Pro</span></span>
        </div>
      </nav>

      <main className="px-6 md:px-12 pb-8 relative z-10 flex flex-1 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full">
          
          {/* LEFT SIDE CONTENT */}
          <div className="flex-1 flex flex-col justify-center space-y-10 lg:pl-0 lg:pr-8">
            
            {/* HERO TEXT */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#D85616] font-semibold text-sm border border-orange-200/50 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F1641E]"></span>
                </span>
                Limited 1 Week Offer
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Free Etsy <br className="hidden md:block"/>
                <span className="text-[#F1641E]">Shop Audit</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-medium max-w-lg leading-relaxed">
                Not Getting Sales? Let’s Find The Real Problems In Your Etsy Shop.
              </p>

              <button 
                onClick={scrollToForm}
                className="lg:hidden inline-flex items-center justify-center gap-2 bg-[#F1641E] hover:bg-[#D85616] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-orange-500/25 transition-all active:scale-95 w-full sm:w-auto"
              >
                Join Audit Waitlist
              </button>
            </motion.div>

            {/* CHECKLIST */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TargetIcon className="w-5 h-5 text-slate-300" />
                What We Will Audit
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                {[
                  { label: "Etsy SEO & Keywords", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Listing Optimization", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Thumbnail Review", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Pricing & Competition", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Niche Demand", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Shop Setup Problems", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Conversion Issues", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Action Plan Suggestions", icon: <CheckCircle2 className="w-4 h-4" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="flex-shrink-0 text-green-500">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TRUST SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2"
            >
              {[
                { label: "100+ Listings", icon: <TrendingUp className="w-5 h-5 mb-2 text-slate-400" /> },
                { label: "Personalized Feedback", icon: <MessageCircle className="w-5 h-5 mb-2 text-slate-400" /> },
                { label: "1-on-1 Guidance", icon: <Users className="w-5 h-5 mb-2 text-slate-400" /> },
                { label: "Implementation Plan", icon: <ShieldCheck className="w-5 h-5 mb-2 text-slate-400" /> },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col border-l border-slate-200 pl-4 first:border-0 first:pl-0">
                  {stat.icon}
                  <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">{stat.label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* RIGHT SIDE: IMAGE + FORM */}
          <div className="flex-1 w-full relative mt-4 lg:mt-0" id="audit-form">
            
            {/* Context Blob for Image behind Form */}
            <div className="absolute -left-12 bottom-0 w-48 h-64 bg-slate-200 rounded-b-full opacity-20 -z-10 blur-xl"></div>
            
            {/* HERO PORTRAIT IMAGE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[320px] lg:h-[400px] mb-[-120px] lg:mb-[-150px] z-20 flex justify-center lg:justify-end pointer-events-none"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 blur-[80px] opacity-20 rounded-full"></div>
                <img 
                  src="https://res.cloudinary.com/dap6inidx/image/upload/v1779992072/ChatGPT_Image_May_28_2026_11_13_51_PM_tmmfmd.png" 
                  alt="Etsy Expert" 
                  fetchPriority="high"
                  className="w-auto h-full object-cover filter drop-shadow-2xl translate-y-[-20px] md:translate-y-[-40px] rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>

            {/* FORM CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-30 bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-orange-900/10 border border-slate-100 overflow-hidden flex flex-col gap-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-60"></div>

              <div className="mb-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-800">Etsy Audit Access Form</h2>
                <p className="text-sm text-slate-500 mt-1">Fill the details to secure your spot.</p>
              </div>

              {!isSubmitted ? (
                <form autoComplete="off" onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Etsy Shop Name</label>
                      <input required name="shopName" value={formData.shopName} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="MyEtsyShop" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Etsy Shop Link</label>
                    <input required name="shopLink" value={formData.shopLink} onChange={handleInputChange} type="url" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="https://etsy.com/shop/..." />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="john@email.com" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">WhatsApp No.</label>
                      <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="+1..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5 col-span-3 sm:col-span-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Shop Age</label>
                      <div className="relative">
                        <select required name="shopAge" value={formData.shopAge} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 appearance-none pr-10">
                          <option value="" disabled selected>Select</option>
                          <option value="<1M">Less than 1 Month</option>
                          <option value="1-3M">1–3 Months</option>
                          <option value="3-6M">3–6 Months</option>
                          <option value="6M+">6+ Months</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5 col-span-1 border-none focus:outline-none">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Listings</label>
                      <input required name="listings" value={formData.listings} onChange={handleInputChange} type="number" min="0" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="0" />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Sales</label>
                      <input required name="sales" value={formData.sales} onChange={handleInputChange} type="number" min="0" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400" placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Preferred Audit Date</label>
                    <div className="relative">
                      <select required name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 appearance-none pr-10">
                        <option value="" disabled selected>Select Date</option>
                        {["June 1, 2026", "June 2, 2026", "June 3, 2026", "June 4, 2026", "June 5, 2026", "June 6, 2026", "June 7, 2026", "June 8, 2026"].map(date => (
                          <option key={date} value={date}>{date}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Biggest Problem In Your Shop</label>
                    <textarea required name="problem" value={formData.problem} onChange={handleInputChange} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F1641E] focus:ring-2 focus:ring-[#F1641E]/20 transition-all outline-none text-sm text-slate-800 placeholder-slate-400 resize-none" placeholder="E.g., Getting views but no sales..." />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full mt-2 bg-[#F1641E] hover:bg-[#d85619] disabled:bg-[#f1651e9b] disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? 'Reserving...' : 'Reserve My Audit Spot'}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 opacity-50 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                    <span className="text-[10px] font-medium text-slate-900">Your information is safe and will only be used for audit communication.</span>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6 px-4"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Spot Reserved!</h3>
                  <p className="text-slate-600 mb-8 max-w-sm text-sm">We've received your details. Your audit will be prepared leading up to your preferred date.</p>
                  
                  {submittedData && <TimeBall preferredDate={submittedData.date} />}

                  <p className="mt-8 text-xs text-slate-500 max-w-xs">
                    Your spot is confirmed for this browser. Please use the WhatsApp widget below if you have any immediate questions.
                  </p>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </main>

      {/* Bottom Urgency Bar */}
      <footer className="bg-slate-900 py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between shrink-0 z-10 w-full mt-auto">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Only 3 Etsy Shops Audited Daily</span>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} EtsyAuditPro. High Conversion Shop Strategies.
        </div>
      </footer>

      {/* WHATSAPP FLOATING WIDGET */}
      <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="hidden sm:block bg-white rounded-full px-4 py-2 shadow-xl border border-slate-100 text-xs font-bold text-slate-600">
          Need help? Chat now
        </div>
        <a 
          href="https://wa.me/923220870929?text=Hello%2C%20I%E2%80%99m%20interested%20in%20the%20Etsy%20Shop%20Audit%20and%20would%20like%20more%20information%20about%20the%20process." 
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.3)] hover:scale-105 transition-all cursor-pointer group"
        >
          <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
          <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}

function TimeBall({ preferredDate }: { preferredDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, mins: number, secs: number } | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const targetDate = new Date(preferredDate);
    targetDate.setHours(9, 0, 0, 0); // target 9 AM of preferred date

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsReady(true);
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        setIsReady(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [preferredDate]);

  return (
    <div className="relative flex flex-col items-center justify-center my-8">
      {/* Outer animated rotating dashed ring overlay for an attractive effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute w-72 h-72 rounded-full border-[3px] border-dashed ${isReady ? 'border-green-400/50' : 'border-[#F1641E]/40'}`}
      ></motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute w-[320px] h-[320px] rounded-full border-[1px] ${isReady ? 'border-green-300/30' : 'border-[#F1641E]/20'}`}
      ></motion.div>

      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: isReady 
            ? ["0px 0px 0px 0px rgba(34,197,94,0.6)", "0px 0px 70px 25px rgba(34,197,94,0.3)", "0px 0px 0px 0px rgba(34,197,94,0.6)"]
            : ["0px 0px 0px 0px rgba(241,100,30,0.6)", "0px 0px 60px 20px rgba(241,100,30,0.2)", "0px 0px 0px 0px rgba(241,100,30,0.6)"]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`w-56 h-56 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden z-10 ${isReady ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-[#F1641E] via-[#FF8A3A] to-[#FFA057]'}`}
      >
        <div className="absolute inset-0 bg-white/20 blur-2xl pointer-events-none mix-blend-overlay"></div>
        {/* Animated sheen effect */}
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 transform"
        ></motion.div>

        {isReady ? (
          <div className="text-center z-10 p-2 transform scale-125">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-2 text-white border-white" />
            <span className="font-extrabold text-lg uppercase tracking-widest block drop-shadow-md">Ready</span>
          </div>
        ) : timeLeft ? (
          <div className="text-center z-10 flex flex-col items-center">
            <span className="text-5xl font-black tabular-nums leading-none mb-1 drop-shadow-md">
              {timeLeft.days}d {timeLeft.hours}h
            </span>
            <span className="text-2xl font-bold opacity-90 tabular-nums drop-shadow-md">
              {timeLeft.mins}m {timeLeft.secs}s
            </span>
            <span className="text-xs uppercase tracking-wider mt-3 opacity-80 font-bold">Time to Audit</span>
          </div>
        ) : (
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
      </motion.div>
      <div className="mt-12 text-center z-10">
        {isReady ? (
          <p className="text-green-600 font-extrabold text-2xl py-2 px-6 bg-green-50 rounded-full border border-green-200 shadow-sm">Your audit date is ready!</p>
        ) : (
          <p className="text-slate-600 font-bold text-lg bg-orange-50/90 px-6 py-2.5 rounded-full border border-orange-100 shadow-sm">Counting down to <span className="text-[#F1641E]">{preferredDate}</span></p>
        )}
      </div>
    </div>
  );
}

// Simple internal icon components where Lucide didn't have exact match in one-liners
function TargetIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

