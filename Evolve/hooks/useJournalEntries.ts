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

  // Load entries from localStorage on initial render
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      // Parse the saved entries and convert date strings back to Date objects
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setEntries(parsedEntries);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry: JournalEntry) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const deleteEntry = (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  return {
    entries,
    addEntry,
    deleteEntry
  };
}
