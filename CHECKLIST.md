# ✅ Pre-Launch Checklist

Before running the app, make sure you've completed these steps:

## 🔧 Setup Steps

### 1. Environment Configuration
- [ ] `.env` file exists in project root
- [ ] `GATEWAYZ_API_KEY` is set to your actual API key (not `your_api_key_here`)
- [ ] No extra spaces or quotes around the API key

### 2. Dependencies
- [ ] Node.js 18+ or Bun is installed
- [ ] All packages are installed (`bun install` or `npm install` completed successfully)
- [ ] No error messages during installation

### 3. File Verification
Verify these key files exist:

**API Routes:**
- [ ] `src/app/api/chat/route.ts`
- [ ] `src/app/api/models/route.ts`

**Components:**
- [ ] `src/components/GenreSelection.tsx`
- [ ] `src/components/CharacterCreation.tsx`
- [ ] `src/components/GameInterface.tsx`

**Core Files:**
- [ ] `src/app/page.tsx`
- [ ] `src/app/layout.tsx`
- [ ] `src/types/game.ts`

**Configuration:**
- [ ] `.env`
- [ ] `package.json`
- [ ] `next.config.ts`

### 4. Port Availability
- [ ] Port 3000 is available (not used by another app)
- [ ] Or you've configured a different port

## 🚀 Launch Steps

### Start the Dev Server
```bash
bun dev
# or npm run dev
```

### Expected Output
You should see:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Ready in X.Xs
```

### Open Browser
- [ ] Navigate to `http://localhost:3000`
- [ ] Genre selection screen appears
- [ ] No errors in browser console (F12)

## 🧪 Quick Test

### Test 1: Genre Selection
- [ ] Can see all 5 genre cards (Fantasy, Sci-Fi, Mystery, Horror, Western)
- [ ] Each card shows icon, name, description
- [ ] Hover effects work
- [ ] Clickinga genre advances to character creation

### Test 2: Character Creation
- [ ] Character name field is required
- [ ] Can enter optional class/role
- [ ] Can enter optional background
- [ ] "Begin Adventure" button works
- [ ] Advances to game interface

### Test 3: Game Interface
- [ ] Opening scene appears within 5-10 seconds
- [ ] Story is displayed in a narrative format
- [ ] Can type custom actions
- [ ] Quick action buttons work
- [ ] "Send" button submits actions
- [ ] AI responds to choices
- [ ] "New Game" button restarts

### Test 4: Different Genres
- [ ] Fantasy uses rich, descriptive language
- [ ] Sci-Fi has a different tone/style
- [ ] Each genre feels distinct

## 🔍 Troubleshooting Checks

### If opening scene doesn't appear:

**Check Terminal for Errors:**
- [ ] No API key errors
- [ ] No TypeScript compilation errors
- [ ] No network errors

**Check Browser Console (F12):**
- [ ] No 401 Unauthorized errors (means API key is wrong)
- [ ] No 500 Server errors
- [ ] No CORS errors
- [ ] Check Network tab for API calls

**Verify API Key:**
- [ ] API key starts with correct prefix (e.g., `gw_`)
- [ ] API key is active (check Gatewayz dashboard)
- [ ] Account has available credits

### If styles look broken:
- [ ] Tailwind CSS is working (check for utility classes)
- [ ] Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Clear browser cache

### If TypeScript errors:
```bash
# Delete and reinstall
rm -rf node_modules
rm -rf .next
bun install  # or npm install
bun dev      # or npm run dev
```

## 📊 API Call Verification

### First Game Start Should Make:
1. **POST** to `/api/chat` - Get opening scene
   - Status: 200 OK
   - Response contains: `choices[0].message.content`

2. **Each User Action** triggers:
   - **POST** to `/api/chat` - Get story continuation
   - Status: 200 OK
   - Response time: 2-8 seconds typically

### Check API Calls in Browser:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "chat"
4. Watch for API calls when:
   - Game starts
   - You send an action

## ✨ Feature Checklist

### Core Features Working:
- [ ] Genre selection with 5 options
- [ ] Character creation with customization
- [ ] AI story generation
- [ ] User choice/action input
- [ ] Story history display
- [ ] Loading states during AI generation
- [ ] Error handling for failed requests
- [ ] Restart/new game functionality

### UI/UX Working:
- [ ] Responsive design (try resizing browser)
- [ ] Smooth transitions and animations
- [ ] Readable text on all backgrounds
- [ ] Interactive hover states
- [ ] Disabled states during loading
- [ ] Auto-scroll to latest message

### Model Switching:
- [ ] Fantasy uses GPT-4o
- [ ] Sci-Fi uses Claude 3.5 Sonnet
- [ ] Mystery uses Claude 3.5 Sonnet
- [ ] Horror uses GPT-4o
- [ ] Western uses GPT-4o Mini

## 🎉 Ready to Launch!

If all items above are checked, you're ready to:
1. Share the app with others
2. Deploy to production (Vercel, etc.)
3. Add more features

## 📝 Notes

**Development:**
- Terminal must stay open while app is running
- Changes to `.env` require server restart
- Most code changes hot-reload automatically

**Performance:**
- First story generation: 3-10 seconds
- Subsequent responses: 2-5 seconds
- Faster with GPT-4o Mini, slower with GPT-4o

**Costs:**
- Each story turn uses tokens
- Longer stories = more tokens
- Monitor usage in Gatewayz dashboard

---

**All checked? Time to embark on epic adventures! 🎮✨**
