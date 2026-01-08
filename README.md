# 🎭 AI Storyteller & Dungeon Master

An interactive story game powered by **Gatewayz AI** where you can embark on epic adventures across multiple genres. The AI acts as your storyteller and dungeon master, creating rich narratives that respond to your choices.

## ✨ Features

- **🎮 5 Unique Genres**: Fantasy, Sci-Fi, Mystery, Horror, and Western - each with its own atmosphere and specialized AI model
- **🧙 Character Creation**: Create your character with name, class/role, and background
- **🤖 Genre-Specific AI Models**: Each genre uses a different AI model optimized for that storytelling style
- **📖 Interactive Storytelling**: Make choices that directly impact your adventure
- **💬 Natural Conversation**: Type custom actions or use quick-action buttons
- **🎨 Beautiful UI**: Dark-themed, immersive interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- A Gatewayz API key (get one from [Gatewayz](https://gatewayz.ai))

### Installation

1. **Clone the repository** (if applicable) or ensure you're in the project directory

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**:
   - Open the `.env` file in the root directory
   - Replace `your_api_key_here` with your actual Gatewayz API key:
   ```
   GATEWAYZ_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 How to Play

1. **Select a Genre**: Choose from Fantasy, Sci-Fi, Mystery, Horror, or Western
2. **Create Your Character**: Give your character a name and optional class/background
3. **Begin Your Adventure**: The AI will set the opening scene
4. **Make Choices**:
   - Type custom actions in the input field
   - Use quick-action buttons (Investigate, Look Around, Talk)
   - Respond to numbered choices presented by the AI
5. **Shape Your Story**: Your choices influence the narrative's direction

## 🤖 AI Models by Genre

Each genre uses a specialized AI model through Gatewayz:

- **Fantasy** 🐉: GPT-4o (rich descriptive narratives)
- **Sci-Fi** 🚀: Claude 3.5 Sonnet (logical, scientific storytelling)
- **Mystery** 🔍: Claude 3.5 Sonnet (methodical investigation)
- **Horror** 👻: GPT-4o (atmospheric tension building)
- **Western** 🤠: GPT-4o Mini (action-packed frontier tales)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # Chat completions endpoint
│   │   └── models/route.ts     # Models listing endpoint
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main game orchestrator
│   └── globals.css             # Global styles
├── components/
│   ├── GenreSelection.tsx      # Genre selection screen
│   ├── CharacterCreation.tsx   # Character creation form
│   └── GameInterface.tsx       # Main game interface
├── types/
│   └── game.ts                 # TypeScript types and genre configs
└── lib/
    └── utils.ts                # Utility functions
```

## 🎨 Customization

### Adding a New Genre

1. Open `src/types/game.ts`
2. Add your genre to the `Genre` type
3. Add a configuration in `GENRE_CONFIGS`:

```typescript
newgenre: {
  name: 'New Genre',
  description: 'Description of the genre',
  icon: '🎪',
  model: 'openai/gpt-4o-mini',
  temperature: 0.85,
  systemPrompt: 'Your custom system prompt...',
}
```

### Adjusting AI Behavior

Modify the `systemPrompt` in `src/types/game.ts` for each genreto change how the AI tells stories.

## 🔧 API Integration

This app uses the **Gatewayz AI API**, which provides:

- **Unified API**: Access to multiple AI providers through one interface
- **Model Selection**: Use different models optimized for different tasks
- **OpenAI-Compatible**: Standard API format for easy integration

### API Endpoints Used

1. **Chat Completions** (`POST /v1/chat/completions`):
   - Generates story responses
   - Supports multiple models and providers

2. **Get Models** (`GET /v1/models`):
   - Lists available AI models (used for future expansion)

## 🌟 Key Technologies

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Gatewayz AI API**

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you've added your API key to the `.env` file
- Restart the development server after updating `.env`

### Stories not generating
- Check your API key is valid
- Check console for error messages
- Verify your Gatewayz account has available credits

### UI issues
- Clear browser cache
- Ensure all dependencies are installed
- Try a different browser

## 📝 License

This project is provided as-is for demonstration purposes.

## 🙏 Credits

- Powered by [Gatewayz AI](https://gatewayz.ai)
- Built with Next.js and React
- UI components styled with Tailwind CSS

---

**Enjoy your adventure! 🎮✨**
# ai-storyteller-and-dungeon-master
