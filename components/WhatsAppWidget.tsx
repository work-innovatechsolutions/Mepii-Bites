"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Send, MessageSquare, Package, Gift, ShieldAlert, Sparkles } from "lucide-react";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const phoneNumber = "918708992266"; // Official client WhatsApp hotline (+91 870 899 2266)

  const openWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setCustomMsg("");
  };

  const quickActions = [
    {
      icon: <Sparkles className="w-4 h-4 text-mango" />,
      title: "Snack Recommendations",
      desc: "Get suggestions based on your taste",
      message: "Hi Mepii Bites! I'm looking for healthy snack recommendations. What do you suggest?",
    },
    {
      icon: <Package className="w-4 h-4 text-sage" />,
      title: "Track My Order",
      desc: "Check live delivery status",
      message: "Hi Mepii Bites! I'd like to check the status of my order.",
    },
    {
      icon: <Gift className="w-4 h-4 text-terracotta" />,
      title: "Corporate & Festive Gifting",
      desc: "Bulk orders and festive hampers",
      message: "Hi team! I'm interested in corporate gifting boxes and custom snack hampers.",
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-stone-500" />,
      title: "Ingredients & Dietary Help",
      desc: "Calories, allergens & nutrition",
      message: "Hi! I have a question regarding ingredients and dietary allergens in Mepii Bites.",
    },
  ];

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Expandable Hub Drawer / Card */}
      {isOpen && (
        <div className="w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 bg-white shrink-0 shadow-xs">
                <Image
                  src="/logo.jpg"
                  alt="Mepii Bites Support"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <h4 className="font-serif font-black text-sm text-white">
                  Mepii Bites Helpdesk
                </h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-100 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online • Replies in ~5 mins
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Options */}
          <div className="p-3 bg-stone-50/70 border-b border-stone-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted px-1 block">
              How can we help you today?
            </span>

            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => openWhatsApp(action.message)}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/70 border border-stone-200/70 hover:border-emerald-300 rounded-xl transition-all duration-200 flex items-start gap-2.5 group active:scale-98 shadow-2xs"
              >
                <div className="p-1.5 bg-stone-100 group-hover:bg-emerald-100 rounded-lg shrink-0 transition-colors">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-dark group-hover:text-emerald-700 transition-colors truncate">
                    {action.title}
                  </span>
                  <span className="block text-[10px] text-muted truncate">
                    {action.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Direct Custom Message Form */}
          <div className="p-3 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customMsg.trim()) {
                  openWhatsApp(customMsg);
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shrink-0 shadow-sm active:scale-95"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 p-3.5 bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-3 focus:ring-emerald-400/40"
        aria-label="Open WhatsApp chat helpdesk"
      >
        {/* Subtle glowing radar ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping opacity-70 pointer-events-none" />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-6 h-6 text-white drop-shadow-xs" />

        {/* Tooltip on desktop */}
        <span className="hidden sm:inline-block pr-1 text-xs font-bold tracking-wide">
          {isOpen ? "Close" : "Chat with us"}
        </span>

        {/* Online green indicator badge */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-xs" />
      </button>
    </div>
  );
}
