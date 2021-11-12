import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("/posts/all")
      .then((res) => {
        setPosts(res.data.posts);
        console.log(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="listing post-list-container">
      <div className="row d-flex post-list-container">
        {posts.map((post, index) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            key={index}
            style={{ marginBottom: "2rem" }}
          >
            <PostCard index={index} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
