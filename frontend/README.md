# Blogo Frontend

This is the frontend for the **Blogo** blogging platform, built with **React** and **Vite**.  
It provides a modern, responsive user interface for blog creation, user authentication, profile management, and more.

---

## Features

- User signup and signin (with profile picture upload)
- JWT-based authentication (communicates with backend)
- Create, edit, delete, and view blogs
- Comment on blogs
- Like/unlike blogs
- User profile page with avatar
- Protected routes for authenticated users
- Responsive and clean UI

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (for fast development and build)
- [Axios](https://axios-http.com/) (for API requests)
- [React Router](https://reactrouter.com/) (for routing)
- [Material Icons](https://fonts.google.com/icons) (for icons)
- CSS (custom styles)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blog.git
cd blog/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (if needed)

If your frontend needs to know the backend API URL, create a `.env` file in the `frontend` directory:

```
VITE_API_URL=http://localhost:3000
```

Update your API calls in the code to use this variable if required.

### 4. Start the development server

```bash
npm run dev
```

The app will run on `http://localhost:5173` by default (or another port if specified).

---

## Project Structure

```
frontend/
│
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components (Signup, Signin, Home, etc.)
│   ├── utils/          # Helper functions and API logic
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── ...             # Other files
├── .env                # Environment variables (optional)
├── package.json
└── vite.config.js
```

---

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build

---

## License

MIT

---

[Gokul Krishna](https://github.com/Gokulrx100)
