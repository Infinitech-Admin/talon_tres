"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(185, 28, 28, 0.06) 0%, rgba(185, 28, 28, 0.10) 100%)`,
          zIndex: 0,
        }}
      />

      {/* Two soft blobs: navy (structure) + the site's one gold accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            backgroundColor: "#b91c1c",
            borderRadius: "50%",
            mixBlendMode: "multiply",
            filter: "blur(80px)",
            opacity: 0.12,
          }}
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            backgroundColor: "#b91c1c",
            borderRadius: "50%",
            mixBlendMode: "multiply",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "24px" }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            style={{ display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: `2px solid #b91c1c`,
                backdropFilter: "blur(10px)",
              }}
            >
              <Sparkles
                style={{ width: "16px", height: "16px", color: "#b91c1c" }}
              />
              <span
                style={{ color: "#b91c1c", fontWeight: 600, fontSize: "14px" }}
              >
                Welcome to Barangay Talon Tres
              </span>
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "24px",
            lineHeight: 1.2,
            color: "#b91c1c",
          }}
        >
          Your Community, Our Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: "18px",
            color: "rgba(0, 0, 0, 0.7)",
            maxWidth: "768px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          Transparent, efficient government services at your fingertips. Connect
          with Barangay Talon Tres, access services easily, and be part of
          building a thriving community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 15px rgba(185, 28, 28, 0.25)",
              }}
            >
              Explore Services
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "8px",
                border: "2px solid #b91c1c",
                background: "white",
                color: "#b91c1c",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
