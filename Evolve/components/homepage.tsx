'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageSquare, Phone, ChevronDown, Smile, Meh, Frown, Menu } from 'lucide-react'

export function Homepage() {
  type Mood = 'happy' | 'neutral' | 'sad';
  const [currentMood] = useState<Mood>('neutral')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const recentChats = [
    { title: "Dealing with anxiety", time: "2 hours ago" },
    { title: "Improving sleep habits", time: "1 day ago" },
    { title: "Managing work stress", time: "3 days ago" },
    { title: "Relationship advice", time: "1 week ago" },
  ]

  const moodEmoji = {
    happy: <Smile className="h-6 w-6 text-primary" />,
    neutral: <Meh className="h-6 w-6 text-primary" />,
    sad: <Frown className="h-6 w-6 text-primary" />,
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Left Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="CareBot Logo" />
              <AvatarFallback>CB</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">CareBot</h1>
          </div>
          <nav>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">Your recent chats</h2>
            {recentChats.map((chat, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start text-left mb-1">
                <div>
                  <div className="font-medium">{chat.title}</div>
                  <div className="text-sm text-muted-foreground">{chat.time}</div>
                </div>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border p-4 flex justify-end items-center">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        {/* Main Area */}
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">How are you doing today, Sumit?</h2>
          <div className="w-full max-w-md space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full text-lg h-12">
                  Start New Session <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Chat Session</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Voice Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border p-4 flex justify-end items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Current Mood:</span>
            {moodEmoji[currentMood]}
            <Button variant="outline" size="sm" onClick={() => {/* Navigate to mood tracker page */}}>
              Track Mood
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}