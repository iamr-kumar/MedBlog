import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

  const handleClick = (illness) => {
    history.push(`/posts/search/${illness}`);
  };

  return (
    <div>
      <h1>Posts Page</h1>
    </div>
  );
};

export default PostList;
