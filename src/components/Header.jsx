import { useState } from "react";
import { Link } from "react-router-dom";

import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <header className="bg-indigo-700">
      <div className="container m-auto p-4 flex flex-col gap-4 text-center md:flex-row md:justify-between">
        <div>
          <h2>
            <Link to="/" className="text-white font-semibold text-xl">
              SocialApp
            </Link>
          </h2>
        </div>
        {loggedIn ? (
          <HeaderLoggedIn setLoggedIn={setLoggedIn} />
        ) : (
          <HeaderLoggedOut setLoggedIn={setLoggedIn} />
        )}
      </div>
    </header>
  );
};

export default Header;
