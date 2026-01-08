'use client';

import { Genre, GENRE_CONFIGS } from '@/types/game';

interface GenreSelectionProps {
  onSelect: (genre: Genre) => void;
}

export default function GenreSelection({ onSelect }: GenreSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            AI Storyteller & Dungeon Master
          </h1>
          <p className="text-xl text-slate-300">
            Choose your genre and embark on an epic adventure
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Powered by Gatewayz AI - Each genre uses a specialized model
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.keys(GENRE_CONFIGS) as Genre[]).map((genreKey) => {
            const config = GENRE_CONFIGS[genreKey];
            return (
              <button
                key={genreKey}
                onClick={() => onSelect(genreKey)}
                className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="text-5xl mb-4">{config.icon}</div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {config.name}
                  </h3>

                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {config.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-slate-900/50 rounded-full border border-slate-700">
                      {config.model.split('/')[1] || config.model}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
            <p className="text-slate-300 text-sm">
              💡 <span className="font-semibold">Tip:</span> Each genre uses a different AI model optimized for that storytelling style
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
