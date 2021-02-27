import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";

const CreatePost = () => {
  const [postContent, setPostContent] = useState({
    title: "",
    illness: "",
    doctor: "",
  });

  const [text, setText] = useState("Pen your battle here...");

  const { title, illness, doctor } = postContent;
  const [doc, setDoc] = useState([]);

  const handleChange = (e) => {
    setPostContent({ ...postContent, [e.target.name]: e.target.value });
  };

  const findDoc = async (e) => {
    setPostContent({ ...postContent, doctor: e });
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify({ query: e });
    try {
      const res = await axios.post("/doctors/find-doctor", body, config);
      setDoc(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks when pasting HTML:
    //   matchVisual: false,
    // }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify({ title, text, illness, doctor });
    try {
      const res = await axios.post("/posts/add-post", body, config);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Create-Post">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              placeholder="Give your battle story a title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">What did you overcome?</label>
            <input
              type="text"
              className="form-control"
              name="illness"
              value={illness}
              placeholder="Your disease"
              onChange={handleChange}
            />
          </div>
          <ReactQuill
            value={text}
            onChange={handleTextChange}
            theme="snow"
            modules={modules}
            formats={formats}
          />
          <div className="form-group">
            <label htmlFor="title">Who helped you?</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Search Your Consulted Doctor"
              value={doctor}
              onChange={(e) => findDoc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
