import { useState, useEffect } from 'react';

export interface JournalEntry {
  id: number;
  date: Date;
  title: string;
  content: string;
  mood: string;
}

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    } else {
      // Initial entries if no stored entries exist
      const initialEntries: JournalEntry[] = [
        { id: 1, date: new Date(2023, 9, 15), title: "A productive day", content: "Today was incredibly productive. I managed to complete all my tasks ahead of schedule and even had time to start on a personal project. I feel accomplished and motivated to keep this momentum going.", mood: "Excited" },
        { id: 2, date: new Date(2023, 9, 14), title: "Reflections on growth", content: "As I look back on the past few months, I can see significant personal growth. I've overcome challenges I never thought I could and learned valuable lessons along the way. It's important to acknowledge and celebrate these milestones.", mood: "Content" },
        { id: 3, date: new Date(2023, 9, 13), title: "New beginnings", content: "I've decided to start a new project that I've been putting off for a while. It's both exciting and nerve-wracking, but I believe it's time to step out of my comfort zone and embrace new opportunities for learning and growth.", mood: "Anxious" },
      ];
      setEntries(initialEntries);
      localStorage.setItem('journalEntries', JSON.stringify(initialEntries));
    }
  }, []);

  const addEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    const updatedEntries = [
      { ...newEntry, id: entries.length + 1 },
      ...entries
    ];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const selectEntry = (entry: JournalEntry | null) => {
    setSelectedEntry(entry);
  };

  const deleteEntry = (id: number) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
    }
  };

  // Function to generate context for AI
  const generateAIContext = (entry: JournalEntry) => {
    const formattedDate = entry.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `Date: ${formattedDate}\nTitle: ${entry.title}\nMood: ${entry.mood}\nContent: ${entry.content}`;
  };

  return { entries, addEntry, selectedEntry, selectEntry, deleteEntry, generateAIContext };
}
