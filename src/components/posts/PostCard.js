import React from "react";
import "./PostCard.css";
import { useHistory } from "react-router-dom";

const PostCard = ({ post, index }) => {
  const isBlue = index % 2 === 0;
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/posts/${post.slug}`);
  };

  const handleSearch = () => {
    history.push(`/posts/search/${post.illness}`);
  };

  return (
    <div className={isBlue ? "PostCard-blue" : "PostCard-white"}>
      <div className="post-header">
        <div className="author">
          <img
            src="https://avatars0.githubusercontent.com/u/17098204?s=460&u=f9f8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8&v=4"
            alt=""
          />
          <div className="author-info">{post.user.name}</div>
        </div>
        <div className="post-date">
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="post-title">
        <h2>{post.title}</h2>
      </div>
      <div className="post-disease" onClick={handleSearch}>
        <span className={isBlue ? "disease-span-blue" : "disease-span-white"}>
          {post.illness}
        </span>
      </div>
      <div className="post-desc">{post.plainText} </div>
      <div className="post-footer">
        <div className={isBlue ? "post-info" : "post-info post-info-white"}>
          <div className="post-likes">
            <i className="fas fa-heart"></i>
            <span>{post.likes.length}</span>
          </div>
          <div className="post-comment">
            <i className="fas fa-comment"></i>
            <span>{post.comments.length}</span>
          </div>

          <div className="post-verified">
            {post.verified ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
            <span>Verified</span>
          </div>
        </div>
        <div className="read-more">
          <button
            className={
              isBlue
                ? "btn read-more-btn"
                : "btn read-more-btn read-more-btn-white"
            }
            onClick={handleRedirect}
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
