import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PostList.css";

const SearchResult = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  // console.log(params);

  useEffect(() => {
    axios
      .get(`/posts/search-post/${id}`)
      .then((res) => {
        setPosts(res.data.posts);
        // console.log(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="listing container">
      <div className="row">
        {posts.map((post) => (
          <div className="blog_list col-lg-5" key={post._id}>
            <div className="row">
              <div className="col-lg-12">
                <div className="blog_info">
                  <h3>{post.title}</h3>
                  <span className="author">{post.name}</span>
                  <div className="blog_response">
                    <div className="row justify-content-between">
                      <div className="col-4 post-likes">
                        <p>
                          <i className="far fa-heart"></i> {post.likes.length}
                        </p>
                      </div>
                      <div className="col-4 post-comments">
                        <p>
                          <i className="far fa-comment"></i>{" "}
                          {post.comments.length}
                        </p>
                      </div>
                      <div className="col-4 post-comments">
                        {post.isVerified ? (
                          <div className="verify">
                            <i class="fas fa-check-circle"></i>
                            <span>Verified</span>
                          </div>
                        ) : (
                          <div className="verify">
                            <i class="fas fa-times-circle"></i>
                            <span>Not Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bottom-part d-flex justify-content-between align-items-center">
                    <Link to={`/posts/${post._id}`}>
                      <p className="read_button">Read</p>
                    </Link>
                    <div className="disease-tag">{post.illness}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
