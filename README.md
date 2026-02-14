# AI Chatbot Frontend

Frontend application for the MERN Stack AI Chatbot.

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## Features

- 🤖 AI-powered chat interface
- 🔐 User authentication (Login/Signup)
- 💬 Real-time chat with AI
- 📝 Conversation history
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 💾 Continue previous conversations
- 🎨 Modern, clean UI

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**For production/deployment:**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 3. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

Creates an optimized build in the `build/` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Signup.jsx      # Signup page
│   │   │   └── Auth.css        # Auth styles
│   │   ├── Chat/
│   │   │   ├── ChatInterface.jsx    # Main chat
│   │   │   ├── ChatMessage.jsx      # Message component
│   │   │   ├── ChatInput.jsx        # Input component
│   │   │   ├── ChatSidebar.jsx      # Sidebar component
│   │   │   └── *.css                # Component styles
│   │   └── Layout/
│   │       ├── Header.jsx      # App header
│   │       └── Header.css
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state
│   │   └── ThemeContext.jsx    # Theme state
│   ├── services/
│   │   └── api.js              # API calls
│   ├── App.jsx                 # Main app
│   ├── App.css                 # Global styles
│   ├── index.js                # Entry point
│   └── index.css               # Base styles
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
├── package.json                # Dependencies
└── README.md                   # This file
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

### `npm run eject`
**Note: this is a one-way operation!** Ejects from Create React App.

## Usage

### 1. Create Account
- Navigate to signup page
- Enter username, email, and password
- Click "Sign Up"

### 2. Login
- Enter email and password
- Click "Sign In"

### 3. Start Chatting
- Type message in input box
- Press Enter or click Send
- Wait for AI response

### 4. Features
- **New Chat**: Click menu (☰) → "New Chat"
- **View History**: Click menu to see all conversations
- **Continue Chat**: Click on any previous conversation
- **Dark Mode**: Click theme toggle icon (🌙/☀️)
- **Logout**: Click "Logout" button

## Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message

## Theming

The app supports light and dark themes:

### Light Theme
- Clean, bright interface
- Easy on eyes in daylight

### Dark Theme
- Dark background
- Reduced eye strain in low light

Theme preference is saved to localStorage.

## API Integration

The frontend communicates with the backend via REST API:

### Authentication
- POST `/auth/signup` - Create account
- POST `/auth/login` - Login
- GET `/auth/me` - Get current user

### Chat
- POST `/chat/message` - Send message
- GET `/chat/history` - Get conversations
- GET `/chat/session/:id` - Get session
- DELETE `/chat/session/:id` - Delete session

All requests include JWT token in Authorization header.

## State Management

### AuthContext
- User authentication state
- Login/logout functions
- Token management

### ThemeContext
- Theme preference (light/dark)
- Toggle function
- Persistent storage

## Styling

CSS Variables for easy theming:

```css
--background
--card-bg
--text-primary
--text-secondary
--primary-color
--border-color
```

## Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px


## Troubleshooting

### API Connection Error
**Solution:** Check `REACT_APP_API_URL` in `.env` matches backend URL

### CORS Error
**Solution:** Ensure backend CORS_ORIGIN includes frontend URL

### Build Errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
**Solution:** Restart development server after changing `.env`

### White Screen on Deployment
**Solution:** 
- Check browser console for errors
- Verify API URL is correct
- Ensure backend is running

## Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "axios": "^1.7.9",
  "react-scripts": "5.0.1"
}
```

## Development Tips

1. **Hot Reload**: Changes auto-refresh the page
2. **Console Logs**: Check browser console for errors
3. **Network Tab**: Monitor API requests
4. **React DevTools**: Install for debugging

## Performance

- Code splitting with React.lazy (ready to implement)
- Optimized re-renders with proper state management
- Efficient API calls with axios interceptors
- CSS optimizations

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT

## Support

For issues, check the main project documentation or create an issue on GitHub.

## Next Steps

After setup:
1. Customize theme colors in App.css
2. Add more features
3. Implement analytics
4. Add error boundaries
5. Optimize performance
