import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import "./create.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(null);

  async function handleCreateBlog() {
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/createBlog",
        { title, snippet, content },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setTitle("");
      setSnippet("");
      setContent("");
      if (contentRef.current) contentRef.current.innerHTML = "";
      window.location = "/home";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    }
  }

  return (
    <>
      <Navbar />
      <div id="create-container">
        <h2>— Create Blog —</h2>
        <div className="create-form">
        <div className="title-input">
          <label className="label">Title</label>
          <textarea
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
            placeholder="Enter the blog title"
          />
        </div>
        <div className="snippet-input">
          <label className="label">Snippet</label>
          <textarea
            required
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            rows={3}
            placeholder="Enter a short snippet"
          />
        </div>
        <div className="content">
          <label className="label">Content</label>
          <div
            ref={contentRef}
            contentEditable={true}
            className="content-editable"
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            placeholder="Write your blog content here..."
            suppressContentEditableWarning={true}
          />
          <div className="content-tip">
            <span>
              <b>Tip:</b> Use <kbd>Ctrl+B</kbd> for bold, <kbd>Ctrl+I</kbd> for
              italic, <kbd>Ctrl+Shift+8</kbd> for bullet list.
            </span>
          </div>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button onClick={handleCreateBlog}>Create</button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
