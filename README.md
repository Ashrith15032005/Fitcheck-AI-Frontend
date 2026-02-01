# FitCheck AI - Virtual Try-On Stylist 👗✨

An AI-powered virtual try-on application built with clean architecture and modern React best practices.

## 🏗️ Project Structure

```
fitcheck-ai/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # React components
│   │   ├── Header.js           # App header with branding
│   │   ├── Header.css
│   │   ├── TabNavigation.js    # Tab switching UI
│   │   ├── TabNavigation.css
│   │   ├── UploadSection.js    # Container for upload areas
│   │   ├── UploadSection.css
│   │   ├── UserPhotoUpload.js  # User photo upload interface
│   │   ├── UserPhotoUpload.css
│   │   ├── ProductImageUpload.js # Product image/URL input
│   │   ├── ProductImageUpload.css
│   │   ├── GenerateButton.js   # CTA button component
│   │   ├── GenerateButton.css
│   │   ├── ResultSection.js    # Results container
│   │   ├── ResultSection.css
│   │   ├── VirtualTryOnDisplay.js # Try-on image display
│   │   ├── VirtualTryOnDisplay.css
│   │   ├── StylingPanel.js     # Tips and recommendations
│   │   └── StylingPanel.css
│   ├── services/               # Business logic & API calls
│   │   ├── aiService.js        # Claude API integration
│   │   └── productService.js   # Product URL fetching
│   ├── utils/                  # Helper functions
│   │   └── fileUtils.js        # File handling utilities
│   ├── styles/                 # Global styles
│   │   └── App.css             # Main app styles & animations
│   ├── App.js                  # Main app component (orchestrator)
│   └── index.js                # React entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Pure UI components with minimal logic
- **Services**: API calls and business logic
- **Utils**: Reusable helper functions
- **Styles**: Component-specific CSS modules

### 2. **Component Hierarchy**
```
App (State Management)
├── Header (Static UI)
├── TabNavigation (UI Control)
├── UploadSection (Container)
│   ├── UserPhotoUpload (Feature)
│   └── ProductImageUpload (Feature)
├── GenerateButton (Action)
└── ResultSection (Container)
    ├── VirtualTryOnDisplay (Feature)
    └── StylingPanel (Feature)
```

### 3. **Data Flow**
- **Unidirectional**: State flows down through props
- **State Management**: Centralized in App.js
- **Service Layer**: Isolated API communication
- **Error Handling**: Graceful fallbacks at service level

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd fitcheck-ai

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# The build folder contains production-ready files
```

## 📦 Key Dependencies

- **React 18**: Component-based UI framework
- **lucide-react**: Modern icon library
- **Claude Sonnet 4**: AI vision & analysis API

## 🎨 Design System

