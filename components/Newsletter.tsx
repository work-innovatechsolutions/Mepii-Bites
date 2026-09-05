"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mango/10 text-dark text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-mango" />
            <span>VIP Snack Club</span>
          </div>

          <h2 className="editorial-headline text-3xl sm:text-4xl font-black text-dark tracking-tight mb-3">
            GET FIRST DIBS ON NEW SNACKS.
          </h2>

          <p className="text-sm sm:text-base text-muted max-w-md mx-auto mb-8">
            New drops, limited edition spice combos, and exclusive snack-worthy secret offers.
          </p>

          {isSubmitted ? (
            <div className="p-4 bg-sage/10 border border-sage/30 rounded-2xl max-w-md mx-auto text-sage flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold">
                You&apos;re on the list. Snack updates incoming!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-stone-200 rounded-xl text-sm text-dark placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
              >
                I&apos;m In
              </button>
            </form>
          )}

          <p className="text-[11px] text-muted mt-3">
            No spam. No daily junk mail. Just really good snacks.
          </p>
        </div>
      </div>
    </section>
  );
}
