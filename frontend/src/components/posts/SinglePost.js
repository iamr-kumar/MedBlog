import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { useAuth } from "./../../contexts/AuthContext";
import "./SinglePost.css";

const SinglePost = () => {
  const { currentUser } = useAuth();

  const [post, setPost] = useState();
  const { id } = useParams("");
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComment("");
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify({ text: comment });
    try {
      const res = await axios.post(`/posts/${post._id}/comment`, body, config);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIsLiked = (likes) => {
    if (
      likes.filter(
        (like) => like.user.toString() === currentUser.user._id.toString()
      ).length > 0
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const addLike = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/like`);
      // console.log(res);
      checkIsLiked(res.data);
      setLikes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/unlike`);
      checkIsLiked(res.data);
      setLikes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateLike = async () => {
    if (!isLiked) {
      await addLike();
    } else {
      await removeLike();
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/verify`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data.post);
        setLikes(res.data.post.likes);
        checkIsLiked(res.data.post.likes);
        setComments(res.data.post.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="listing container">
      {post && (
        <div className="blog">
          <h1>{post.title}</h1>
          <br />
          <hr />
          <div className="row justify-content-between align-items-center">
            <div className="col-6 col-md-6">
              <div className="writer_info">
                <p>
                  By <b>{post.name}</b>
                </p>
                <p>
                  <Moment format="DD/MM/YYYY">{post.date}</Moment>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="veirfier d-flex">
                {post.verified ? (
                  <div className="verify">
                    <div>
                      <i class="fas fa-check-circle"></i>
                      <span>Verified by {post.doctor}</span>
                    </div>
                  </div>
                ) : (
                  <div className="verify">
                    <div>
                      <i class="fas fa-times-circle"></i>
                      <span>Not Verified</span>
                    </div>
                    {currentUser.user._id === post.docId ? (
                      <div className="verify-button">
                        <button
                          className="btn btn-success"
                          onClick={handleVerify}
                        >
                          Verify <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <br />
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
          <div className="likes-count" onClick={updateLike}>
            {isLiked ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}{" "}
            {likes && likes.length}
          </div>
          <div className="comments">
            <i className="far fa-comment"></i> Comments
            <ul className="comment-list">
              {comments &&
                comments.map((comment) => (
                  <li>
                    <span>{comment.name}</span>
                    <span className="comment-date">
                      <Moment format="DD/MM/YY">{comment.date}</Moment>
                    </span>
                    <p>{comment.text}</p>
                  </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-class"
                  placeholder="Type your comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-info">Add Comment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