### Color Palette
- **Primary**: Rose (#f43f5e) to Amber (#f59e0b) gradient
- **Background**: Soft rose-to-amber gradient
- **Text**: Gray scale (#1f2937, #374151, #6b7280)
- **Accent**: Purple hints for depth

### Typography
- **Headlines**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, modern)

### Spacing
- Consistent 8px base unit
- Component padding: 24-32px
- Gap spacing: 12-32px

## 🔧 Component Details

### Core Components

#### `App.js` - State Orchestrator
- Manages all application state
- Coordinates data flow between components
- Handles generate button logic

#### `Header.js` - Brand Identity
- Logo and branding
- Action buttons (favorites, share)
- Fixed at top with backdrop blur

#### `TabNavigation.js` - View Switcher
- Upload/Result tab switching
- Disabled state for result tab when no data
- Smooth transitions

#### `UserPhotoUpload.js` - Photo Input
- File upload with drag & drop area
- Preview with replace overlay
- Base64 conversion via utils

#### `ProductImageUpload.js` - Product Input
- Dual input: URL or file upload
- URL fetching via productService
- Visual feedback during processing

#### `GenerateButton.js` - CTA
- Prominent call-to-action
- Loading state with spinner
- Disabled when inputs missing

#### `VirtualTryOnDisplay.js` - Main Result
- Try-on image display
- Confidence score badge
- Download/share actions
- Fit analysis card

#### `StylingPanel.js` - Recommendations
- Numbered styling tips
- Complementary item suggestions
- Occasion tags

### Service Layer

#### `aiService.js` - AI Integration
```javascript
generateVirtualTryOn(userPhoto, productImage)
// Returns: { image, analysis }
```
- Handles Claude API calls
- Structures prompts for best results
- Provides fallback data on error
- Parses JSON responses safely

#### `productService.js` - Product Fetching
```javascript
fetchProductFromUrl(url)
// Returns: base64 image or null
```
- Fetches product from any e-commerce URL
- Future: Parse og:image meta tags
- Simulates network delay for UX

### Utilities

#### `fileUtils.js` - File Operations
```javascript
readFileAsBase64(file)           // Convert file to base64
validateImageFile(file)          // Check file validity
compressImage(base64, maxWidth)  // Optimize large images
```

## 🎯 Features

### Current
- ✅ User photo upload
- ✅ Product image upload
- ✅ Product URL fetching (simulated)
- ✅ AI-powered fit analysis
- ✅ Personalized styling tips
- ✅ Complementary item suggestions
- ✅ Occasion recommendations
- ✅ Confidence scoring
- ✅ Beautiful, responsive UI

### Planned Enhancements
- [ ] Real image generation for virtual try-on
- [ ] Multi-item outfit building
- [ ] User preferences & history
- [ ] Social sharing integration
- [ ] Size recommendations
- [ ] Real product URL scraping
- [ ] Mobile camera integration
- [ ] A/B outfit comparison

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

> **Note**: When running in Claude.ai artifacts, API key is handled automatically.

## 📱 Responsive Design

- **Desktop**: Full two-column layout
- **Tablet**: Adaptive grid with breakpoints
- **Mobile**: Single column, touch-optimized

Breakpoints:
- `1024px`: Result section stacks
- `768px`: Upload section stacks
- `640px`: Compact header, full-width buttons

## 🧪 Testing Locally

### Test User Flow
1. Upload a full-body photo
2. Upload product image OR paste product URL
3. Click "Generate Virtual Try-On"
4. View results with styling analysis
5. Check recommendations panel

### Test Error Cases
- Upload without images → Alert shown
- Invalid file type → Validation error
- API failure → Fallback demo data

## 🚀 Deployment

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

### Vercel
```bash
vercel --prod
```

### Environment Variables on Host
Set `REACT_APP_ANTHROPIC_API_KEY` in:
- Netlify: Site settings → Environment variables
- Vercel: Project settings → Environment Variables

## 📈 Performance Optimization

### Current Optimizations
- Component-level CSS (no CSS-in-JS overhead)
- Base64 encoding for instant preview
- Lazy state updates
- CSS animations (GPU-accelerated)

### Future Optimizations
- Image compression before API calls
- Lazy loading for result images
- Service worker for offline support
- Code splitting for large components

## 🤝 Contributing

This project follows:
- Component-based architecture
- Single Responsibility Principle
- Separation of concerns
- Functional programming patterns

## 📄 License

Created for AI Builder Assignment - January 2026

## 🎓 Learning Resources

To understand the architecture:
1. Start with `App.js` - see how state flows
2. Check `aiService.js` - understand API integration
3. Explore component files - see UI patterns
4. Review CSS files - learn styling approach

## 🐛 Troubleshooting

### Images not uploading?
- Check file size (max 10MB)
- Verify file type (JPG, PNG, WEBP only)
- See `fileUtils.js` validation

### API errors?
- Verify environment variables
- Check network tab for request details
- Fallback data should still display

### Styling issues?
- Clear browser cache
- Check CSS import order
- Verify fonts are loading

## 💡 Code Quality

- **ESLint**: Follows React recommended rules
- **File Organization**: Logical grouping by feature
- **Naming**: Descriptive, consistent conventions
- **Comments**: Explain "why", not "what"
- **Modular**: Each component <200 lines

---

**Built with ❤️ using React, Claude AI, and clean architecture principles**