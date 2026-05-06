"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeToggle() {
  const { dark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
