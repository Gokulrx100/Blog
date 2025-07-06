import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import axios from "axios";
import {useNavigate} from "react-router";
import "./Home.css"

const Home = () => {
  const navigate=useNavigate();
  const [blogs,setBlogs]=useState([]);

  async function fetchBlogs(){
    const response=await axios.get("http://localhost:3000/getblogs",
      {
        headers : {
          token:localStorage.getItem("token")
        }
      }
    );
    setBlogs(response.data.blogs);
  }

  useEffect(()=>{
    fetchBlogs();
  },[])
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="blog-list">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="blog-card"
              onClick={() => navigate(`/${blog.userId.username}/${blog.slug}`, {state:{blog}})}
            >
              <h2>{blog.title}</h2>
              <p>{blog.snippet}</p>
              <div className="blog-author">
                by {blog.userId.username}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home