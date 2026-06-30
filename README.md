# Real-Time Chat Application

A full-stack real-time chat web application built using React.js, Node.js, Express.js, MongoDB, JWT authentication, and Socket.io.

The application allows users to register, login, view other users, send one-to-one messages, see online/offline status, and receive messages instantly without refreshing the page.

## Live Links

Frontend:https://realtime-chat-app-frontend-yweo.onrender.com
Backend:https://realtime-chat-app-backend-gx4k.onrender.com



## Features

- User registration and login
- JWT-based authentication
- Protected chat route
- One-to-one private messaging
- Real-time message delivery using Socket.io
- Online/offline user status
- Message history stored in MongoDB
- Responsive chat interface
- REST APIs for authentication, users, and messages
- Environment-based configuration for local and deployed setup

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- Socket.io Client
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.io
- CORS
- dotenv

## Folder Structure

```txt
realtime-chat-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   └── messageController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── messageRoutes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── protected/
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
