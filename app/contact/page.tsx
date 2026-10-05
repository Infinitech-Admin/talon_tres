"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import PageLayout from "@/components/page-layout";
import Link from "next/link";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* BARANGAY DATA — edit here only.                                     */
/* CONFIRM items could not be verified online; check with the hall.    */
/* ------------------------------------------------------------------ */
const CONTACT = {
  // Verified in barangay directory listings
  phoneDisplay: "(02) 8800-7688",
  phoneTel: "+63288007688",
  // CONFIRM: sources list different streets (San Pablo St., San Isidro St.).
  // Replace with the exact street address once confirmed.
  address: "Barangay Hall, Talon Tres, Las Piñas City, Metro Manila",
  // CONFIRM: add the official barangay email. The card is hidden while empty.
  email: "",
  // CONFIRM: office hours
  hours: "Monday - Friday: 8:00 AM - 5:00 PM",
};

// Search-based map links: no hard-coded coordinates, so no wrong pin.
const MAP_QUERY = encodeURIComponent(
  "Barangay Talon Tres Barangay Hall, Las Piñas City",
);
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

function MapEmbed() {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src={MAP_EMBED}
        title="Barangay Talon Tres location map"
        className="w-full h-full rounded-xl border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    setErrors({});

    // Validation
    const newErrors: { name?: string; email?: string } = {};

    // Name validation - no numbers allowed
    if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Office Location",
      details: CONTACT.address,
      link: MAP_LINK,
      isExternal: true,
    },
    {
      icon: Phone,
      title: "Phone",
      details: CONTACT.phoneDisplay,
      link: `tel:${CONTACT.phoneTel}`,
      isExternal: false,
    },
    // Only shown once an official email is set in CONTACT.email
    ...(CONTACT.email
      ? [
          {
            icon: Mail,
            title: "Email",
            details: CONTACT.email,
            link: `mailto:${CONTACT.email}`,
            isExternal: false,
          },
        ]
      : []),
    {
      icon: Clock,
      title: "Office Hours",
      details: CONTACT.hours,
      link: null as string | null,
      isExternal: false,
    },
  ];

  return (
    <PageLayout
      title="Contact Us"
      subtitle="Get in touch with Barangay Talon Tres, Las Piñas City"
      image="/newspaper-journalism-city-news.jpg"
    >
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {/* Success/error banners keep semantic green/red - this is the only place those colors appear on this page */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Block numbers from being typed
                      if (!/\d/.test(value)) {
                        setFormData({ ...formData, name: value });
                        if (errors.name)
                          setErrors({ ...errors, name: undefined });
                      }
                    }}
                    onBlur={() => {
                      // Validate on blur
                      if (formData.name && /\d/.test(formData.name)) {
                        setErrors({
                          ...errors,
                          name: "Name cannot contain numbers",
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-slate-200"
                    } focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 transition`}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    onBlur={() => {
                      // Validate on blur (when leaving the field)
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (formData.email && !emailRegex.test(formData.email)) {
                        setErrors({
                          ...errors,
                          email: "Please enter a valid email address",
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-slate-200"
                    } focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 transition`}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 transition"
                    placeholder="How can we help?"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 transition"
                    placeholder="Your message..."
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-[#7f1d1d] hover:from-red-700 hover:to-[#5f1414] text-white font-bold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, x: 10 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#b91c1c] flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-[#b91c1c] hover:underline transition-colors"
                    >
                      {item.details}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm">{item.details}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100"
        >
          <div className="w-full h-96 bg-slate-50 flex items-center justify-center">
            <MapEmbed />
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-2xl">
        <div className="text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#b91c1c] mb-6">
              Access Barangay Services Easily
            </h2>

            <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
              Manage your Barangay Talon Tres transactions in one platform:
              request documents, track your applications, and stay updated on
              barangay services with just a few clicks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(185, 28, 28, 0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-[#b91c1c] text-white font-bold"
                >
                  Log In
                </motion.button>
              </Link>

              <Link href="/register">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(185, 28, 28, 0.06)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border-2 border-[#b91c1c] text-[#b91c1c] font-bold transition-colors"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
