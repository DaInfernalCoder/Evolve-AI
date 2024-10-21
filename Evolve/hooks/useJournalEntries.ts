import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  content: string;
  createdAt: Date;
}

const useJournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    // Load entries from localStorage
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }

    // Calculate initial streak
    calculateStreak();
  }, []);

  const addEntry = (content: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Update streak
    setStreak(prevStreak => prevStreak + 1);
  };

  const calculateStreak = () => {
    if (entries.length === 0) return;

    let currentStreak = 0;
    let lastEntryDate = new Date(entries[0].createdAt);
    
    for (let i = 1; i < entries.length; i++) {
      const entryDate = new Date(entries[i].createdAt);
      const diffDays = Math.floor((lastEntryDate.getTime() - entryDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        lastEntryDate = entryDate;
      } else {
        break;
      }
    }

    setStreak(currentStreak + 1);
  };

  return { entries, addEntry, streak };
};

export default useJournalEntries;
