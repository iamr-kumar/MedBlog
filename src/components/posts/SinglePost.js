import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import "./SinglePost.css";

const SinglePost = () => {
  const [post, setPost] = useState();
  const { id } = useParams("");

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data.post);
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
                {post.isVerified ? (
                  <div className="verify">
                    <i class="fas fa-check-circle"></i>
                    <span>Verified by {post.doctor}</span>
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
          <hr />
          <br />
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
