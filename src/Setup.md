# Quick Setup Guide

## Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd fitcheck-ai
npm install
```

### Step 2: Configure Environment (Optional for local dev)
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at http://localhost:3000

### Step 4: Test the App
1. Upload a full-body photo
2. Upload a product image (or paste URL)
3. Click "Generate Virtual Try-On"
4. View your personalized results!

## What Just Happened?

### File Structure You Created
```
fitcheck-ai/
├── src/
│   ├── components/     # 9 React components
│   ├── services/       # AI & product services
│   ├── utils/          # Helper functions
│   └── styles/         # CSS files
├── public/             # Static files
└── package.json        # Dependencies
```

### The Architecture
- **Components**: Pure UI (buttons, forms, displays)
- **Services**: Business logic (AI calls, product fetching)
- **Utils**: Helper functions (file conversion)
- **App.js**: Orchestrates everything

### Why This Structure?
✅ **Easy to understand**: Each file has one job
✅ **Easy to modify**: Change one thing without breaking others
✅ **Easy to test**: Pure functions are testable
✅ **Easy to scale**: Add features without refactoring

## Next Steps

### Customize the App
- Change colors in CSS files
- Modify AI prompt in `aiService.js`
- Add new components in `components/`

### Deploy to Production
```bash
npm run build
netlify deploy --prod --dir=build
```

### Learn the Architecture
Read `ARCHITECTURE.md` for deep dive into:
- Component hierarchy
- Data flow patterns
- Service layer design
- State management strategy

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API not working?**
- Check `.env` file has correct API key
- Verify key has proper permissions
- Check browser console for errors

## Learning Path

1. **Start here**: `src/App.js` - See how everything connects
2. **Then explore**: `src/components/` - Understand UI building blocks
3. **Dive deeper**: `src/services/` - Learn API integration
4. **Master patterns**: `ARCHITECTURE.md` - Understand design decisions

## Getting Help

- Check `README.md` for full documentation
- Read `ARCHITECTURE.md` for design patterns
- Review component files for implementation details

---

**You're ready to build! 🚀**

Start with `npm start` and begin exploring the code!