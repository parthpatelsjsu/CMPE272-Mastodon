import { useEffect, useState } from "react";
import "./App.css";

// Hide the token before making repo public and submitting
const MASTODON_INSTANCE = "https://mstdn.plus";
const ACCESS_TOKEN = "opl1nHQury42r7IBvXWNZbnxwxGCPAxkWP4ofwT7jcg";

interface Post {
  id: number;
  content: string;
  created_at: string;
}

interface Status {
  message: string;
  failure: boolean;
}

// Remove html tags from content before displaying
const stripHtml = (html: string) => {
  return html.replace(/<[^>]+>/g, "");
};

function App() {
  const [postContent, setPostContent] = useState<string>(""); // stores the context of post
  const [deletePostId, setDeletePostId] = useState<string>(""); // stores the post id that needs to be deleted
  const [getPostId, setGetPostId] = useState<string>(""); // stores the post id that needs to be fetched
  const [postStatus, setPostStatus] = useState<Status>(); // if error during POST, store error here
  const [getPostStatus, setGetPostStatus] = useState<Status>(); // if error during GET, store error here
  const [getDelStatus, setDelPostStatus] = useState<Status>(); // if error during DELETE, store error here
  const [postList, setPostList] = useState<Post[]>([]); // stores ALL posts we created
  const [fetchPost, setFetchPost] = useState<Post>();

  useEffect(() => {
    fetchAllPosts(); // Fetch all posts that exist so they can be displayed
  }, []);

  const createPost = async () => {
    if (!postContent.trim()) {
      setPostStatus({ message: "Post content cannot be empty", failure: true });
      return;
    }

    const response = await fetch(`${MASTODON_INSTANCE}/api/v1/statuses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: postContent.trim() }),
    });

    if (response.ok) {
      const post = await response.json();
      setPostList([...postList, post]);
      setPostStatus({
        message: `Post created successfully! ID: ${post.id}`,
        failure: false,
      });
      fetchAllPosts();
    } else {
      setPostStatus({
        message: `Error creating post: ${response.status}`,
        failure: true,
      });
    }

    setPostContent(""); // Clear input
  };

  // Function to fetch post by ID
  const fetchPostById = async () => {
    // Check if the post ID is empty
    if(!getPostId.trim()) {
      setGetPostStatus({ message: "Post ID cannot be empty", failure: true });
      setFetchPost({ id: -1, content: "Please enter a valid Post ID", created_at: "" });
      fetchPost && setFetchPost(undefined);
      return;
    }
    // Making a GET request to fetch the post by ID
    const response = await fetch(
      `${MASTODON_INSTANCE}/api/v1/statuses/${getPostId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const fetchedPost = await response.json();
    
    // Checking if the API request was successful
    if (response.ok) {
      console.log(`Get post by Id successful ID:${fetchedPost.id}`);
      setGetPostStatus({ message: `Get Post by ID Succeeded ID:${fetchedPost.id}`, failure: false });
      setFetchPost(fetchedPost);
    } else {
      console.log("Error getting post by Id");
      console.log(response.status);
      console.log(response.text);
      setGetPostStatus({ message: "Get Post by ID failed", failure: true });
      setFetchPost({ id: -1, content: fetchedPost.error, created_at: "" });
    }

  };

  const deletePostById = async () => {
    // ***TO BE IMPLEMENTED***
  };

  // Function to fetch all public posts
  const fetchAllPosts = async () => {
    const response = await fetch(
      `${MASTODON_INSTANCE}/api/v1/accounts/114027501803173344/statuses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const posts = await response.json();
      console.log(posts);
      setPostList(posts); // Store the posts in state
      // setStatus("Fetched latest public posts!");
      console.log("Get all posts successful");
    } else {
      // setStatus(`Error fetching posts: ${response.status}`);
      console.log("Error getting all posts");
      console.log(response.status);
      console.log(response.text);
      setPostList([]);
    }
  };

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
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          onClick={createPost}
        >
          Create Post
        </button>

        {postStatus && (
          <h2
            className={`text-md text-blue font-bold  mt-4 ${postStatus.failure ? "text-red-500" : "text-green-500"
              }`}
          >
            {postStatus.message}
          </h2>
        )}
      </div>

      {/* Fetch Post by ID section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Fetch Post by ID
        </h2>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Post ID"
          value={getPostId}
          onChange={(e) => setGetPostId(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 cursor-pointer"
          onClick={fetchPostById}
        >
          Fetch Post
        </button>
        {fetchPost && (
          <div className="bg-green-100 rounded-md">
            <h2 className="text-md font-bold text-gray-500 mt-5 p-3">
              Post ID: {fetchPost.id}
            </h2>
            <p className="text-gray-700 text-sm font-bold p-3">
              {stripHtml(fetchPost.content)}
            </p>
          </div>
        )}
      </div>

      {/* Delete Post Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Delete Post by ID
        </h2>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Post ID"
          value={deletePostId}
          onChange={(e) => setDeletePostId(e.target.value)}
        />
        <button
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer"
          onClick={deletePostById}
        >
          Delete Post
        </button>
      </div>

      {/* Display Posts */}
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Posts</h2>
        {/* Removing this button since it should display dynamically
        <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300 mb-4">
          Fetch All Posts
        </button>*/}
        {postList.length > 0 && (
          <div className="space-y-4">
            <ul className="space-y-4">
              {postList.map((post) => (
                <li key={post.id} className="p-4 border-b border-gray-300">
                  <p className="text-gray-500 text-sm font-bold">
                    Post ID: {post.id}
                  </p>
                  <p className="text-lg font-medium">
                    {stripHtml(post.content)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Posted at: {new Date(post.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
