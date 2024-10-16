import React from 'react';
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cn } from "../../lib/utils";

const Nav = dynamic(() => import("../../components/hume_ai/Nav").then(mod => mod.Nav), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Voice Session - Evolve AI",
  description: "Empathic Voice Interface powered by Hume AI",
};

export default function VoiceSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col min-h-screen")}>
      <Nav />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
