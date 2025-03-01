# CollabHub - Social Collaboration Platform

![CollabHub Logo](https://via.placeholder.com/200x80?text=CollabHub)

CollabHub is a community-focused social platform that enables users to share ideas, resources, and skills. Built with React, Redux, Firebase, and Tailwind CSS, it offers a modern, responsive interface with real-time updates.

## 🚀 Features

### Core Functionality
- **Universal Post System** - Anyone can create, like, comment on, and delete posts
- **Real-time Updates** - Posts and comments update in real-time using Firebase Realtime Database
- **Dark/Light Mode** - Toggle between dark and light themes with persistent preferences
- **Responsive Design** - Fully responsive layout that works on all device sizes

### User Interface
- **Facebook-Like Navigation** - Familiar navigation structure with home, explore, and collaborate sections
- **Mobile-First Design** - Optimized experience for both mobile and desktop users
- **Interactive Components** - Dynamic post creation, commenting, and liking system

### Technical Features
- **Firebase Integration** - Real-time database for posts, comments, and likes
- **Redux State Management** - Centralized state management for application data
- **Context API** - Theme and collaboration contexts for shared functionality
- **Component Modularization** - Well-structured component hierarchy for maintainability

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)
- Firebase account (for database)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firebase Realtime Database
   - Add your Firebase configuration to the project

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
social-platform/
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ErrorBoundary.jsx  # Error handling wrapper
│   │   ├── Footer.jsx         # Application footer
│   │   ├── Modal.jsx          # Reusable modal component
│   │   ├── Navbar.jsx         # Navigation header
│   │   └── ThemeToggle.jsx    # Theme switcher component
│   │
│   ├── context/               # React context providers
│   │   ├── CollaborationContext.jsx  # Post data and operations
│   │   └── ThemeContext.jsx          # Theme management
│   │
│   ├── pages/                 # Page components
│   │   ├── Collaborate.jsx    # Collaboration page
│   │   ├── Explore.jsx        # Explore content page
│   │   ├── Home/              # Home page components
│   │   │   ├── Comments.jsx   # Comment components
│   │   │   ├── CreatePosts.jsx # Post creation components
│   │   │   ├── Feed.jsx       # Post feed components 
│   │   │   └── Home.jsx       # Main home page
│   │   └── Profile.jsx        # User profile page
│   │
│   ├── Redux/                 # Redux state management
│   │   ├── actions/           # Action creators
│   │   │   └── postActions.jsx # Post-related actions
│   │   └── reducers/          # State reducers
│   │       └── postsReducer.js # Post state reducer
│   │
│   ├── services/              # API and external services
│   │   └── postService.js     # Firebase data operations
│   │
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # Application entry point
│
├── public/                    # Public assets
├── .gitignore                 # Git ignore file
├── index.html                 # HTML entry point
├── package.json               # Project dependencies
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # Project documentation
```

## 🎨 Features In Detail

### Post System
- Create posts with text and optional images
- Like/unlike posts with real-time count updates
- Comment on posts with real-time updates
- Delete posts (and associated comments)

### Theme System
- Toggle between light and dark mode
- Theme preference saved to local storage
- System preference detection
- Smooth transitions between themes

### Responsive Navigation
- Desktop: Full navigation bar with search
- Mobile: Bottom navigation tabs and collapsible search

## 🔌 Firebase Integration

This project uses Firebase Realtime Database with the following structure:

```
/posts/{postId}/
  ├── content       # Post text content
  ├── imageUrl      # Optional image URL
  ├── likes         # Number of likes
  └── createdAt     # Timestamp
  
/comments/{postId}/{commentId}/
  ├── content       # Comment text
  └── createdAt     # Timestamp
```

Firebase URL: `https://socialcommunity-db2d8-default-rtdb.firebaseio.com/`

## 🧩 Component Usage Examples

### Creating a Post
```jsx
import { CreatePostModal } from '../pages/Home/CreatePosts';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCreatePost = (postData) => {
    // Process the post data
    console.log(postData);
  };
  
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Create Post
      </button>
      
      <CreatePostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        createPost={handleCreatePost}
      />
    </>
  );
}
```

### Using the ThemeContext
```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <div className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
      <p>Current theme: {darkMode ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

## 🚀 Deployment

Build the project for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Team Groot

- Team Lead: [Team Member Name](https://github.com/username)
- Frontend Developer: [Team Member Name](https://github.com/username)
- Backend Developer: [Team Member Name](https://github.com/username)
- UI/UX Designer: [Team Member Name](https://github.com/username)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router](https://reactrouter.com/)