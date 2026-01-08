'use client';

import { useState } from 'react';
import GenreSelection from '@/components/GenreSelection';
import CharacterCreation from '@/components/CharacterCreation';
import GameInterface from '@/components/GameInterface';
import { Genre, Character } from '@/types/game';

type GamePhase = 'genre-selection' | 'character-creation' | 'playing';

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>('genre-selection');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    setPhase('character-creation');
  };

  const handleCharacterComplete = (char: Character) => {
    setCharacter(char);
    setPhase('playing');
  };

  const handleRestart = () => {
    setPhase('genre-selection');
    setSelectedGenre(null);
    setCharacter(null);
  };

  if (phase === 'genre-selection') {
    return <GenreSelection onSelect={handleGenreSelect} />;
  }

  if (phase === 'character-creation' && selectedGenre) {
    return (
      <CharacterCreation
        genre={selectedGenre}
        onComplete={handleCharacterComplete}
      />
    );
  }

  if (phase === 'playing' && selectedGenre && character) {
    return (
      <GameInterface
        genre={selectedGenre}
        character={character}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
