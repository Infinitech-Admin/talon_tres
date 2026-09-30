"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, Send, Mail, Phone, Globe } from "lucide-react";

interface SocialLink {
  name: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
  external?: boolean;
}

/**
 * Messenger icon
 * Uses the Messenger-style gradient chat logo.
 *
 * Unlike the other platform icons (a plain white glyph sitting on a
 * separately-colored circular button), this SVG already draws its own
 * colored chat-bubble background inside its own viewBox. So the button
 * for Messenger renders with no button background/padding of its own —
 * the icon is sized up to fill the same overall footprint (48px desktop /
 * 40px mobile) that the padded, colored buttons occupy, so it still reads
 * as a full circle instead of a small blob floating in transparent space.
 */
const MessengerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="messenger-gradient"
        x1="3"
        y1="21"
        x2="21"
        y2="3"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0099FF" />
        <stop offset="0.5" stopColor="#A033FF" />
        <stop offset="1" stopColor="#FF5280" />
      </linearGradient>
    </defs>

    <path
      d="M12 2.5C6.477 2.5 2 6.73 2 12c0 2.99 1.48 5.67 3.78 7.39V22l3.01-1.65c1.01.28 2.08.43 3.21.43 5.523 0 10-4.23 10-9.5S17.523 2.5 12 2.5Z"
      fill="url(#messenger-gradient)"
    />

    <path
      d="M6.8 14.7 10.2 9.3l2.7 2.25 3.9-2.25-3.35 5.4-2.75-2.25-3.9 2.25Z"
      fill="white"
    />
  </svg>
);

/**
 * Barangay Talon Tres official channels
 *
 * All URLs intentionally have NO trailing slash.
 */
const ALL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/bgytalondos",
    color: "bg-red-600 hover:bg-red-700",
    external: true,
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color:
      "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
    external: true,
  },
  {
    name: "Messenger",
    icon: MessengerIcon,
    url: "https://m.me/bgytalondos",
    color: "bg-transparent",
    external: true,
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://telegram.org",
    color: "bg-red-500 hover:bg-red-600",
    external: true,
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:barangaytalondos@gmail.com",
    color: "bg-red-500 hover:bg-red-600",
    external: false,
  },
  {
    name: "Phone",
    icon: Phone,
    url: "tel:288711048",
    color: "bg-emerald-500 hover:bg-emerald-600",
    external: false,
  },
];

const socialLinks = ALL_LINKS;

export default function FloatingSocialMedia() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide on dashboard, login, and register routes
  if (
    pathname?.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          const isMessenger = social.name === "Messenger";

          return (
            <a
              key={social.name}
              href={social.url}
              {...(social.external
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              className={`${
                isMessenger ? "" : social.color
              } text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group relative flex items-center justify-center ${
                isMessenger ? "w-12 h-12" : "p-3"
              }`}
              aria-label={social.name}
            >
              <Icon className={isMessenger ? "w-full h-full" : "w-6 h-6"} />

              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40">
        {/* Globe Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          aria-label="Social Media Menu"
          aria-expanded={isExpanded}
        >
          <Globe
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expanded Social Icons */}
        {isExpanded && (
          <div className="absolute right-0 bottom-full mb-3 flex flex-col gap-2 z-50">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              const isMessenger = social.name === "Messenger";

              return (
                <a
                  key={social.name}
                  href={social.url}
                  {...(social.external
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={`${
                    isMessenger ? "" : social.color
                  } text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl social-slide-in flex items-center justify-center ${
                    isMessenger ? "w-10 h-10" : "p-2.5"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  aria-label={social.name}
                >
                  <Icon className={isMessenger ? "w-full h-full" : "w-5 h-5"} />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes social-slide-in {
          from {
            transform: translateX(20px);
            opacity: 0;
          }

          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .social-slide-in {
          opacity: 0;
          animation: social-slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
