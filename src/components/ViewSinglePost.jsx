import Page from "./Page";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import StateContext from "../StateContext";
import { toast } from "react-toastify";

const ViewSinglePost = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const appState = useContext(StateContext);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await axios.get(`/post/${id}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPost();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user?.username == post.author?.username;
    }
  }

  async function deleteHandler() {
    const areYouSure = window.confirm(
      "Do you really want to delete this post?"
    );

    if (areYouSure) {
      try {
        const response = await axios.delete(`/post/${id}`, {
          data: { token: appState.user.token },
        });

        if (response.data == "Success") {
          toast("Post was deleted.");

          navigate(`/profile/${appState.user?.username}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="container mx-auto md:px-32 md:py-12 lg:px-48">
        <div className="flex justify-between pt-4 mb-4">
          <h2 className="text-3xl text-neutral-800">{post?.title}</h2>
          {isOwner() && (
            <div>
              <Link
                data-tooltip-content="Edit"
                data-tooltip-id="edit"
                to={`/edit-post/${id}`}
              >
                <i className="ri-edit-box-line text-2xl text-blue-400 cursor-pointer hover:text-blue-700"></i>
              </Link>
              <Tooltip id="edit" />
              <span
                data-tooltip-content="Delete"
                data-tooltip-id="delete"
                onClick={deleteHandler}
              >
                <i className="ri-close-line text-2xl text-red-600 cursor-pointer hover:text-red-900"></i>
              </span>
              <Tooltip id="delete" />
            </div>
          )}
        </div>

        <p className="flex items-center text-sm text-neutral-700">
          <a href="/" className="mr-2">
            <img src={post?.author?.avatar} className="rounded-full h-8 w-8" />
          </a>
          Posted by{" "}
          <a href="/" className="ml-1 mr-1 text-red-800">
            {post?.author?.username}
          </a>{" "}
          on {dateFormatted}
        </p>

        <div className="mt-4">
          <p>lorem</p>
        </div>
      </div>
    </Page>
  );
};

export default ViewSinglePost;
