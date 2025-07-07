import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import "./profile.css";
import {useNavigate} from "react-router";

const Profile = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:3000/profile", {
          headers: { token: localStorage.getItem("token") },
        });
        setUser(res.data.user);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteBlog/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("Failed to delete blog.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-loading">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">

        <section className="profile-card">
          <div className="profile-image-wrapper">
            <img
              src={
                user?.profilePic && user.profilePic.trim() !== ""
                  ? user.profilePic
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || ""
                    )}&background=ddd&color=333&rounded=true`
              }
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-username">@{user?.username}</p>
            <p className="profile-gmail">{user?.gmail}</p>
          </div>
        </section>

        <section className="profile-blogs">
          <h2>Your Blogs</h2>
          <div className="blog-list">
            {blogs.length === 0 ? (
              <div className="no-blogs">No blogs yet.</div>
            ) : (
              blogs.map((blog) => (
                <div className="blog-card" key={blog._id} onClick={() => navigate(`/${blog.userId.username}/${blog.slug}`, {state:{blog}})}>
                  <div className="blog-header">
                    <h3>{blog.title}</h3>
                    <div className="blog-icons">
                      <button title="Edit"  onClick={(e)=>{
                        e.stopPropagation();
                         navigate("/edit-blog", { state: { blog } });
                      }}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button
                        title="Delete"
                        onClick={(e) =>{ 
                          e.stopPropagation();
                          handleDelete(blog._id)}
                        }
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="blog-snippet">{blog.snippet}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
