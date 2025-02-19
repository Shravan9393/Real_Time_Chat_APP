# Real-Time Chat Application - Backend

This is the backend of the Real-Time Chat Application, built using Node.js, Express, and MongoDB. It handles authentication, real-time messaging, and database interactions.

## Features
- User authentication (Signup/Login with JWT authentication)
- Real-time messaging with Socket.io
- User profile management
- Group chat support
- Media upload and storage (Cloudinary integration)
- Database management with MongoDB and Mongoose
- API error handling

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation
```bash
cd chat-backend
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000

MONGODB_URI =your_mongodb_connection_string

CORS_ORIGIN=http://localhost:3000

ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=
```

### Running the Backend Server
```bash
npm run dev
```
The backend will run on `http://localhost:5000`



## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.io
- Cloudinary (for media storage)
- JSON Web Token (JWT) authentication

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss.

