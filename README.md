# 🚀 Blogo - Full Stack Blog Application

A modern, feature-rich blogging platform built with React, Node.js, Express, and MongoDB. Create, share, and engage with blog posts in a clean, responsive interface.

## ✨ Features

### 🔐 Authentication & User Management
- **Secure User Registration** with profile picture upload
- **JWT-based Authentication** for secure sessions
- **Password Hashing** using bcrypt
- **User Profiles** with customizable avatars

### 📝 Blog Management
- **Rich Text Editor** for creating engaging content
- **SEO-friendly URLs** with automatic slug generation
- **Blog Categories** and snippets for better organization
- **CRUD Operations** - Create, Read, Update, Delete blogs
- **Image Upload** support via Cloudinary integration

### 💬 Interactive Comments System
- **Threaded Comments** with nested replies (up to 5 levels)
- **Real-time Updates** for seamless user experience
- **Comment Moderation** - users can delete their own comments
- **Responsive Design** that works on all devices

### 👍 Engagement Features
- **Like System** for blog posts
- **Real-time Like Counter** with optimistic updates
- **User Interaction** tracking and analytics

### 🎨 Modern UI/UX
- **Responsive Design** - mobile-first approach
- **Clean, Modern Interface** with subtle animations
- **Consistent Styling** using CSS custom properties
- **Accessibility Features** for better user experience

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Navbar    │  │ BlogDetails │  │  Comments   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Signin    │  │   Signup    │  │  BlogList   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                         HTTP/HTTPS
                              │
┌─────────────────────────────────────────────────────────┐
│                 Backend (Node.js/Express)               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Auth     │  │   Blogs     │  │  Comments   │     │
│  │ Controller  │  │ Controller  │  │ Controller  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Auth     │  │ Validation  │  │  Cloudinary │     │
│  │ Middleware  │  │ Middleware  │  │   Upload    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                           MongoDB
                              │
┌─────────────────────────────────────────────────────────┐
│                    Database Layer                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Users    │  │    Blogs    │  │  Comments   │     │
│  │ Collection  │  │ Collection  │  │ Collection  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## 📊 Database Schema

### 👤 User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  gmail: String (required, unique),
  username: String (required, unique),
  password: String (required, hashed),
  profilePic: String (Cloudinary URL),
  likedBlogs: [ObjectId] (ref: Blog),
  createdAt: Date,
  updatedAt: Date
}
```

### 📰 Blog Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required, rich text),
  snippet: String (required, preview text),
  slug: String (unique, SEO-friendly),
  userId: ObjectId (ref: User, required),
  likes: [ObjectId] (ref: User),
  tags: [String],
  published: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 💬 Comment Schema
```javascript
{
  _id: ObjectId,
  blog: ObjectId (ref: Blog, required),
  user: ObjectId (ref: User, required),
  content: String (required),
  parent: ObjectId (ref: Comment, nullable),
  path: String (materialized path for threading),
  depth: Number (nesting level, max: 5),
  deleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blogo.git
cd blogo
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment Setup**

Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. **Start the application**

Backend (Terminal 1):
```bash
cd backend
npm start
```

Frontend (Terminal 2):
```bash
cd frontend
npm start
```

6. **Access the application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3000/api`

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Register User
```http
POST /signup
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "gmail": "john@example.com",
  "username": "johndoe",
  "password": "securepassword123",
  "image": <file> (optional)
}
```

#### Login User
```http
POST /signin
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

### 📝 Blog Endpoints

#### Create Blog
```http
POST /createBlog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Amazing Blog Post",
  "content": "<p>Rich HTML content here...</p>",
  "snippet": "A brief description of the blog post"
}
```

#### Get All Blogs
```http
GET /getblogs
Authorization: Bearer <token>
```

#### Get Blog by Slug
```http
GET /:username/:slug
Authorization: Bearer <token>
```

#### Update Blog
```http
PUT /updateBlog/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<p>Updated content...</p>",
  "snippet": "Updated snippet"
}
```

#### Delete Blog
```http
DELETE /deleteBlog/:id
Authorization: Bearer <token>
```

#### Like/Unlike Blog
```http
POST /like/:id
Authorization: Bearer <token>
```

### 💬 Comment Endpoints

#### Add Comment
```http
POST /comments/:blogId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great blog post!",
  "parent": "optional-parent-comment-id"
}
```

#### Get Comments
```http
GET /comments/:blogId
Authorization: Bearer <token>
```

#### Delete Comment
```http
DELETE /comments/:id
Authorization: Bearer <token>
```

## 🛠️ Development

### 📁 Project Structure

```
blogo/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogControllers.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validationCheck.js
│   ├── models/
│   │   ├── schema.js
│   │   └── types.js
│   ├── router/
│   │   └── blogRoutes.js
│   ├── utils/
│   │   ├── buildCommentTree.js
│   │   ├── cloudinary.js
│   │   ├── generateSlug.js
│   │   └── passwordHash.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── BlogDetails/
│   │   │   │   ├── BlogDetails.jsx
│   │   │   │   ├── blogContent.css
│   │   │   │   └── comments.css
│   │   │   ├── signin/
│   │   │   │   ├── Signin.jsx
│   │   │   │   └── signin.css
│   │   │   └── signup/
│   │   │       ├── Signup.jsx
│   │   │       └── signup.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

### 🔧 Key Technologies

**Backend:**
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **Zod** - Input validation

**Frontend:**
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS Custom Properties** - Theming system

### 🎨 Styling Guide

The application uses a consistent design system with CSS custom properties:

```css
:root {
  --primary-color: #007bff;
  --primary-hover: #0056b3;
  --like-color: #e74c3c;
  --text-primary: #222;
  --text-secondary: #555;
  --text-muted: #777;
  --border-light: #e0e0e0;
  --bg-white: white;
  --shadow-light: 0 2px 24px 0 rgba(0,0,0,0.07);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** using Zod schemas
- **CORS Configuration** for cross-origin requests
- **File Upload Validation** for security
- **XSS Protection** through content sanitization

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a Heroku app
2. Set environment variables
3. Deploy using Git or Heroku CLI

### Frontend Deployment (Netlify/Vercel)

1. Build the production version
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to your hosting platform

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Update `MONGODB_URI` in your environment variables
3. Whitelist your deployment IP addresses

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing UI library
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Cloudinary** for seamless image management
- **Open Source Community** for the incredible tools and libraries

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/blogo/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the maintainers

---

**Happy Blogging! 🎉**

