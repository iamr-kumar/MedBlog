import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

const { Provider } = AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/auth");
      setCurrentuser({
        isAuthenticated: true,
        token: localStorage.token,
        loading: false,
        user: res.data,
      });
      setLoading(false);
    } catch (err) {
      setCurrentuser({ ...currentUser, loading: false });
      setLoading(false);

      throw err;
    }
  }, [currentUser]);

  useEffect(() => {
    loadUser()
      .then((res) => console.log("User Loaded!"))
      .catch((err) => console.log(err));
  }, [loadUser]);

  const signup = async (name, email, password, category, dob) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ name, email, password, category, dob });
    try {
      const res = await axios.post("http://localhost:5000/users", body, config);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      await loadUser();
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/auth", body, config);
      localStorage.setItem("token", res.data.token);
      console.log(localStorage.getItem("token"));
      await loadUser();
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setCurrentuser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  const value = {
    signup,
    currentUser,
    login,
    logout,
  };

  return <Provider value={value}>{!loading && children}</Provider>;
};

export default AuthProvider;
