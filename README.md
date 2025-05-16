# 📱 WhatsApp-Inspired Real-Time Messaging Web App

This university project is a real-time messaging web application inspired by WhatsApp. It enables users to sign up, log in, add friends, and exchange messages instantly.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js

- **Frontend**: React.js

- **Real-Time Communication**: Socket.IO

- **Database**: MongoDB (via Mongoose)

---

## 📁 Project Structure

```

/Progetto_web-app
│
├── 📁 node_modules/                     # Root dependencies (if any)
├── 📁 whatsapp-be/                      # Backend application
│    ├── 📁 controllers/                  # Handles request logic
│    │   ├── chats.js                  # Chat-related logic
│    │   ├── messages.js               # Message-related logic
│    │   └── users.js                  # User-related logic
│    ├── 📁 models/                       # Mongoose schemas
│    │   ├── chats.js                  # Chat schema
│    │   ├── messages.js               # Message schema
│    │   └── users.js                  # User schema
│    ├── 📁 node_modules/              # Backend dependencies
│    ├── 📁 routes/                       # API endpoints
│    │   ├── api.js                    # Main API router
│    │   ├── chats.js                  # Chat routes
│    │   ├── messages.js               # Message routes
│    │   └── users.js                  # User routes
│    ├── package.json                  # Backend metadata and scripts
│    ├── package-lock.json             # Backend dependency lockfile
│    └── server.js                     # Entry point for backend server
├── 📁 whatsapp-fe/                      # Frontend application
│    ├── 📁 public/                       # Static assets
│    │   ├── favicon.ico               # Browser tab icon
│    │   ├── index.html                # Main HTML file
│    │   ├── logo192.png               # App logo (192x192)
│    │   ├── logo512.png               # App logo (512x512)
│    │   ├── manifest.json             # PWA manifest
│    │   └── robots.txt                # SEO directives
│    ├── 📁 src/                          # React source code
│    │   ├── style/                    # CSS and styling files
│    │   ├── App.jsx                   # Root React component
│    │   ├── Button.jsx                # Reusable button component
│    │   ├── Chat.jsx                  # Individual chat view
│    │   ├── ChatsContainer.jsx        # List of chats
│    │   ├── ErrorLoadingPage.jsx      # Error display component
│    │   ├── Friend.jsx                # Friend item component
│    │   ├── FriendsContainer.jsx      # List of friends
│    │   ├── Home.jsx                  # Home page component
│    │   ├── LoadingPage.jsx           # Loading screen
│    │   ├── Login.jsx                 # Login form
│    │   ├── Message.jsx               # Single message component
│    │   ├── MessagesContainer.jsx     # Message list component
│    │   ├── Request.jsx               # Friend request item
│    │   ├── RequestsContainer.jsx     # Friend requests list
│    │   ├── Sidebar.jsx               # Sidebar navigation
│    │   ├── SidebarChat.jsx           # Chat preview in sidebar
│    │   ├── SignUp.jsx                # Registration form
│    │   ├── index.jsx                 # React entry point
│    │   └── logo.svg                  # App logo SVG
│    ├── .gitignore                    # Files to ignore in Git
│    ├── package.json                  # Frontend metadata and scripts
│    └── package-lock.json             # Frontend dependency lockfile
├── LICENSE                           # MIT License
├── README.md                         # Project documentation
└── Report ChatApp.pdf                # Italian Report

```

---

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/Progetto_web_app
cd Progetto_web_app
 ```
2. Backend Setup
```bash
cd whatsapp-be
npm install
npm start
```
3. Frontend Setup
In a new terminal window:
```bash
cd whatsapp-fe
npm install
npm start
```

4. Access the Application
Frontend: http://localhost:3001
---

## 📬 Key Features

User registration and authentication

Real-time messaging with Socket.IO

Friend management (add/remove)

Responsive and intuitive UI built with React

---

## 🪪 License

This project is distributed under the MIT License

---

## 👨‍💻 Authors

- Raffaele Di Benedetto
- Giuseppe Farano

---

This project was developed for educational purposes as part of a university course. It is not intended for production use.

If you'd like to include additional sections such as Testing, Screenshots, Deployment, or API Documentation, feel free to ask!
