import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import CreateBlog from "./pages/CreateBlogs/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protectedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path="/:username/:slug" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
