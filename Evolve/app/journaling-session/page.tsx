"use client";

import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useJournalEntries } from "@/hooks/useJournalEntries";

export default function JournalHomescreen() {
  const { entries, addEntry } = useJournalEntries();
  const [newEntry, setNewEntry] = React.useState({ title: "", content: "" });
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  const handleNewEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
    });
    setNewEntry({ title: "", content: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Journaling Therapy</h1>
        <p className="text-xl">{format(new Date(), "MMMM d, yyyy")}</p>
      </header>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleNewEntrySubmit} className="mb-8">
          <Input
            type="text"
            placeholder="Entry title"
            value={newEntry.title}
            onChange={(e) =>
              setNewEntry({ ...newEntry, title: e.target.value })
            }
            className="mb-4 bg-gray-900 border-gray-700 text-white"
          />
          <Textarea
            placeholder="Write your journal entry here..."
            value={newEntry.content}
            onChange={(e) =>
              setNewEntry({ ...newEntry, content: e.target.value })
            }
            className="mb-4 bg-gray-900 border-gray-700 text-white"
            rows={4}
          />
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Entry
          </Button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Past Entries</h2>
        <ScrollArea className="h-[400px] rounded-md border border-gray-700 p-4">
          {entries.map((entry) => (
            <Dialog key={entry.id}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full text-left mb-2 hover:bg-gray-100"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div>
                    <p className="font-bold">{entry.title}</p>
                    <p className="text-sm text-gray-400">
                      {format(entry.date, "MMMM d, yyyy")}
                    </p>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle>{selectedEntry?.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                  <p className="text-sm text-gray-400 mb-2">
                    {selectedEntry &&
                      format(selectedEntry.date, "MMMM d, yyyy")}
                  </p>
                  <p>{selectedEntry?.content}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
