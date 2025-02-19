import "./App.css";

function App() {
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
    </div>
  );
}

export default App;
