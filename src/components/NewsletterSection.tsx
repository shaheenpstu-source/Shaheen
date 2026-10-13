import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('shaheen_subscribers') || '[]');
      existing.push({ email: email.trim(), date: new Date().toISOString() });
      localStorage.setItem('shaheen_subscribers', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="my-16 p-8 sm:p-12 rounded-3xl bg-stone-900 text-stone-100 relative overflow-hidden border border-stone-800 shadow-sm">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        
        {/* Unboxed Kicker */}
        <div className="text-xs font-mono uppercase tracking-widest text-amber-400/90 font-medium">
          The Unhurried Dispatch
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white [text-wrap:balance]">
          Occasional essays on distributed systems, agriculture, and craft.
        </h2>

        {/* Lead */}
        <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans max-w-xl mx-auto">
          No algorithmic feeds or weekly spam. Just long-form essays and synthesized architectural reflections sent once or twice a month.
        </p>

        {/* Form */}
        {subscribed ? (
          <div className="pt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-sm">
            <Check className="w-4 h-4" />
            <span>Thank you for subscribing. You will receive the next dispatch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-800/90 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            >
              <span>Join Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-[11px] text-stone-500 pt-2 font-mono">
          Free, ad-free, and one-click unsubscribe at any time.
        </div>

      </div>
    </section>
  );
};
