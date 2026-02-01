# Architecture Documentation

## Overview

FitCheck AI follows a clean, maintainable architecture based on separation of concerns and React best practices.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      User Interface                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Header  │  │   Tabs   │  │  Generate Button     │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│  ┌──────────────────────────┐  ┌────────────────────┐  │
│  │   Upload Section         │  │   Result Section   │  │
│  │  ├─ User Photo Upload    │  │  ├─ Try-On Display │  │
│  │  └─ Product Image Upload │  │  └─ Styling Panel  │  │
│  └──────────────────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Application Logic                       │
│                      (App.js)                            │
│  • State Management                                      │
│  • Component Orchestration                               │
│  • Event Handling                                        │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                         │
│  ┌─────────────────┐  ┌──────────────────────────────┐  │
│  │   AI Service    │  │    Product Service           │  │
│  │  • Claude API   │  │    • URL Fetching            │  │
│  │  • Analysis     │  │    • Image Extraction        │  │
│  └─────────────────┘  └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Utility Layer                          │
│  • File handling (base64 conversion)                    │
│  • Image validation                                      │
│  • Compression                                           │
└─────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. **Presentation Layer** (Components)
**Location**: `src/components/`

**Responsibility**: 
- Render UI elements
- Handle user interactions
- Delegate business logic to parent or services

**Principles**:
- Components should be as "dumb" as possible
- Receive data via props
- Emit events via callbacks
- No direct API calls
- Minimal internal state

**Example**:
```javascript
// UserPhotoUpload.js - Pure UI component
const UserPhotoUpload = ({ userPhoto, setUserPhoto }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await readFileAsBase64(file); // Utility function
    setUserPhoto(base64); // Pass data up
  };
  
  return (
    // JSX for file upload UI
  );
};
```

### 2. **Application Layer** (App Component)
**Location**: `src/App.js`

**Responsibility**:
- Central state management
- Coordinate between components
- Orchestrate service calls
- Handle application-level logic

**Principles**:
- Single source of truth for app state
- Delegates specific tasks to services
- Passes data down, callbacks up
- Handles errors at high level

**Example**:
```javascript
// App.js - State orchestrator
const App = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [result, setResult] = useState(null);
  
  const handleGenerateTryOn = async () => {
    const tryOnResult = await generateVirtualTryOn(userPhoto, productImage);
    setResult(tryOnResult);
  };
  
  return (
    <UploadSection setUserPhoto={setUserPhoto} />
    <GenerateButton onClick={handleGenerateTryOn} />
  );
};
```

### 3. **Service Layer** (Business Logic)
**Location**: `src/services/`
> Note: In the current implementation, the AI service is mocked on the frontend.
> It returns structured analysis data and image references for demo purposes.
> Real AI image generation requires a backend with GPU-based models.

**Responsibility**:
- API communication
- Complex business logic
- Data transformation
- Error handling

**Principles**:
- Pure functions when possible
- Handle all API complexity
- Provide clean interface to app
- Return consistent data structures

**Example**:
```javascript
// aiService.js - Encapsulated API logic
export async function generateVirtualTryOn(userPhoto, productImage) {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      body: buildRequestBody(userPhoto, productImage)
    });
    
    const data = await response.json();
    return parseAndStructureResponse(data);
  } catch (error) {
    return getFallbackResult();
  }
}
```

### 4. **Utility Layer** (Helpers)
**Location**: `src/utils/`

**Responsibility**:
- Reusable helper functions
- Common operations
- Data transformations

**Principles**:
- Pure functions only
- No side effects
- No state
- Highly testable

**Example**:
```javascript
// fileUtils.js - Pure utility functions
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

## Data Flow

### Upload Flow
```
1. User selects file
   └─> UserPhotoUpload component
       └─> fileUtils.readFileAsBase64()
           └─> setUserPhoto() callback
               └─> App.js state updated
```

### Generation Flow
```
1. User clicks "Generate"
   └─> GenerateButton onClick
       └─> App.handleGenerateTryOn()
           └─> aiService.generateVirtualTryOn()
               ├─> Fetch Claude API
               ├─> Parse response
               └─> Return structured data
           └─> App.setResult()
               └─> ResultSection renders
```

## Component Communication

### Parent-to-Child (Props)
```javascript
<UserPhotoUpload 
  userPhoto={userPhoto}        // Data down
  setUserPhoto={setUserPhoto}  // Callback up
