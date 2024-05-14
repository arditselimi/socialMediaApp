import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Page from "./Page";
import ProfilePosts from "./ProfilePosts";
import StateContext from "../StateContext";

const Profile = () => {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravtar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`/profile/${username}`, {
          token: appState.user.token,
        });

        setProfileData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <Page title="Profile">
      <div className="container mx-auto p-4 md:px-32 lg:px-48">
        <h2 className="flex items-center gap-4">
          <img
            src={localStorage.getItem("socialMediaAppAvatar")}
            className="h-8 rounded-full"
          />
          <span className="text-xl text-neutral-700">
            {profileData.profileUsername}
          </span>
          <button className="bg-blue-500 text-white py-1 px-8 rounded hover:bg-blue-600">
            Follow
          </button>
        </h2>

        <div>
          <div className="border rounded px-4 py-2 mt-4 flex justify-between text-neutral-700">
            <a href="/">Posts: {profileData.counts.postCount} </a>
            <a href="/">Followers: {profileData.counts.followerCount} </a>
            <a href="/">Following: {profileData.counts.followingCount} </a>
          </div>

          {/* <div>
            <div className="mt-4 border rounded p-2 ">
              <a href="/" className="flex items-center gap-4">
                <img
                  src={profileData.profileAvatar}
                  alt="profile"
                  className="h-8 rounded-full"
                />
                <strong className="text-neutral-600 text-sm hover:text-blue-600">
                  Example Post #1
                </strong>
                <strong className="text-neutral-600 text-sm font-light">
                  on 2/10/2022
                </strong>
              </a>
            </div>
          </div> */}

          <ProfilePosts />
        </div>
      </div>
    </Page>
  );
};

export default Profile;
