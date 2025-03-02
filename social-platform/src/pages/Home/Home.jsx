import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollaboration } from "../../context/CollaborationContext";
import { useTheme } from "../../context/ThemeContext";
import { FaPlus } from "react-icons/fa";
import { CreatePostModal, CreatePostPrompt } from "./CreatePosts";
import { PostsGrid } from "./Feed";

const Home = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { darkMode } = useTheme();

  // Handle potential errors with useCollaboration
  let contextData = { posts: [], loading: false, error: null };

  try {
    contextData = useCollaboration() || contextData;
  } catch (error) {
    console.error("Error using CollaborationContext:", error);
  }

  const {
    posts = [],
    loading = false,
    error = null,
    createPost = () => console.log("createPost not available"),
    deletePost = () => console.log("deletePost not available"),
    toggleLike = () => console.log("toggleLike not available"),
    addComment = () => console.log("addComment not available"),
    loadCommentsForPost = () => console.log("loadCommentsForPost not available"),
  } = contextData;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-r from-blue-50 to-purple-50">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold text-gray-800 mb-4"
        >
          Welcome to CollabHub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-xl text-gray-600 mb-8"
        >
          Share ideas, resources, and skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Link
            to="/register"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Feed Section */}
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Feed</h1>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition ${darkMode ? "shadow-blue-900/30" : ""}`}
          >
            <FaPlus className="mr-2" /> Create Post
          </button>
        </div>

        <CreatePostPrompt onClick={() => setIsPostModalOpen(true)} />

        <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} createPost={createPost} />

        <div className="mb-6 space-y-4">
          <PostsGrid
            posts={posts}
            loading={loading}
            error={error}
            onDelete={deletePost}
            onToggleLike={toggleLike}
            onAddComment={addComment}
            onLoadComments={loadCommentsForPost}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
