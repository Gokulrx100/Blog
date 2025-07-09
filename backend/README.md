# Blogo Backend

This is the backend API for the **Blogo** blogging platform. It is built with Node.js, Express, MongoDB, and integrates with Cloudinary for image uploads. The backend handles user authentication, blog CRUD operations, comments, likes, and profile management.

---

## Features

- User signup & signin (with JWT authentication)
- Profile picture upload (Cloudinary + Multer)
- Create, edit, delete, and fetch blogs
- Comment on blogs
- Like/unlike blogs
- Secure endpoints with authentication middleware
- Input validation using Zod

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image storage)
- Multer (for file uploads)
- Zod (for validation)
- bcrypt (for password hashing)
- JSON Web Token (JWT) for authentication

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blog.git
cd blog/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the server

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### Auth

- `POST /signup` — Register a new user (supports profile image upload)
- `POST /signin` — Login and receive JWT

### Blogs

- `POST /createBlog` — Create a new blog (auth required)
- `PUT /updateBlog/:id` — Update a blog (auth required)
- `DELETE /deleteBlog/:id` — Delete a blog (auth required)
- `GET /getblogs` — Get all blogs (auth required)
- `GET /:username/:slug` — Get a single blog by username and slug (auth required)

### Comments

- `POST /comments/:blogId` — Add a comment (auth required)
- `GET /comments/:blogId` — Get comments for a blog (auth required)
- `DELETE /comments/:id` — Delete a comment (auth required)

### Likes

- `POST /like/:id` — Like or unlike a blog (auth required)

### Profile

- `GET /profile` — Get user profile details (auth required)

---

## Security

- **JWT** is used for authentication.
- **Zod** is used for validating incoming data.
- **Multer** and **Cloudinary** are used for secure image uploads.
- **bcrypt** is used for securely hashing and storing passwords.
---

## Folder Structure

```
backend/
│
├── controllers/      # Route handlers
├── middleware/       # Auth, validation, etc.
├── models/           # Mongoose schemas and Zod types
├── router/           # Express route definitions
├── utils/            # Cloudinary config, helpers
├── .env              # Environment variables
├── server.js         # Entry point
└── package.json
```

---

## License

MIT

---

## Author

[Gokul Krishna](https://github.com/Gokulrx100)