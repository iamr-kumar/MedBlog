import axios from "axios";
import React, { useEffect } from "react";
import "./Homepage.css";
// ==============
import injureImage from "../../image/undraw_injured_9757.svg";
import writePostImage from "../../image/undraw_wall_post_83ul.svg";
import readPostImage from "../../image/undraw_Blog_post_re_fy5x.svg";
import reactPostImage from "../../image/undraw_Loving_it_re_jfh4.svg";
// ====================
const Homepage = () => {
  return (<div className="Homepage">
    <section className="Homepage-section">
      <div>
        <h4>Write Blog to Share Your Exeperience</h4>
        <p>Tell THe world what you wen through, how you cured it and came out a fighter, cause of Course!! we know, everybody know, you'r a fighter</p>
        </div>    
        <img src={writePostImage} alt="Person Holding a big pen and writin a blog" />
    </section>
    <section className="Homepage-section">
    <img src={readPostImage} alt="People Reading Post" />
      <div> 
        <h4>Read Other People Experience</h4> 
        <p>Read what others went through, how they got cured and who helped them. Read their experiences.</p>
      </div>
    </section>
    <section className="Homepage-section">
      <div>
        <h4>React To other Post</h4>
        <p>Like Other People post, congratulate them, support them, thats why you'r a human, are you??</p>
      </div>
      <img src={reactPostImage} alt="Person liking a post on the site"/>
    </section>
    <section>     
    </section>
    <section className="Homepage-section">Hello
    </section>
  </div>);
};

export default Homepage;