/>
```

### Child-to-Parent (Callbacks)
```javascript
// Child component
const UserPhotoUpload = ({ setUserPhoto }) => {
  const handleUpload = (file) => {
    setUserPhoto(file); // Notify parent
  };
};
```

## State Management Strategy

### Local State
- Component-specific UI state (hover, focus)
- Temporary form inputs

### Lifted State (App.js)
- User photo
- Product image
- Processing status
- Results data
- Active tab

### Why Not Redux/Context?
- Small application scope
- Simple parent-child communication
- No deeply nested components
- Prop drilling is minimal
- Easy to understand

## Styling Architecture

### Component-Scoped CSS
Each component has its own CSS file:
```
UserPhotoUpload.js
UserPhotoUpload.css  ← Styles only for this component
```

**Benefits**:
- Clear ownership
- No naming conflicts
- Easy to locate styles
- Simple to modify

### Global Styles
`App.css` contains:
- CSS reset
- Root animations
- Background elements
- Utility classes

## Error Handling Strategy

### Service Level
```javascript
// Services return graceful fallbacks
export async function generateVirtualTryOn() {
  try {
    return await callAPI();
  } catch (error) {
    console.error('Service error:', error);
    return getFallbackData(); // Always return usable data
  }
}
```

### Component Level
```javascript
// Components show user-friendly messages
const handleGenerate = async () => {
  if (!userPhoto || !productImage) {
    alert('Please upload both images!');
    return;
  }
  // Continue...
};
```

## Testing Strategy

### Unit Tests (Recommended)
- **Utils**: Test pure functions in isolation
- **Services**: Mock fetch calls, test responses
- **Components**: Test rendering with enzyme/testing-library

### Integration Tests
- Upload → Generate → View flow
- Error handling paths
- State management

### Example Test
```javascript
// fileUtils.test.js
test('readFileAsBase64 converts file to base64', async () => {
  const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
  const result = await readFileAsBase64(mockFile);
  expect(result).toMatch(/^data:image\/jpeg;base64,/);
});
```

## Scalability Considerations

### Adding New Features

**New upload type?**
1. Create new component in `components/`
2. Add to UploadSection
3. Add state in App.js

**New AI service?**
1. Create new service in `services/`
2. Import in App.js
3. Call from event handler

**New styling option?**
1. Add to StylingPanel component
2. Update aiService prompt
3. Parse new data field

### Performance Optimization Opportunities

**Current**:
- Base64 encoding (instant preview)
- CSS animations (GPU-accelerated)
- Component-scoped styles (minimal CSS)

**Future**:
- Image compression before upload
- Service worker caching
- Code splitting
- Virtual scrolling for large result lists
- Debounced URL fetching

## Security Considerations

### Client-Side
- File type validation
- File size limits
- No direct user input to API
- Sanitized error messages

### API Key Management
- Environment variables only
- Never commit to git
- Different keys per environment

### Content Security
- No eval() or dangerous HTML
- Sanitized user inputs
- Safe base64 handling

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│           CDN (Netlify/Vercel)          │
│  • Static assets                        │
│  • HTML, CSS, JS bundles                │
│  • Image optimization                   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Client Browser                   │
│  • React app runs                       │
│  • State management                     │
│  • API calls to Claude                  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│        Anthropic API                    │
│  • Claude Sonnet 4                      │
│  • Vision analysis                      │
│  • JSON responses                       │
└─────────────────────────────────────────┘
```

## Best Practices Followed

1. **Single Responsibility**: Each file has one clear purpose
2. **DRY**: Utilities for reused code
3. **Separation of Concerns**: UI, logic, and data separate
4. **Pure Functions**: Utils and service helpers
5. **Component Composition**: Small, focused components
6. **Unidirectional Data Flow**: Props down, events up
7. **Error Boundaries**: Graceful degradation
8. **Consistent Naming**: Clear, descriptive names
9. **Documentation**: Comments explain "why"
10. **Modularity**: Easy to add/remove features

## Future Architecture Improvements

### State Management
- Consider Zustand for complex state
- Add Context for theme/preferences

### Type Safety
- Migrate to TypeScript
- Add prop-types validation

### Code Organization
- Feature-based folders
- Shared component library
- Custom hooks for reusable logic

### Testing
- Add Jest configuration
- Write component tests
- Integration test suite

---

This architecture prioritizes:
- **Clarity**: Easy to understand
- **Maintainability**: Easy to modify
- **Scalability**: Easy to extend
- **Performance**: Optimized where it matters