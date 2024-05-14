import { toast } from "react-toastify";
import Page from "./Page";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../StateContext";

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = appState.user.token;

    if (!token) {
      console.log("Token not found");
      return;
    }

    try {
      const response = await axios.post("/create-post", {
        title,
        body,
        token,
      });

      setTitle("");
      setBody("");
      toast("You just created a post.");
      navigate("/post/${response.data}");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Page title="Create post">
      <div className="container mx-auto">
        <h4 className="text-3xl font-semibold mt-4 mb-4 text-zinc-800 md:w-[800px] md:mx-auto">
          Create a post
        </h4>

        <form
          className="flex flex-col gap-4 md:w-[800px] md:mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Title"
            className="border-2 p-2 rounded outline-none focus:border-blue-200"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="Body"
            className="border-2 p-2 rounded h-48 outline-none focus:border-blue-200"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <button className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600">
            Submit
          </button>
        </form>
      </div>
    </Page>
  );
};

export default CreatePost;
