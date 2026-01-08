'use client';

import { useState } from 'react';
import { Character, Genre } from '@/types/game';

interface CharacterCreationProps {
  genre: Genre;
  onComplete: (character: Character) => void;
}

export default function CharacterCreation({ genre, onComplete }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [background, setBackground] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        class: characterClass.trim() || undefined,
        background: background.trim() || undefined,
      });
    }
  };

  const getPlaceholders = () => {
    switch (genre) {
      case 'fantasy':
        return {
          class: 'Warrior, Mage, Rogue, Cleric...',
          background: 'Noble, Orphan, Scholar, Mercenary...',
        };
      case 'scifi':
        return {
          class: 'Pilot, Engineer, Scientist, Soldier...',
          background: 'Colony Born, Earth Native, Military Veteran...',
        };
      case 'mystery':
        return {
          class: 'Detective, Private Eye, Journalist, Consultant...',
          background: 'Former Police, Amateur Sleuth, Academic...',
        };
      case 'horror':
        return {
          class: 'Investigator, Survivor, Occultist, Skeptic...',
          background: 'Journalist, Student, Drifter, Local...',
        };
      case 'western':
        return {
          class: 'Gunslinger, Sheriff, Outlaw, Prospector...',
          background: 'Cattle Rancher, Drifter, Former Soldier...',
        };
    }
  };

  const placeholders = getPlaceholders();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Your Character</h2>
        <p className="text-slate-400 text-center mb-8">Who will you be in this {genre} adventure?</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Character Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Enter your character's name"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-slate-200 mb-2">
              Class / Role <span className="text-slate-500">(optional)</span>
            </label>
            <input
              type="text"
              id="class"
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={placeholders.class}
            />
          </div>

          <div>
            <label htmlFor="background" className="block text-sm font-medium text-slate-200 mb-2">
              Background <span className="text-slate-500">(optional)</span>
            </label>
            <input
              type="text"
              id="background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={placeholders.background}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            Begin Adventure
          </button>
        </form>
      </div>
    </div>
  );
}
