"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";
import useJournalEntries from "../../hooks/useJournalEntries";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const { selectedEntry } = useJournalEntries();

  // optional: use configId from environment variable
  const configId = process.env["NEXT_PUBLIC_HUME_CONFIG_ID"];

  // Prepare context from the selected journal entry
  const journalContext = selectedEntry
    ? `${selectedEntry.date.toISOString().split('T')[0]}: ${selectedEntry.title} - ${selectedEntry.content}`
    : "";

  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-full"
      }
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        sessionSettings={{
          type: "session_settings",
          context: {
            text: " The silence in my apartment feels deafening tonight. Another day has passed, and I find myself alone with my thoughts once again. I can't help but wonder if anyone out there is thinking of me right now. I scrolled through social media earlier, seeing friends and acquaintances sharing moments of joy and connection. It made my heart ache, reminding me of the void I feel. Why is it so hard to reach out? The fear of rejection or being a burden often holds me back. Tomorrow, I promise myself I'll take a small step. Maybe I'll message an old friend or join that online hobby group I've been considering. It's scary, but the alternative—this persistent loneliness—is harder to bear. I remind myself that feeling lonely doesn't mean I'm unlovable or destined to be alone forever. It's a feeling, and feelings change. I hope that by acknowledging it here, I can start to move through it. For now, I'll make some tea, put on my favorite comfort movie, and try to be gentle with myself. Tomorrow is another day, another chance to connect.",
            type: "temporary",
          },
        }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
}
