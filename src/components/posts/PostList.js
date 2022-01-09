import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import PostCard from "./PostCard";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/posts/all")
      .then((res) => {
        setPosts(res.data.posts);
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="listing post-list-container">
      <div className="row d-flex post-list-container">
        {!loading ? (
          posts.map((post, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              key={index}
              style={{ marginBottom: "2rem" }}
            >
              <PostCard index={index} post={post} />
            </div>
          ))
        ) : (
          <div className="col-sm-12 d-flex justify-content-center">
            <Loader
              type="TailSpin"
              color="rgb(0, 183, 255)"
              height={100}
              width={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
