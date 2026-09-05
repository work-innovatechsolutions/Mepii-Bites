"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: "Are Mepii Bites snacks really 100% roasted and oil-fried free?",
      a: "Yes! None of our snacks are ever deep-fried. We use gentle drum and air-roasting techniques with small drizzles of cold-pressed olive or sunflower oil just to bind the spices naturally.",
    },
    {
      q: "What is your shipping policy and delivery timeline?",
      a: "We offer FREE delivery on all orders above ₹499 across India. Orders to metro hubs (Bengaluru, Mumbai, Delhi NCR, Hyderabad) arrive in 2–3 business days. Other cities arrive within 3–5 business days.",
    },
    {
      q: "Do you offer corporate gifting and wedding bulk hampers?",
      a: "Absolutely. We curate bespoke gift boxes with custom branding bands and greeting cards for companies like Google, Swiggy, and Razorpay. Select 'Bulk & Corporate Gifting' in the contact form or email bulk@mepiibites.com.",
    },
    {
      q: "Are all Mepii Bites products vegetarian and gluten-free?",
      a: "All our products are 100% vegetarian. Our Makhana, Quinoa Chips, Quinoa Fingers, Cashews, Almonds, and Ragi Chips are naturally gluten-free and processed in certified clean facilities.",
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
            We&apos;re Here To Help
          </span>
          <h1 className="editorial-headline text-3xl sm:text-5xl font-black text-dark tracking-tight mt-3 mb-3">
            GET IN TOUCH
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Have a question about an order, custom gifting, or just want to tell us your favorite flavor? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md">
            <h2 className="font-serif text-xl font-bold text-dark mb-2">
              Send us a Message
            </h2>
            <p className="text-xs text-muted mb-6">
              Our snack care team typically replies within 2–4 business hours.
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-sage/10 border border-sage/20 rounded-2xl text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-sage mx-auto" />
                <h3 className="font-serif text-lg font-bold text-dark">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Thank you, {formData.name}. We have received your note and will be in touch shortly at {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                  }}
                  className="mt-3 text-xs font-bold text-terracotta underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                  >
                    <option value="General Inquiry">General Question</option>
                    <option value="Order Status">Order Tracking / Status</option>
                    <option value="Bulk & Corporate Gifting">Bulk &amp; Corporate Gifting</option>
                    <option value="Feedback / Flavor Request">Feedback or Flavor Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md space-y-6">
              <h3 className="font-serif text-lg font-bold text-dark pb-3 border-b border-stone-100">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block text-xs sm:text-sm">Customer Care</span>
                    <a href="mailto:care@mepiibites.com" className="text-terracotta hover:underline font-semibold">
                      care@mepiibites.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block text-xs sm:text-sm">WhatsApp &amp; Helpline</span>
                    <a
                      href="https://wa.me/918708992266?text=Hi%20Mepii%20Bites!%20I%20have%20an%20inquiry."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-terracotta transition-colors"
                    >
                      +91 870 899 2266 (10 AM – 7 PM IST)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mango/10 text-mango flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block text-xs sm:text-sm">Roastery &amp; HQ</span>
                    <span className="text-muted">Plot 14, Indiranagar Creative Hub, Bengaluru 560038</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark text-cream rounded-3xl p-6 sm:p-7 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-mango block mb-2">
                Need Fast Help?
              </span>
              <p className="text-xs text-cream/80 leading-relaxed mb-4">
                Check our FAQs below for immediate answers regarding ingredients, orders, and delivery timelines.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div id="faq" className="max-w-4xl mx-auto pt-8 border-t border-stone-200">
          <h2 className="editorial-headline text-2xl sm:text-3xl font-black text-dark text-center mb-8">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-dark flex items-center justify-between hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-dark/80 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
