import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import "./PostList.css";
import { baseUrl } from "../../utils";

const SearchResult = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/posts/search-post/${id}`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, [id]);

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

export default SearchResult;
