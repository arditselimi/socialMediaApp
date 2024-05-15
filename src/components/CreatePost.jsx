import { toast } from "react-toastify";
import Page from "./Page";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../StateContext";
import { useImmerReducer } from "use-immer";

const CreatePost = (props) => {
  const initialState = {
    title: {
      value: "",
      hasErrors: false,
      message: "",
    },
    body: {
      value: "",
      hasErrors: false,
      message: "",
    },
    isSaving: false,
    sendCount: 0,
  };

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "titleChange":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        return;
      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasErrors = true;
          draft.title.message = "Please add some text.";
        }
        return;
      case "bodyChange":
        draft.body.hasErrors = false;
        draft.body.value = action.value;
        return;
      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasErrors = true;
          draft.body.message = "Please add some text.";
        }
        return;
      case "savingStarted":
        draft.isSaving = true;
        return;
      case "savingFinished":
        draft.isSaving = false;
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

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
        title: state.title.value,
        body: state.body.value,
        token,
      });
      console.log(response.data);
      toast("You just created a post.");
      navigate(`/post/${response.data}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (state.isSaving) {
    return <div>Loading...</div>;
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
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            value={state.title.value}
            onBlur={(e) =>
              dispatch({ type: "titleRules", value: e.target.value })
            }
          />
          {state.title.hasErrors && (
            <div className="bg-red-400 px-2 rounded text-white">
              {state.title.message}
            </div>
          )}
          <textarea
            placeholder="Body"
            className="border-2 p-2 rounded h-48 outline-none focus:border-blue-200"
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            onBlur={(e) =>
              dispatch({ type: "bodyRules", value: e.target.value })
            }
            value={state.body.value}
          />
          {state.body.hasErrors && (
            <div className="bg-red-400 text-white px-2 rounded">
              {state.body.message}
            </div>
          )}
          <button
            className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600"
            disabled={state.isSaving}
          >
            Submit
          </button>
        </form>
      </div>
    </Page>
  );
};

export default CreatePost;
