import Page from "./Page";
import { useContext } from "react";
import StateContext from "../StateContext";

const Home = () => {
  const appState = useContext(StateContext);

  return (
    <Page title="Home">
      <div className="container m-auto flex flex-col items-center py-12">
        <h2 className="text-3xl text-center text-neutral-700 font-bold pb-2 md:text-4xl md:pb-4">
          The Latest from Those You Follow
        </h2>

        <div>
          <p className="text-neutral-600 text-center">
            Hello {appState.user.username}, your feed displays the latest posts
            of the people you follow.
          </p>
        </div>

        {/* <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 border py-2 px-4 rounded">
            <span>
              <img
                src={localStorage.getItem("socialMediaAppAvatar")}
                className="h-8 w-8 rounded-full mr-2"
              />
            </span>
            <span>
              <h6 className="font-semibold">
                <a href="/">Being a dog is wonderful</a>
              </h6>
            </span>
            <span className="text-neutral-400">
              {" "}
              by {localStorage.getItem("socialMediaAppUsername")} on 5/12/2022
            </span>
          </div>
          <div className="flex items-center gap-1 border py-2 px-4 rounded">
            <span>
              <img
                src={localStorage.getItem("socialMediaAppAvatar")}
                className="h-8 w-8 rounded-full mr-2"
              />
            </span>
            <span>
              <h6 className="font-semibold">
                <a href="/">Being a dog is wonderful</a>
              </h6>
            </span>
            <span className="text-neutral-400">
              {" "}
              by {localStorage.getItem("socialMediaAppUsername")} on 5/12/2022
            </span>
          </div>
        </div> */}
      </div>
    </Page>
  );
};
export default Home;
