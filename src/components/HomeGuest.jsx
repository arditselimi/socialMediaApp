import { useState } from "react";
import axios from "axios";

import Page from "./Page";

const HomeGuest = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/register", {
        username,
        email,
        password,
      });

      console.log(username, email, password);
      console.log(response.data);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Page title="Home">
      <div className="container m-auto py-8 flex flex-col gap-4 md:flex-row md:gap-12 md:py-24">
        <div className="flex-1">
          <h1 className="text-3xl py-4 font-semibold text-neutral-800 md:text-5xl">
            Connect, Share, Inspire.
          </h1>
          <p className="text-neutral-600">
            Join us and become part of a diverse and inclusive community where
            your voice matters. From lively discussions to supportive
            conversations, there's always something exciting happening on our
            app. So why wait? Download now and start sharing your story with the
            world.
          </p>
        </div>
        <div className="flex-1">
          <form
            className="flex flex-col gap-2 md:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-sm text-neutral-400">Username</label>
              <input
                placeholder="Your username"
                className="border-2 rounded px-2 py-1 outline-stone-400"
                autoComplete="none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-neutral-400">Email</label>
              <input
                placeholder="Your email"
                className="border-2 rounded px-2 py-1 outline-stone-400"
                autoComplete="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-neutral-400">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="border-2 rounded px-2 py-1 outline-stone-400"
                autoComplete="none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default HomeGuest;
