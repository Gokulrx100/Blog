import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import "./blogDetails.css";

const BlogDetails = () => {
  const { username, slug } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(location.state?.blog || null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (blog) return;

    async function fetchBlog() {
      try {
        const response = await axios.get(
          `http://localhost:3000/${username}/${slug}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        setBlog(response.data.blog);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      }
    }
    fetchBlog();
  }, [username, slug]);

  return (
    <>
      <Navbar />
      <div className="blog-details-container">
        {error && <div className="error">{error}</div>}
        {blog ? (
          <div className="blog-content-wrapper">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-snippet">{blog.snippet}</div>
            <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className="blog-meta">— by <span>{blog.userId.username}</span></div>
          </div>
        ) : !error ? (
          <div className="loading">Loading...</div>
        ) : null}
      </div>
    </>
  );
};

export default BlogDetails;
