import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProfilePosts = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            className="flex items-center gap-2 border p-2 mt-2 rounded hover:bg-gray-200"
            to={`/post/${post._id}`}
          >
            <img src={post.author.avatar} className="h-8 rounded-full" />
            <strong className="text-zinc-600 text-sm">{post.title}</strong>
            <span className="text-zinc-600 text-sm">on {dateFormatted}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
