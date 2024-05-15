import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import Page from "./Page";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import StateContext from "../StateContext";

const EditPost = () => {
  const originalState = {
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
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        return;
      case "bodyChange":
        draft.body.hasErrors = false;
        draft.body.value = action.value;
      case "submitRequest":
        draft.sendCount++;
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasErrors = true;
          draft.title.message = "You must provide a title.";
        }
        return;
      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasErrors = true;
          draft.body.message = "You must provide body content.";
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState);

  const navigate = useNavigate();
  const appState = useContext(StateContext);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "titleRules", value: state.title.value });
    dispatch({ type: "bodyRules", value: state.body.value });
    dispatch({ type: "submitRequest" });
  }

  useEffect(() => {
    const ourReq = axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await axios.get(`/post/${state.id}`, {
          cancelToken: ourReq.token,
        });
        dispatch({ type: "fetchComplete", value: response.data });
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchPost();

    return () => {
      ourReq.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourReq = axios.CancelToken.source();

      async function fetchPost() {
        try {
          const response = await axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token,
            },
            { cancelToken: ourReq.token }
          );
          console.log("hello");
          dispatch({ type: "saveRequestFinished" });
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchPost();

      return () => {
        ourReq.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <Page title="Edit post">
      <div className="container mx-auto px-4 py-4 md:py-12">
        <Link to={`/post/${state.id}`} className="text-blue-800">
          &laquo; Back to post
        </Link>
        <form
          className="flex flex-col gap-4 md:w-[800px] md:mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Title"
            className="border-2 p-2 rounded outline-none focus:border-blue-200"
            value={state.title.value}
            autoFocus
            name="title"
            autoComplete="off"
            type="text"
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            onBlur={(e) =>
              dispatch({ type: "titleRules", value: e.target.value })
            }
          />
          {state.title.hasErrors && (
            <div className="bg-red-300 px-4 py-1 rounded -mt-2">
              {state.title.message}
            </div>
          )}
          <textarea
            placeholder="Body"
            className="border-2 p-2 rounded h-48 outline-none focus:border-blue-200"
            value={state.body.value}
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            onBlur={(e) => {
              dispatch({ type: "bodyRules", value: e.target.value });
            }}
          />
          {state.body.hasErrors && (
            <div className="bg-red-300 px-4 py-1 rounded -mt-2">
              {state.body.message}
            </div>
          )}
          <button
            className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
            disabled={state.isSaving}
          >
            Submit
          </button>
        </form>
      </div>
    </Page>
  );
};

export default EditPost;
