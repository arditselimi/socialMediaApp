import { useState, useContext } from "react";
import axios from "axios";

import DispatchContext from "../DispatchContext";

const HeaderLoggedOut = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const appDispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      if (response.data) {
        appDispatch({ type: "login", data: response.data });
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
