import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PersonStanding } from "lucide-react";
import { useState } from "react";
import { useJournalEntries } from "@/hooks/useJournalEntries";

export default function StartCall() {
  const { status, connect } = useVoice();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { entries } = useJournalEntries();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 p-4 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center gap-4"
              variants={{
                initial: { scale: 0.5, y: 50 },
                enter: { scale: 1, y: 0 },
                exit: { scale: 0.5, y: 50 },
              }}
            >
              <Select
                onValueChange={(value) => setSelectedEntry(entries.find(entry => entry.id.toString() === value) || null)}
                value={selectedEntry?.id.toString() || ""}
              >
                <SelectTrigger className="w-[300px] bg-white text-gray-900">
                  <SelectValue placeholder="Select a journal entry" />
                </SelectTrigger>
                <SelectContent>
                  {entries.map((entry) => (
                    <SelectItem key={entry.id} value={entry.id.toString()}>
                      {entry.date.toISOString().split('T')[0]} - {entry.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="z-50 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
                disabled={!selectedEntry}
              >
                <PersonStanding className="size-5 mr-2" strokeWidth={2} />
                Start Therapy Session
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
