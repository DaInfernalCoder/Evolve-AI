"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Brain } from "lucide-react";
import { motion } from "framer-motion";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dots, setDots] = useState([]);

  useLayoutEffect(() => {
    const el = document.documentElement;
    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 60, // Limit to navbar height
      size: Math.random() * 4 + 1,
      color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, ${Math.random() * 0.2 + 0.1})`,
    }));
    setDots(newDots);
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="relative px-4 py-2 flex items-center h-14 z-50 bg-gradient-to-r from-blue-900 to-purple-900 border-b border-blue-800">
      {/* Animated Dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
          animate={{
            x: [dot.x, dot.x + Math.random() * 100 - 50],
            y: [dot.y, dot.y + Math.random() * 20 - 10],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Logo and Title */}
      <div className="flex items-center space-x-2 z-10">
        <Brain className="h-8 w-8 text-white" />
        <h1 className="text-xl font-bold text-white">Evolve</h1>
      </div>

      {/* Dark Mode Toggle */}
      <Button
        onClick={toggleDark}
        variant="ghost"
        className="ml-auto flex items-center gap-1.5 text-white hover:bg-blue-800 z-10"
      >
        <span>
          {isDarkMode ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </span>
        <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
      </Button>
    </div>
  );
};
