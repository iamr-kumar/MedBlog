import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";

const CreatePost = () => {
  const [postContent, setPostContent] = useState({
    title: "",
    illness: "",
    doctor: "",
    docId: "",
    plainText: "",
  });

  const history = useHistory();

  const [text, setText] = useState("");

  const { title, illness, doctor, docId, plainText } = postContent;
  const [docs, setDoc] = useState([]);

  const handleChange = (e) => {
    setPostContent({ ...postContent, [e.target.name]: e.target.value });
  };

  const findDoc = async (e) => {
    setPostContent({ ...postContent, doctor: e });
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify({ query: e });
    try {
      const res = await axios.post("/doctors/find-doctor", body, config);
      setDoc(res.data.doc);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (value, delta, source, editor) => {
    setPostContent({ ...postContent, plainText: editor.getText() });
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

  const setDoctor = (doc) => {
    setDoc([]);
    setPostContent({ ...postContent, doctor: doc.name, docId: doc._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify({
      title,
      text,
      illness,
      docId,
      doctor,
      plainText,
    });
    try {
      const res = await axios.post("/posts/add-post", body, config);
      console.log(res.data);
      history.push("/posts/all");
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
            onChange={handleTextChange}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Tell your story"
          />
          <div className="form-group">
            <label htmlFor="doctor">Who helped you?</label>
            <input
              type="text"
              className="form-control"
              name="doctor"
              placeholder="Search Your Consulted Doctor"
              value={doctor}
              onChange={(e) => findDoc(e.target.value)}
            />
            <div className="search-suggestion">
              <ul className="collection">
                {docs.map((doc) => (
                  <li key={doc._id}>
                    <div className="search-list" onClick={() => setDoctor(doc)}>
                      {doc.name}
                      <p>{doc.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="form-group btn-container">
            <button className="btn-primary submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
