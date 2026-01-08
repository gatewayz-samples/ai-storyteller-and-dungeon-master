'use client';

import { useState, useRef, useEffect } from 'react';
import { Character, Genre, GENRE_CONFIGS, StoryMessage } from '@/types/game';

interface GameInterfaceProps {
  genre: Genre;
  character: Character;
  onRestart: () => void;
}

export default function GameInterface({ genre, character, onRestart }: GameInterfaceProps) {
  const [messages, setMessages] = useState<StoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStartedGame = useRef(false);
  const config = GENRE_CONFIGS[genre];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Only start the game once using useRef to prevent multiple AI calls
    if (!hasStartedGame.current) {
      hasStartedGame.current = true;
      startGame();
    }
  }, []);

  const startGame = async () => {
    const systemMessage: StoryMessage = {
      role: 'system',
      content: config.systemPrompt,
    };

    const characterIntro = `My character is ${character.name}${
      character.class ? `, a ${character.class}` : ''
    }${character.background ? ` with a background as a ${character.background}` : ''}.`;

    const initialPrompt: StoryMessage = {
      role: 'user',
      content: `${characterIntro} Begin our ${genre} adventure by setting an engaging opening scene. Then present me with 2-3 numbered choices for what to do next.`,
    };

    setMessages([systemMessage, initialPrompt]);
    await sendMessage([systemMessage, initialPrompt]);
  };

  const sendMessage = async (messageHistory: StoryMessage[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messageHistory,
          model: config.model,
          temperature: config.temperature,
          max_tokens: 950,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: StoryMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: StoryMessage = {
        role: 'assistant',
        content: '⚠️ An error occurred. Please try again or restart the game.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: StoryMessage = {
      role: 'user',
      content: userInput.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');

    await sendMessage(newMessages);
  };

  const handleQuickChoice = async (choice: string) => {
    if (isLoading) return;

    const userMessage: StoryMessage = {
      role: 'user',
      content: choice,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    await sendMessage(newMessages);
  };

  const displayMessages = messages.filter((m) => m.role !== 'system');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {config.icon} {config.name} Adventure
            </h2>
            <p className="text-sm text-slate-400">
              Playing as <span className="text-purple-400 font-semibold">{character.name}</span>
              {character.class && <span> the {character.class}</span>}
            </p>
          </div>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
          >
            New Game
          </button>
        </div>
      </div>

      {/* Story Display */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {displayMessages.map((message, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 ${
                message.role === 'user'
                  ? 'bg-purple-600/20 border border-purple-500/30 ml-8'
                  : 'bg-slate-800/50 border border-slate-700 mr-8'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {message.role === 'user' ? '🎭' : '📖'}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">
                    {message.role === 'user' ? 'You' : 'Storyteller'}
                  </div>
                  <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mr-8">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📖</div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Storyteller</div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce animation-delay-200">.</span>
                      <span className="animate-bounce animation-delay-400">.</span>
                    </div>
                    <span>Crafting your story...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-t border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your action or choice (e.g., 'I choose option 1' or describe what you do)..."
              className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickChoice('Tell me more about this situation')}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔍 Investigate
            </button>
            <button
              onClick={() => handleQuickChoice('I look around carefully')}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👀 Look Around
            </button>
            <button
              onClick={() => handleQuickChoice('I talk to someone nearby')}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💬 Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
