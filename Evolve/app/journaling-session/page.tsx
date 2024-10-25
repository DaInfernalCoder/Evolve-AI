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
import { useJournalEntries, JournalEntry } from "@/hooks/useJournalEntries";

const moods = [
  "Excited", "Happy", "Content", "Neutral", "Anxious",
  "Sad", "Angry", "Frustrated", "Tired", "Energetic"
] as const;

// eslint-disable-next-line no-unused-vars
type Mood = typeof moods[number];

interface NewEntryForm {
  title: string;
  content: string;
  mood: string;
}

export default function JournalHomescreen() {
  const { entries, addEntry, deleteEntry } = useJournalEntries();
  const [newEntry, setNewEntry] = React.useState<NewEntryForm>({ 
    title: "", 
    content: "", 
    mood: "" 
  });
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleNewEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.content || !newEntry.mood) return;

    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
    };

    addEntry(entry);
    setNewEntry({ title: "", content: "", mood: "" });
  };

  const handleDeleteEntry = (id: number) => {
    deleteEntry(id);
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
      setIsDialogOpen(false);
    }
  };

  const generateAIContext = (entry: JournalEntry): string => {
    const moodAnalysis = `Your mood was ${entry.mood.toLowerCase()} during this entry.`;
    const dateContext = `Written on ${format(entry.date, "MMMM d, yyyy")}`;
    return `${dateContext}. ${moodAnalysis}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-6">
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
            className="mb-4 bg-card border-input text-foreground"
          />
          <Select
            value={newEntry.mood}
            onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
          >
            <SelectTrigger className="mb-4 bg-card border-input text-foreground">
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
            className="mb-4 bg-card border-input text-foreground"
            rows={4}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!newEntry.title || !newEntry.content || !newEntry.mood}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Entry
          </Button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Past Entries</h2>
        <ScrollArea className="h-[400px] rounded-md border border-input p-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center mb-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex-grow text-left hover:bg-muted text-foreground"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <div>
                      <p className="font-bold">{entry.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(entry.date), "MMMM d, yyyy")} - Mood: {entry.mood}
                      </p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card text-foreground">
                  <DialogHeader>
                    <DialogTitle>{entry.title}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(new Date(entry.date), "MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Mood: {entry.mood}
                    </p>
                    <p>{entry.content}</p>
                    <div className="mt-4 p-2 bg-muted rounded">
                      <p className="text-sm font-bold">AI Context:</p>
                      <p className="text-sm">{generateAIContext(entry)}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                className="ml-2 text-destructive hover:text-destructive-foreground hover:bg-muted"
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
