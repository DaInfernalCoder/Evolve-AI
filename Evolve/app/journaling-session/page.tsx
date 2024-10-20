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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useJournalEntries } from "@/hooks/useJournalEntries";

const moods = [
  "Excited", "Happy", "Content", "Neutral", "Anxious",
  "Sad", "Angry", "Frustrated", "Tired", "Energetic"
];

export default function JournalHomescreen() {
  const { entries, addEntry, selectEntry, deleteEntry, generateAIContext } = useJournalEntries();
  const [newEntry, setNewEntry] = React.useState({ title: "", content: "", mood: "" });
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  const handleNewEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
    });
    setNewEntry({ title: "", content: "", mood: "" });
  };

  const handleDeleteEntry = (id: number) => {
    deleteEntry(id);
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
    }
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
          <Select
            value={newEntry.mood}
            onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
          >
            <SelectTrigger className="mb-4 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent>
              {moods.map((mood) => (
                <SelectItem key={mood} value={mood}>
                  {mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <div key={entry.id} className="flex items-center mb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex-grow text-left hover:bg-gray-800 text-white"
                    onClick={() => {
                      setSelectedEntry(entry);
                      selectEntry(entry);
                    }}
                  >
                    <div>
                      <p className="font-bold">{entry.title}</p>
                      <p className="text-sm text-gray-400">
                        {format(new Date(entry.date), "MMMM d, yyyy")} - Mood: {entry.mood}
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
                        format(new Date(selectedEntry.date), "MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      Mood: {selectedEntry?.mood}
                    </p>
                    <p>{selectedEntry?.content}</p>
                    {selectedEntry && (
                      <div className="mt-4 p-2 bg-gray-800 rounded">
                        <p className="text-sm font-bold">AI Context:</p>
                        <p className="text-sm">{generateAIContext(selectedEntry)}</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                className="ml-2 text-red-500 hover:text-red-700 hover:bg-gray-800"
                onClick={() => handleDeleteEntry(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
