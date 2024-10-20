"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState } from "react";
import { useJournalEntries } from "../../hooks/useJournalEntries";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const { selectedEntry, generateAIContext } = useJournalEntries();
  const [isViewingPreviousEntry, setIsViewingPreviousEntry] = useState(false);

  // optional: use configId from environment variable
  const configId = process.env["NEXT_PUBLIC_HUME_CONFIG_ID"];

  // Generate context from the selected journal entry
  const journalContext = selectedEntry && !isViewingPreviousEntry ? generateAIContext(selectedEntry) : "";

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
          context: selectedEntry && !isViewingPreviousEntry
            ? {
                text: journalContext,
                type: "persistent",
              }
            : undefined,
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
