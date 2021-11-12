import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PostList.css";
import PostCard from "./PostCard";

const DoctorMentions = () => {
  const [posts, setPosts] = useState([]);
  // console.log(params);

  useEffect(() => {
    axios
      .get("/doctors/get-tagged-posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="listing post-list-container">
      <div className="row">
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
};

export default DoctorMentions;
