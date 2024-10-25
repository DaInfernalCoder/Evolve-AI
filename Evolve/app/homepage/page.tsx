"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare, Phone, ChevronDown, Menu, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dots, setDots] = useState([]);
  const router = useRouter();

  const recentChats = [
    { title: "Dealing with anxiety", time: "2 hours ago" },
    { title: "Improving sleep habits", time: "1 day ago" },
    { title: "Managing work stress", time: "3 days ago" },
    { title: "Relationship advice", time: "1 week ago" },
  ];

  useEffect(() => {
    const newDots = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 2, // Increased size range
      color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
        Math.random() * 100 + 100
      )}, 255, ${Math.random() * 0.3 + 0.4})`, // Random blue shades with higher opacity
    }));
    setDots(newDots);
  }, []);

  const handleVoiceSessionClick = () => {
    router.push("/voice-session");
  };

  const handleJournalingSessionClick = () => {
    router.push("/journaling-session");
  };

  return (
    <div className="relative flex h-screen bg-background text-foreground overflow-hidden">
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
            x: [dot.x, dot.x + Math.random() * 200 - 100],
            y: [dot.y, dot.y + Math.random() * 200 - 100],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sidebar Toggle Button and Logo */}
      <div className="fixed top-4 left-4 z-50 flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-foreground" />
          <h1 className="text-xl font-bold text-foreground">Evolve</h1>
        </div>
      </div>

      {/* Left Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40"
        initial={{ x: -256 }}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-4 pt-16">
          <nav>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">
              Your recent chats
            </h2>
            {recentChats.map((chat, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left mb-1 text-foreground hover:text-foreground hover:bg-muted"
              >
                <div>
                  <div className="font-medium">{chat.title}</div>
                  <div className="text-sm text-muted-foreground">{chat.time}</div>
                </div>
              </Button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-10">
        {/* Main Area */}
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-6 text-center">
            How are you feeling today, Sumit?
          </h2>
          <div className="w-full max-w-md space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Journey <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card text-foreground">
                <DropdownMenuItem
                  onSelect={handleJournalingSessionClick}
                  className="hover:bg-muted"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Journaling Session</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleVoiceSessionClick}
                  className="hover:bg-muted"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Voice Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>
      </div>
    </div>
  );
}
