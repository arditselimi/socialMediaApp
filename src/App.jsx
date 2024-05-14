import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL = "http://localhost:8081/";

// Components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import Profile from "./components/Profile";
import About from "./components/About";
import Terms from "./components/Terms";
import Footer from "./components/Footer";

import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";

const App = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("socialMediaAppToken")),
    user: {
      token: localStorage.getItem("socialMediaAppToken"),
      username: localStorage.getItem("socialMediaAppUsername"),
      avatar: localStorage.getItem("socialMediaAppAvatar"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("socialMediaAppToken", state.user.token);
      localStorage.setItem("socialMediaAppUsername", state.user.username);
      localStorage.setItem("socialMediaAppAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("socialMediaAppToken");
      localStorage.removeItem("socialMediaAppUsername");
      localStorage.removeItem("socialMediaAppAvatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header loggedIn={state.loggedIn} />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
