import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Homepage from "./components/layout/Homepage";
import CreatePost from "./components/posts/CreatePost";
import AuthProvider from "./contexts/AuthContext";
import PostList from "./components/posts/PostList";
import SinglePost from "./components/posts/SinglePost";
import SearchResult from "./components/posts/SearchResult";
import DoctorMentions from "./components/posts/DoctorMentions";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
