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
    </div>
  );
}

export default App;
