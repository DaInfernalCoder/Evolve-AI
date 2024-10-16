import { useState, useEffect } from 'react';

export interface JournalEntry {
  id: number;
  date: Date;
  title: string;
  content: string;
}

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call or database query
    const fetchEntries = async () => {
      const initialEntries: JournalEntry[] = [
        { id: 1, date: new Date(2023, 9, 15), title: "A productive day", content: "Today was incredibly productive. I managed to complete all my tasks ahead of schedule and even had time to start on a personal project. I feel accomplished and motivated to keep this momentum going." },
        { id: 2, date: new Date(2023, 9, 14), title: "Reflections on growth", content: "As I look back on the past few months, I can see significant personal growth. I've overcome challenges I never thought I could and learned valuable lessons along the way. It's important to acknowledge and celebrate these milestones." },
        { id: 3, date: new Date(2023, 9, 13), title: "New beginnings", content: "I've decided to start a new project that I've been putting off for a while. It's both exciting and nerve-wracking, but I believe it's time to step out of my comfort zone and embrace new opportunities for learning and growth." },
      ];
      setEntries(initialEntries);
    };

    fetchEntries();
  }, []);

  const addEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    setEntries(prevEntries => [
      { ...newEntry, id: prevEntries.length + 1 },
      ...prevEntries
    ]);
  };

  return { entries, addEntry };
}
