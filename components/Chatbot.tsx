"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Send } from "lucide-react";
import Image from "next/image";

interface Message {
  type: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

/* ------------------------------------------------------------------ */
/* BARANGAY DATA — edit here only.                                     */
/* Items marked CONFIRM could not be verified online; please check     */
/* with the Barangay Hall before publishing.                           */
/* ------------------------------------------------------------------ */
const BRGY = {
  name: "Barangay Talon Tres",
  city: "Las Piñas City, Metro Manila",
  phone: "(02) 8800-7688",
  // CONFIRM: sources list different street names (San Pablo St., San Isidro St.)
  address:
    "Barangay Hall, Talon Tres, Las Piñas City (near Alabang–Zapote Road)",
  // CONFIRM: add the barangay's official email / Facebook page
  email: "",
  facebook: "",
  // CONFIRM: office hours
  hours: "Monday to Friday, 8:00 AM – 5:00 PM",
  nationalEmergency: "911",
};

const MAIN_MENU = [
  "Our Mission",
  "Our Vision",
  "Our Values",
  "Contact Info",
  "Office Hours",
  "Services",
];

const REQUIREMENTS_NOTE =
  "Requirements may vary, so please confirm with the Barangay Hall before going.";

type Rule = {
  test: (m: string) => boolean;
  reply: Message;
};

// helper: match whole words so "hi" doesn't match "this", "id" doesn't match "individual"
const hasWord = (m: string, ...words: string[]) =>
  words.some((w) => new RegExp(`\\b${w}\\b`, "i").test(m));
const has = (m: string, ...parts: string[]) => parts.some((p) => m.includes(p));

// Order matters: specific topics first, general ones last.
const RULES: Rule[] = [
  {
    test: (m) => has(m, "mission"),
    reply: {
      type: "bot",
      text: "🎯 Our Mission:\n\nTo deliver efficient, responsive, and inclusive barangay services that promote the welfare and development of every resident of Talon Tres, Las Piñas City.\n\nWe are committed to accessible, transparent, and quality public service for our community.",
      quickReplies: ["Our Vision", "Our Values", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "vision"),
    reply: {
      type: "bot",
      text: "🌟 Our Vision:\n\nA progressive, peaceful, and united Barangay Talon Tres where every resident enjoys a good quality of life through cooperative governance and sustainable development.\n\nWe aim to be a model community in Las Piñas City.",
      quickReplies: ["Our Mission", "Our Values", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "values"),
    reply: {
      type: "bot",
      text: "💎 Our Values:\n\n• Malasakit – We care for our residents\n• Transparency – We serve with honesty and openness\n• Unity (Bayanihan) – We work together as one community\n• Service Excellence – We give our best to every resident",
      quickReplies: ["Our Mission", "Our Vision", "Visit Us", "Contact Info"],
    },
  },
  {
    test: (m) => has(m, "visit", "where", "location", "address", "saan"),
    reply: {
      type: "bot",
      text: `📍 Visit Us:\n\n${BRGY.name} Hall\n${BRGY.address}\n${BRGY.city}\n\nLandmarks nearby: Alabang–Zapote Road, CAA Road, Admiral Road, and Robinsons Las Piñas (all in Talon Tres).\n\nResidents are welcome to visit for barangay concerns, assistance, and inquiries.`,
      quickReplies: ["Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "emergency", "hotline", "police", "fire", "ambulance"),
    reply: {
      type: "bot",
      text: `🚨 Emergency:\n\nNational Emergency Hotline: ${BRGY.nationalEmergency}\n\nFor barangay concerns and assistance, call the Barangay Hall at ${BRGY.phone} during office hours.\n\nFor life-threatening situations, always call ${BRGY.nationalEmergency} first.`,
      quickReplies: ["Contact Info", "Blotter", "Office Hours"],
    },
  },
  {
    test: (m) => has(m, "contact", "phone", "number", "email", "call"),
    reply: {
      type: "bot",
      text: `📞 Contact Us:\n\n• Phone: ${BRGY.phone}\n${BRGY.email ? `• Email: ${BRGY.email}\n` : ""}${BRGY.facebook ? `• Facebook: ${BRGY.facebook}\n` : ""}• Office: ${BRGY.address}\n\nFeel free to reach out through any of these channels!`,
      quickReplies: ["Office Hours", "Visit Us", "Services"],
    },
  },
  {
    test: (m) =>
      has(m, "hours", "schedule", "open", "oras") || hasWord(m, "time"),
    reply: {
      type: "bot",
      text: `🕐 Office Hours:\n\n${BRGY.hours}\n\nClosed on weekends and public holidays. For emergencies, call ${BRGY.nationalEmergency}.`,
      quickReplies: ["Services", "Contact Info", "Visit Us"],
    },
  },
  {
    test: (m) => has(m, "clearance"),
    reply: {
      type: "bot",
      text: `📋 Barangay Clearance\n\nA certificate showing you are a resident in good standing, commonly needed for employment, business, or other transactions.\n\nUsual requirements:\n• Valid ID with Talon Tres address (or proof of residency)\n• Cedula (Community Tax Certificate)\n• Processing fee\n\n${REQUIREMENTS_NOTE}`,
      quickReplies: ["Cedula", "Residency", "Office Hours", "Services"],
    },
  },
  {
    test: (m) => has(m, "cedula", "community tax"),
    reply: {
      type: "bot",
      text: `📄 Cedula (Community Tax Certificate)\n\nUsual requirements:\n• Valid ID\n• Basic personal details (TIN, income details if applicable)\n• Payment of the tax\n\n${REQUIREMENTS_NOTE}`,
      quickReplies: ["Clearance", "Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "business", "permit"),
    reply: {
      type: "bot",
      text: `🏢 Barangay Business Clearance\n\nFor businesses operating in Talon Tres. The barangay clearance is one of the requirements for the city business permit from Las Piñas City Hall.\n\nUsual requirements:\n• Valid ID of owner\n• DTI/SEC registration (as applicable)\n• Proof of business location (lease or title)\n• Processing fee\n\n${REQUIREMENTS_NOTE}`,
      quickReplies: ["Clearance", "Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "indigency", "indigent"),
    reply: {
      type: "bot",
      text: `📄 Certificate of Indigency\n\nFor qualified residents who need it for medical, educational, or legal assistance.\n\nUsual requirements:\n• Valid ID\n• Proof of residency\n• Purpose of the certificate\n\nSubject to barangay assessment and verification. ${REQUIREMENTS_NOTE}`,
      quickReplies: ["Residency", "Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "residency", "residence", "resident certificate"),
    reply: {
      type: "bot",
      text: `🏠 Certificate of Residency\n\nProof that you live in Barangay Talon Tres.\n\nUsual requirements:\n• Valid ID\n• Proof of address (utility bill, lease contract, etc.)\n• Processing fee\n\n${REQUIREMENTS_NOTE}`,
      quickReplies: ["Clearance", "Indigency", "Office Hours", "Services"],
    },
  },
  {
    test: (m) => has(m, "good moral", "moral"),
    reply: {
      type: "bot",
      text: `✅ Certificate of Good Moral Character\n\nUsually needed for school, employment, or other applications.\n\nUsual requirements:\n• Valid ID\n• Barangay Clearance\n• Purpose of the certificate\n• Processing fee\n\n${REQUIREMENTS_NOTE}`,
      quickReplies: ["Clearance", "Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "blotter", "incident", "report", "complaint"),
    reply: {
      type: "bot",
      text: `📝 Barangay Blotter\n\nYou can report and record incidents such as:\n• Theft or lost items\n• Disturbances or noise complaints\n• Minor disputes between neighbors\n\nVisit the Barangay Hall and bring a valid ID and any evidence or witnesses, if available.\n\nFor emergencies, call ${BRGY.nationalEmergency}.`,
      quickReplies: ["Emergency", "Mediation", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "mediation", "lupon", "dispute", "katarungang"),
    reply: {
      type: "bot",
      text: "⚖️ Mediation (Lupong Tagapamayapa)\n\nUnder the Katarungang Pambarangay system, the barangay helps settle disputes between neighbors, families, or residents through mediation, conciliation, and arbitration before a case goes to court.\n\nVisit the Barangay Hall to file a complaint or request mediation, and bring relevant documents.",
      quickReplies: ["Blotter", "Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "senior", "pwd", "disab"),
    reply: {
      type: "bot",
      text: "👴👵♿ Senior Citizen & PWD Assistance\n\nThe barangay can guide you on:\n• Senior Citizen and PWD ID applications\n• Referrals to Las Piñas City programs (OSCA and PDAO)\n• Assistance with available benefits\n\nBring a valid ID, proof of residency, and supporting documents (e.g., birth certificate, medical certificate for PWD).",
      quickReplies: ["Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => has(m, "health", "medical", "doctor", "clinic"),
    reply: {
      type: "bot",
      text: `🏥 Health Services\n\nFor health concerns, check with the Barangay Hall or your nearest health center under the Las Piñas City Health Office for available services such as consultations, immunization, and maternal care.\n\nSchedules vary, so please call ${BRGY.phone} to confirm.`,
      quickReplies: ["Office Hours", "Contact Info", "Services"],
    },
  },
  {
    test: (m) => hasWord(m, "id", "barangay id"),
    reply: {
      type: "bot",
      text: "🪪 Barangay ID\n\nPlease visit the Barangay Hall during office hours and bring a valid ID and proof of residency. Ask the staff about the current requirements and fees.",
      quickReplies: ["Office Hours", "Contact Info", "Services", "Clearance"],
    },
  },
  {
    test: (m) => has(m, "service"),
    reply: {
      type: "bot",
      text: "🏛️ Barangay Services:\n\n• Barangay Clearance\n• Cedula (Community Tax Certificate)\n• Business Clearance\n• Certificate of Indigency\n• Certificate of Residency\n• Good Moral Certificate\n• Barangay Blotter\n• Mediation (Lupon)\n• Senior Citizen & PWD Assistance\n\nWhich one do you need?",
      quickReplies: ["Clearance", "Cedula", "Business Permit", "Indigency"],
    },
  },
  {
    test: (m) =>
      hasWord(
        m,
        "hello",
        "hi",
        "hey",
        "kumusta",
        "good morning",
        "good afternoon",
      ),
    reply: {
      type: "bot",
      text: `Hello! 👋 Kumusta! How can I help you with ${BRGY.name} services today?`,
      quickReplies: ["Our Mission", "Services", "Contact Info", "Office Hours"],
    },
  },
  {
    test: (m) => has(m, "thank", "salamat"),
    reply: {
      type: "bot",
      text: "Walang anuman! You're welcome! 😊 Feel free to ask if you need anything else. Mabuhay ang Talon Tres!",
      quickReplies: ["Our Mission", "Services", "Contact Info"],
    },
  },
];

const FALLBACK: Message = {
  type: "bot",
  text: `Sorry, I don't have information on that yet. For details, please visit ${BRGY.name} Hall during office hours or call ${BRGY.phone}.`,
  quickReplies: ["Services", "Contact Info", "Office Hours", "Visit Us"],
};

const getBotResponse = (message: string): Message => {
  const m = message.toLowerCase().trim();
  const match = RULES.find((rule) => rule.test(m));
  return match ? match.reply : FALLBACK;
};

export default function Chatbot() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPromoMessage, setShowPromoMessage] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: `Hi there! 👋 I'm your ${BRGY.name} Assistant. How can I help you today?`,
      quickReplies: MAIN_MENU,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide on dashboard, login, and register routes
  if (
    pathname?.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage;
    if (messageToSend.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: messageToSend }]);

    setTimeout(() => {
      setMessages((prev) => [...prev, getBotResponse(messageToSend)]);
    }, 800);

    setInputMessage("");
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Promo Message */}
      {showPromoMessage && !isChatOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl z-50 p-4 max-w-xs border-2 border-[#b91c1c] animate-bounce-slow">
          <button
            onClick={() => setShowPromoMessage(false)}
            className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors shadow-lg"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
              <Image
                src="/talon_tres-logo.png"
                alt="Talon Tres Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm mb-1">
                We're Live! 💬
              </p>
              <p className="text-gray-600 text-xs">
                Chat with us now for quick assistance in Talon Tres!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-[#7f1d1d] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Open Chatbot"
      >
        {isChatOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
            <Image
              src="/talon_tres-logo.png"
              alt="Talon Tres Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain animate-pulse"
              priority
            />
          </div>
        )}
        {/* Unread indicator - kept red, this is a genuine notification/alert badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
          1
        </span>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-red-600 to-[#7f1d1d] text-white p-4 flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Image
                src="/talon_tres-logo.png"
                alt="Talon Tres Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Talon Tres Assistant</h3>
              <p className="text-xs text-red-100">
                Barangay Talon Tres, Las Piñas City
              </p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl break-words ${
                      message.type === "user"
                        ? "bg-[#b91c1c] text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow-sm rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line break-words overflow-wrap-anywhere">
                      {message.text}
                    </p>
                  </div>
                </div>

                {/* Quick Reply Buttons */}
                {message.type === "bot" && message.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {message.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 text-xs bg-white border-2 border-[#b91c1c] text-[#b91c1c] rounded-full hover:bg-[#b91c1c] hover:text-white transition-colors duration-200 shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-[#b91c1c] text-white p-2 rounded-full hover:bg-[#7f1d1d] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .fixed.bottom-24.right-6.w-96 {
            width: calc(100vw - 2rem);
            right: 1rem;
            left: 1rem;
            bottom: 5rem;
            height: calc(100vh - 10rem);
            max-height: 550px;
          }
          .fixed.bottom-24.right-6.max-w-xs {
            right: 1rem;
            left: 1rem;
            max-width: calc(100vw - 2rem);
            bottom: 6rem;
          }
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
}
