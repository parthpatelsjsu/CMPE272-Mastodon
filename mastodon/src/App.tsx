import { useState } from "react";
import "./App.css";

// Hide the token before making repo public and submitting
const MASTODON_INSTANCE = "https://mstdn.plus";
const ACCESS_TOKEN = "opl1nHQury42r7IBvXWNZbnxwxGCPAxkWP4ofwT7jcg";

interface Post {
  id: number;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">
        {" "}
        Interact with Mastodon Posts!
      </h1>

      {/* Create Post Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Create a Post</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Write your post here..."
        ></textarea>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Create Post
        </button>
      </div>

      {/* Fetch Post by ID section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Fetch Post by ID
        </h2>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Post ID"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
          Fetch Post
        </button>
      </div>

      {/* Delete Post Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Delete Post by ID
        </h2>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Post ID"
        />
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">
          Delete Post
        </button>
      </div>

      {/* Display Posts */}
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Posts</h2>
        <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300 mb-4">
          Fetch All Posts
        </button>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
