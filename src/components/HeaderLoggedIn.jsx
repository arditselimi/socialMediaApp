const HeaderLoggedIn = ({ setLoggedIn }) => {
  const handleLogOut = () => {
    setLoggedIn(false);

    localStorage.removeItem("socialMediaAppToken");
    localStorage.removeItem("socialMediaAppUsername");
    localStorage.removeItem("socialMediaAppAvatar");
  };

  return (
    <div className="flex gap-2 justify-center text-white">
      <span>
        <i className="ri-search-line text-xl cursor-pointer"></i>
      </span>
      <span>
        <i className="ri-chat-1-line text-xl cursor-pointer"></i>
      </span>
      <span>
        <img
          src={localStorage.getItem("socialMediaAppAvatar")}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover inline-block border cursor-pointer"
        />
      </span>
      <span>
        <a
          href="/"
          className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600 cursor-pointer"
        >
          Create Post
        </a>
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
