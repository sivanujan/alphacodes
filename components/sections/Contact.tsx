"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  Globe,
} from "lucide-react";

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
import { CONTACT_DATA } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/navigation/Footer";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  botcheck: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

const SERVICE_OPTIONS = [
  "Product Engineering",
  "Website Development",
  "Cloud Operations",
  "Digital Product Design",
  "Other",
];

const BUDGET_OPTIONS = [
  "< $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "Product Engineering",
    budget: "",
    message: "",
    botcheck: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Validate form client-side
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a brief message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check honeypot
    if (formData.botcheck) {
      // Quietly drop bot submission
      setStatus("success");
      setStatusMessage("Thanks — we'll reply within one business day.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `New Project Inquiry from ${formData.name} - AlphaCodes`,
          from_name: formData.name,
          ...formData,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setStatusMessage("Thanks — we'll reply within one business day.");
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "Product Engineering",
          budget: "",
          message: "",
          botcheck: false,
        });
      } else {
        // If API key is placeholder or service error
        setStatus("error");
        setStatusMessage(
          result.message || "Something went wrong while submitting. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  };

  // Conditions to show cards (hide if "TODO" or empty)
  const showAddress = Boolean(CONTACT_DATA.address && CONTACT_DATA.address !== "TODO");
  const showPhone = Boolean(CONTACT_DATA.phone && CONTACT_DATA.phone !== "TODO");
  const showEmail = Boolean(CONTACT_DATA.email && CONTACT_DATA.email !== "TODO");
  const showLinkedin = Boolean(CONTACT_DATA.linkedin && CONTACT_DATA.linkedin !== "TODO");

  return (
    <>
      <section
        id="contact"
        aria-label="Start a Project Contact"
        className="w-full bg-[#0B1B2B] text-white py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Soft Background Animated Cyan Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-[#12A9EC]/12 blur-[150px] animate-glow" />
          <div className="absolute bottom-10 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#2563EB]/10 blur-[130px]" />
          
          {/* Subtle Grid Watermark */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-screen"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="mb-6">
              <Image
                src="/alphacodes-logo-horizontal-dark.svg"
                alt="AlphaCodes"
                width={157}
                height={36}
                className="h-8 md:h-9 w-auto object-contain opacity-95"
              />
            </div>
            <span className="label-caps text-[#12A9EC] block mb-2">
              START A PROJECT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
                that lasts.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Have an idea, MVP, or complex digital product to scale? Tell us about your goals and our engineering team will get back to you within one business day.
            </p>
          </div>

          {/* Two-Column Layout: Contact Cards on Left, Form on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Address Card */}
              {showAddress && (
                <div className="group rounded-2xl bg-[#0E2238]/90 border border-slate-700/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#12A9EC] hover:shadow-[0_0_24px_rgba(18,169,236,0.25)]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#12A9EC]/15 border border-[#12A9EC]/30 flex items-center justify-center shrink-0 text-[#12A9EC]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="label-caps text-[10px] text-[#12A9EC] block mb-1">
                        HEADQUARTERS &amp; STUDIO
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {CONTACT_DATA.address}
                      </p>
                      <a
                        href={CONTACT_DATA.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#12A9EC] hover:text-[#38BDF8] transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Phone Card (Hidden when "TODO") */}
              {showPhone && (
                <div className="group rounded-2xl bg-[#0E2238]/90 border border-slate-700/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#12A9EC] hover:shadow-[0_0_24px_rgba(18,169,236,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#12A9EC]/15 border border-[#12A9EC]/30 flex items-center justify-center shrink-0 text-[#12A9EC]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="label-caps text-[10px] text-[#12A9EC] block mb-1">
                        DIRECT PHONE
                      </span>
                      <a
                        href={`tel:${CONTACT_DATA.phone}`}
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#12A9EC] transition-colors"
                      >
                        {CONTACT_DATA.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Card (Hidden when "TODO") */}
              {showEmail && (
                <div className="group rounded-2xl bg-[#0E2238]/90 border border-slate-700/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#12A9EC] hover:shadow-[0_0_24px_rgba(18,169,236,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#12A9EC]/15 border border-[#12A9EC]/30 flex items-center justify-center shrink-0 text-[#12A9EC]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="label-caps text-[10px] text-[#12A9EC] block mb-1">
                        EMAIL INQUIRIES
                      </span>
                      <a
                        href={`mailto:${CONTACT_DATA.email}`}
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#12A9EC] transition-colors"
                      >
                        {CONTACT_DATA.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn Card (Hidden when "TODO") */}
              {showLinkedin && (
                <div className="group rounded-2xl bg-[#0E2238]/90 border border-slate-700/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#12A9EC] hover:shadow-[0_0_24px_rgba(18,169,236,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#12A9EC]/15 border border-[#12A9EC]/30 flex items-center justify-center shrink-0 text-[#12A9EC]">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="label-caps text-[10px] text-[#12A9EC] block mb-1">
                        LINKEDIN COMPANY PAGE
                      </span>
                      <a
                        href={CONTACT_DATA.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#12A9EC] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Follow AlphaCodes on LinkedIn</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Corporate Structure Card */}
              <div className="rounded-2xl bg-[#091726]/80 border border-slate-800 p-6 shadow-md">
                <div className="flex items-start gap-3.5">
                  <Building2 className="w-5 h-5 text-[#12A9EC] shrink-0 mt-0.5" />
                  <div>
                    <span className="label-caps text-[10px] text-slate-400 block mb-1">
                      CORPORATE STRUCTURE
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      AlphaCodes is the Sri Lankan subsidiary and workforce of{" "}
                      <span className="text-white font-semibold">
                        {CONTACT_DATA.parent.name}
                      </span>{" "}
                      (UK company no. {CONTACT_DATA.parent.companyNo}, {CONTACT_DATA.parent.jurisdiction}).
                    </p>
                    <a
                      href={CONTACT_DATA.parent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#12A9EC] hover:text-[#38BDF8] transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Visit Thaayakam Ltd &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="w-full rounded-3xl bg-[#0E2238]/90 border border-slate-700/80 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md">
                {/* Status Banners */}
                {status === "success" && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 animate-in fade-in">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-sm">Inquiry Received</div>
                      <p className="text-xs sm:text-sm mt-0.5">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                    <div>
                      <div className="font-bold text-sm">Submission Notice</div>
                      <p className="text-xs sm:text-sm mt-0.5">{statusMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot Field */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={formData.botcheck}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                    aria-hidden="true"
                  />

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-[#12A9EC]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className={`w-full px-4 py-3 rounded-xl bg-[#081523] border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all ${
                          errors.name ? "border-rose-500" : "border-slate-700"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 font-medium">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-[#12A9EC]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#081523] border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all ${
                          errors.email ? "border-rose-500" : "border-slate-700"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company Name <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Studio Ltd"
                        className="w-full px-4 py-3 rounded-xl bg-[#081523] border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Service Discipline <span className="text-[#12A9EC]">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#081523] border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0B1B2B] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-xs text-rose-400 font-medium">{errors.service}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Select */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Estimated Budget Range <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#081523] border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all"
                    >
                      <option value="" className="bg-[#0B1B2B] text-slate-400">
                        Select a budget range
                      </option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0B1B2B] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Details <span className="text-[#12A9EC]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you want to build, current timelines, or specific technical requirements..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#081523] border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#12A9EC] transition-all resize-none ${
                        errors.message ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto shadow-[0_4px_24px_rgba(18,169,236,0.35)]"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <span>Send message</span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Site Footer */}
      <Footer />
    </>
  );
}

export default Contact;
