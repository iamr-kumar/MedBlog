import axios from "axios";
import React, { useEffect } from "react";
import "./Homepage.css";
// ==============
import injureImage from "../../image/undraw_injured_9757.svg";
import writePostImage from "../../image/undraw_wall_post_83ul.svg";
import readPostImage from "../../image/undraw_Blog_post_re_fy5x.svg";
import reactPostImage from "../../image/undraw_Loving_it_re_jfh4.svg";
import { Link } from "react-router-dom";
// ====================
const Homepage = () => {
  return (
    <div className="Homepage">
      <section className="Homepage-section">
        <div>
          <h4>Write Blog to Share Your Experience</h4>
          <p>
            Tell the world what you went through, how you cured it and came out
            a fighter, cause of course, we know, everybody know, you'r a
            fighter!
          </p>
        </div>
        <img
          src={writePostImage}
          alt="Person Holding a big pen and writin a blog"
        />
      </section>
      <section className="Homepage-section">
        <img src={readPostImage} alt="People Reading Post" />
        <div>
          <h4>Read Others' Experience</h4>
          <p>
            Read what others went through, how they got cured and who helped
            them. Read their experiences.
          </p>
          <Link to="/posts/all" className="btn btn-info">
            Read Stories
          </Link>
        </div>
      </section>
      <section className="Homepage-section">
        <div>
          <h4>React To Others' Post</h4>
          <p>
            Like Others' People post, congratulate them, support them, that's
            why you're a human, aren't you?
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
          </div>
        </div>
        <img src={reactPostImage} alt="Person liking a post on the site" />
      </section>
    </div>
  );
};

export default Homepage;
