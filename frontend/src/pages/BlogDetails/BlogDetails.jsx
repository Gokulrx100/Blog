import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import "./blogContent.css";
import "./comments.css";

const BlogDetails = () => {
  const { username, slug } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(location.state?.blog || null);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  
  // Comment state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      setLikesCount(blog.likes?.length || 0);
      const currentUserId = getCurrentUserId();
      setIsLiked(blog.likes?.includes(currentUserId) || false);
      fetchComments();
      return;
    }

    async function fetchBlog() {
      try {
        const response = await axios.get(
          `http://localhost:3000/${username}/${slug}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        setBlog(response.data.blog);
        setLikesCount(response.data.blog.likes?.length || 0);
        const currentUserId = getCurrentUserId();
        setIsLiked(response.data.blog.likes?.includes(currentUserId) || false);
        fetchComments();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      }
    }
    fetchBlog();
  }, [username, slug, blog]);

  const getCurrentUserId = () => {
    return localStorage.getItem("userId");
  };

  const fetchComments = async () => {
    if (!blog) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/${blog._id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleLike = async () => {
    if (!blog || isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/like/${blog._id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      
      if (response.data.message === "liked") {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      } else {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      }
    } catch (err) {
      console.error("Failed to like/unlike blog:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:3000/comments/${blog._id}`,
        { content: newComment },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:3000/comments/${blog._id}`,
        { content: replyContent, parent: parentId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setReplyContent("");
      setReplyTo(null);
      fetchComments();
    } catch (err) {
      console.error("Failed to add reply:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const renderComment = (comment, depth = 0) => {
    const currentUserId = getCurrentUserId();
    const isOwner = comment.user._id === currentUserId;

    return (
      <div key={comment._id} className={`comment ${depth > 0 ? 'comment-reply' : ''}`}>
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">{comment.user.username}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="comment-text">{comment.content}</div>
          <div className="comment-actions">
            <button 
              className="reply-btn"
              onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
            >
              Reply
            </button>
            {isOwner && (
              <button 
                className="delete-btn"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {replyTo === comment._id && (
          <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, comment._id)}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="reply-input"
              rows="3"
            />
            <div className="reply-form-actions">
              <button type="submit" disabled={isSubmitting} className="submit-reply-btn">
                Reply
              </button>
              <button 
                type="button" 
                onClick={() => setReplyTo(null)} 
                className="cancel-reply-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="blog-details-container">
        {error && <div className="error">{error}</div>}
        {blog ? (
          <>
            <div className="blog-content-wrapper">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-snippet">{blog.snippet}</div>
              <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className="blog-meta">— by<span>{blog.userId.username}</span></div>
              
              <div className="blog-actions">
                <button
                  className={`like-button ${isLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                  disabled={isLiking}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isLiked ? '#e74c3c' : 'none'}
                    stroke={isLiked ? '#e74c3c' : '#666'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="likes-count">{likesCount}</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3 className="comments-title">Comments ({comments.length})</h3>
              
              {/* Add Comment Form */}
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="comment-input"
                  rows="4"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting || !newComment.trim()}
                  className="submit-comment-btn"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.map(comment => renderComment(comment))
                ) : (
                  <div className="no-comments">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : !error ? (
          <div className="loading">Loading...</div>
        ) : null}
      </div>
    </>
  );
};

export default BlogDetails;
