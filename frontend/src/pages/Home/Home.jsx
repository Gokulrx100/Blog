import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import axios from "axios";
import {useNavigate} from "react-router";
import "./Home.css"

const Home = () => {
  const navigate=useNavigate();
  const [blogs,setBlogs]=useState([]);
  const [loading,setLoading]=useState(true);

  async function fetchBlogs(){
    try{
    const response=await axios.get("http://localhost:3000/getblogs",
      {
        headers : {
          token:localStorage.getItem("token")
        }
      }
    );
    setBlogs(response.data.blogs);
  }catch(err){
    setError(err.response?.data?.message || "Failed to fetch blogs");
  }
  finally{
    setLoading(false);
  }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])

  if(loading){
    return(
      <>
        <Navbar/>
        <div className="profile-loading">Loading...</div>
      </>
    )
  }

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