import { useState } from "react";
import axios from "axios";

const HeaderLoggedOut = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", {
        username,
        password,
      });
      if (response.data) {
        localStorage.setItem("socialMediaAppToken", response.data.token);
        localStorage.setItem("socialMediaAppUsername", response.data.username);
        localStorage.setItem("socialMediaAppAvatar", response.data.avatar);
        setLoggedIn(true);
      } else {
        console.log("Incorret username or password");
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          className="px-2 py-1 outline-none rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1 outline-none rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-rose-500 text-white py-2 px-6 text-sm rounded hover:bg-red-600">
          Log in
        </button>
      </form>
    </div>
  );
};
export default HeaderLoggedOut;
