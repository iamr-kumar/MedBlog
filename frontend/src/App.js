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

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/posts/create-post" exact component={CreatePost} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
