"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, CalendarDays, Award, X, ZoomIn } from "lucide-react";

/* ------------------------------------------------------------------ */
/* BARANGAY DATA — edit here only.                                     */
/* Sources: PD No. 1336 (Apr 3, 1978), PSA 2024 POPCEN.                */
/* CONFIRM items need checking with the Barangay Hall.                 */
/* ------------------------------------------------------------------ */
const ABOUT = {
  population: "33,192", // 2024 POPCEN (PSA)
  foundedYear: "1978", // PD No. 1336, signed April 3, 1978
  originalSubdivisions: 7, // Carmencita, Paramount, Admiral Park, Pelayo, Aristocrat, Doña Purisima, Golden Gate
  officialsTotal: 11, // CONFIRM: 9 elected + 2 appointive
  electedOfficials: 9, // Punong Barangay, 7 Kagawad, SK Chairperson
  appointiveStaff: 2, // Barangay Secretary, Barangay Treasurer
  barangaysInCity: 20, // Las Piñas City
  term: "2023–2026", // CONFIRM: update after the next barangay elections
};

export default function AboutSection() {
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);

  const stats = [
    {
      icon: Users,
      number: ABOUT.population,
      label: "Residents (2024 Census)",
    },
    {
      icon: MapPin,
      number: String(ABOUT.originalSubdivisions),
      label: "Original Subdivisions",
    },
    {
      icon: CalendarDays,
      number: ABOUT.foundedYear,
      label: "Barangay Created",
    },
    {
      icon: Award,
      number: String(ABOUT.officialsTotal),
      label: "Barangay Officials",
    },
  ];

  const highlights = [
    "Delivering efficient and responsive barangay services to every resident",
    "Providing barangay clearances, certificates, and community assistance",
    "Settling neighborhood disputes through the Lupong Tagapamayapa",
    "Working with Las Piñas City on health, peace and order, and community programs",
  ];

  const caption = `Barangay Officials & Staff ${ABOUT.term}`;

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats Grid - Now on Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all border border-slate-100 text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#b91c1c] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-[#b91c1c] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Text Content - Now on Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-[#b91c1c]">
                Our Community
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#b91c1c]">
              Barangay Talon Tres
            </h2>

            <div className="w-20 h-1.5 bg-[#b91c1c] rounded-full mb-6" />

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Barangay Talon Tres is in the City of Las Piñas, Metro Manila. It
              was created on April 3, 1978, under Presidential Decree No. 1336,
              when the subdivisions of Carmencita, Paramount, Admiral Park,
              Pelayo, Aristocrat, Doña Purisima, and Golden Gate were detached
              from Barangay Talon to form a distinct and independent barangay.
              Today it is home to more than 33,000 residents, according to the
              2024 Census of Population.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Located along the busy Alabang–Zapote Road, our barangay is home
              to families, schools, and businesses, including Robinsons Las
              Piñas. We are committed to serving every resident with malasakit,
              transparency, and unity. Our work includes:
            </p>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#b91c1c] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                    <span className="text-white text-lg font-bold">✓</span>
                  </div>
                  <span className="text-gray-800 text-lg font-medium">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-[#7f1d1d] hover:from-red-700 hover:to-[#5f1414] text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Learn More About Us
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Team Picture Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-[#b91c1c]">
                Meet Our Team
              </span>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-[#b91c1c]">
              The People Behind Our Community
            </h3>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Dedicated leaders and staff working together to serve Barangay
              Talon Tres
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <div className="aspect-[21/9] bg-[#eaf0fb] relative">
              <img
                src="/our-team2.jpg"
                alt="Barangay Talon Tres Team"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  <ZoomIn className="w-8 h-8 text-gray-800" />
                </div>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#b91c1c]/40 rounded-3xl transition-all duration-300" />
            </div>

            {/* Caption overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
            >
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {caption}
              </h4>
              <p className="text-white/90 text-lg">
                Together, building a stronger community for all
              </p>
            </motion.div>
          </motion.div>

          {/* Team stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-[#b91c1c] mb-2">
                {ABOUT.electedOfficials}
              </div>
              <div className="text-gray-700 font-medium">Elected Officials</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-[#b91c1c] mb-2">
                {ABOUT.appointiveStaff}
              </div>
              <div className="text-gray-700 font-medium">Appointive Staff</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-[#b91c1c] mb-2">
                {ABOUT.barangaysInCity}
              </div>
              <div className="text-gray-700 font-medium">
                Barangays in Las Piñas City
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#b91c1c]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#b91c1c]/5 rounded-full blur-3xl" />

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group z-50"
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close image"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/our-team2.jpg"
                alt="Barangay Talon Tres Team - Full View"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Image caption */}
              <div className="mt-6 text-center">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {caption}
                </h4>
                <p className="text-white/80 text-lg">
                  Together, building a stronger community for all
                </p>
              </div>
            </motion.div>

            {/* Click outside hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              Click anywhere to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
