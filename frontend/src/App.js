import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Homepage from "./components/layout/Homepage";
import Navbar from "./components/layout/Navbar";
import CreatePost from "./components/posts/CreatePost";
import DoctorMentions from "./components/posts/DoctorMentions";
import PostList from "./components/posts/PostList";
import SearchResult from "./components/posts/SearchResult";
import SinglePost from "./components/posts/SinglePost";
import AlertProvider from "./contexts/AlertContext";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/posts/all" exact component={PostList} />
              <PrivateRoute
                path="/posts/create-post"
                exact
                component={CreatePost}
              />
              <PrivateRoute
                path="/posts/search/:id"
                exact
                component={SearchResult}
              />
              <PrivateRoute
                path="/posts/my-mentions"
                exact
                component={DoctorMentions}
              />
              <PrivateRoute path="/posts/:id" exact component={SinglePost} />
            </Switch>
          </Router>
        </div>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
