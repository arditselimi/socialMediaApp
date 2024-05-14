import { useContext } from "react";
import { Link } from "react-router-dom";

import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const HeaderLoggedIn = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleLogOut = () => {
    appDispatch({ type: "logout" });
  };

  return (
    <div className="flex gap-2 justify-center text-white">
      <span>
        <i className="ri-search-line text-xl cursor-pointer"></i>
      </span>
      <span>
        <i className="ri-chat-1-line text-xl cursor-pointer"></i>
      </span>
      <Link to={`/profile/${appState.user.username}`}>
        <img
          src={appState.user.avatar}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover inline-block border cursor-pointer"
        />
      </Link>
      <span>
        <Link
          to="/create-post"
          className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600 cursor-pointer"
        >
          Create Post
        </Link>
      </span>
      <span>
        <a
          onClick={handleLogOut}
          href="/"
          className="px-3 py-1.5 bg-blue-400 rounded hover:bg-blue-500 cursor-pointer"
        >
          Sign out
        </a>
      </span>
    </div>
  );
};

export default HeaderLoggedIn;
