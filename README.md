# Canvas Editor - Collaborative Drawing Application

## What I Built

A real-time collaborative canvas editor built with React and Fabric.js that allows users to create, edit, and share visual content. The application provides a Canva-like experience with drawing tools, shape creation, and persistent storage.

### Core Features
- **Drawing Tools**: Rectangle, circle, text, and freehand pen drawing
- **Object Manipulation**: Select, move, resize, and delete canvas objects
- **Color Picker**: Dynamic color changing for selected objects
- **Auto-Save**: Automatic persistence with 1-second debounce + instant save on selection
- **Undo/Redo**: Full history management for canvas operations
- **Export**: Download canvas as PNG image
- **Share**: Generate shareable links for collaborative editing
- **Persistent Storage**: Firebase Firestore with localStorage fallback

## Trade-offs Made

### 1. **Storage Strategy**
- **Choice**: Firebase Firestore primary + localStorage fallback
- **Trade-off**: Network dependency vs offline capability
- **Reasoning**: Ensures data persistence even when Firebase is unavailable

### 2. **Auto-Save Implementation**
- **Choice**: Dual save system (debounced + instant)
- **Trade-off**: Performance vs data consistency
- **Reasoning**: Balances server load with immediate feedback for user interactions

### 3. **Canvas Library**
- **Choice**: Fabric.js over native Canvas API
- **Trade-off**: Bundle size vs development speed
- **Reasoning**: Rich object manipulation features outweigh the larger bundle

### 4. **State Management**
- **Choice**: React hooks over Redux/Context
- **Trade-off**: Prop drilling vs complexity
- **Reasoning**: Simpler architecture for the current scope

## Bonus Features Included

### 🚀 **Instant Save on Selection**
- Immediately saves canvas state when objects are selected/deselected
- Provides real-time feedback without waiting for debounce delay

### 🎨 **Smart Drawing Mode**
- Automatically disables pen mode when adding shapes
- Prevents accidental drawing while placing objects

### 🔄 **Robust Error Handling**
- Graceful fallback to localStorage when Firebase fails
- Canvas disposal protection to prevent memory leaks
- Comprehensive error logging for debugging

### 📱 **Responsive Design**
- Dynamic canvas sizing based on viewport
- Mobile-friendly toolbar and controls

### 🎯 **Advanced Object Management**
- Real-time color picker that appears only when objects are selected
- Intelligent undo/redo state management
- Prevention of save conflicts during undo/redo operations

### 🔗 **Shareable URLs**
- Each canvas has a unique ID for easy sharing
- Direct link sharing for collaborative editing

### 💾 **Dual Persistence Layer**
- Primary: Firebase Firestore for cloud sync
- Fallback: localStorage for offline functionality
- Seamless switching between storage methods

## Technical Architecture

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks for business logic
├── pages/         # Route-level components
├── firebase/      # Firebase configuration
└── utils/         # Helper functions
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase configuration in `.env`
4. Start development server: `npm run dev`

## Future Enhancements

- Real-time collaborative editing with WebSockets
- Layer management system
- Advanced shape tools (polygons, arrows)
- Image upload and manipulation
- Template library