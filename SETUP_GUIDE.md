# 🚀 Setup Guide - AI Storyteller & Dungeon Master

## Step-by-Step Setup Instructions

### 1. Prerequisites Check ✅

Make sure you have:
- **Node.js 18+** or **Bun** installed
- A **Gatewayz API key** (sign up at [https://gatewayz.ai](https://gatewayz.ai))
- A code editor (VS Code recommended)
- A terminal/command prompt

### 2. Configure API Key 🔑

1. Locate the `.env` file in the project root directory
2. Open it in your text editor
3. Replace `your_api_key_here` with your actual Gatewayz API key:

```
GATEWAYZ_API_KEY=gw_1234567890abcdef  # Replace with your actual key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Keep your API key secure! Never commit it to version control.

### 3. Install Dependencies 📦

Open your terminal in the project directory and run:

```bash
# If using Bun (recommended for faster installs)
bun install

# OR if using npm
npm install

# OR if using yarn
yarn install
```

This will install all required packages including:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- And other dependencies

### 4. Start Development Server 🎮

Run the development server:

```bash
# If using Bun
bun dev

# OR if using npm
npm run dev

# OR if using yarn
yarn dev
```

You should see output like:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Ready in X.Xs
```

### 5. Open in Browser 🌐

1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. You should see the genre selection screen!

## 🎯 Testing the App

### Test Scenario 1: Fantasy Adventure

1. Click on the **Fantasy** genre card
2. Enter character details:
   - Name: "Eldrin"
   -Class: "Wizard"
   - Background: "Hermit Scholar"
3. Click **Begin Adventure**
4. Wait for the AI to generate your opening scene
5. Try making different choices to see how the story evolves

### Test Scenario 2: Sci-Fi Exploration

1. Restart and choose **Sci-Fi**
2. Create a character like:
   - Name: "Nova-7"
   - Class: "Starship Engineer"
   - Background: "Colony Born"
3. Experience a different AI model and storytelling style

## 🔧 Troubleshooting

### Issue: "API key not configured" error

**Solution:**
- Verify your `.env` file exists in the root directory
- Check that the API key is on the correct line
- Restart the development server (Ctrl+C, then `bun dev` again)
- Make sure there are no extra spaces or quotes around the key

### Issue: Dependencies won't install

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json  # or bun.lockb
bun install  # or npm install
```

### Issue: Page not loading or showing errors

**Solution:**
1. Check the terminal for error messages
2. Check browser console (F12) for errors
3. Verify all files are present in the correct directories
4. Make sure port 3000 is not already in use

### Issue: AI responses are slow or timing out

**Solution:**
- Check your internet connection
- Verify your Gatewayz API key is valid
- Check if you have remaining API credits
- Try a different model by editing `src/types/game.ts`

## 📂 File Structure Overview

```
project-root/
├── .env                          # YOUR API KEY GOES HERE
├── .env.example                  # Example env file
├── package.json                  # Dependencies
├── README.md                     # Main documentation
├── SETUP_GUIDE.md               # This file
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── chat/route.ts    # Chat API endpoint
    │   │   └── models/route.ts  # Models API endpoint
    │   ├── layout.tsx           # App layout
    │   ├── page.tsx             # Main game page
    │   └── globals.css          # Global styles
    ├── components/
    │   ├── CharacterCreation.tsx   # Character creation form
    │   ├── GenreSelection.tsx      # Genre selection screen
    │   ├── GameInterface.tsx       # Main game interface
    │   └── ui/                     # UI components (pre-built)
    ├── types/
    │   └── game.ts              # TypeScript types & configs
    └── lib/
        └── utils.ts             # Utility functions
```

## 🎨 Customization Tips

### Change AI Temperature

Open `src/types/game.ts` and adjust the `temperature` value (0.0-1.0):
- Lower (0.7): More focused, deterministic stories
- Higher (1.0): More creative, unpredictable stories

### Add Your Own Genre

1. Edit `src/types/game.ts`
2. Add to the `Genre` type: `'cyberpunk'`
3. Add configuration to `GENRE_CONFIGS`
4. Choose an appropriate model from Gatewayz

### Modify System Prompts

Edit the `systemPrompt` in each genre config to change how the AI tells stories.

## 🚢 Building for Production

When ready to deploy:

```bash
# Build the production version
bun run build  # or npm run build

# Test the production build locally
bun start  # or npm start
```

## 📞 Getting Help

- **Gatewayz Documentation**: [https://docs.gatewayz.ai](https://docs.gatewayz.ai)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- Check the browser console and terminal for error messages
- Review the API response in Network tab (F12 → Network)

## 🎉 You're Ready!

If you can see the genre selection screen and interact with it, you're all set!

Choose a genre, create a character, and start your adventure! 🎮✨

---

**Happy Adventuring!** 🐉🚀🔍👻🤠
