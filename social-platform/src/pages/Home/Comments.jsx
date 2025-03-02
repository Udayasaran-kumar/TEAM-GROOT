import React from 'react';

const Comment = ({ comment, darkMode }) => {
  return (
    <div className={`p-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{comment.content}</p>
      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

const CommentSection = ({ 
  postId, 
  showComments, 
  comments, 
  commentText, 
  setCommentText, 
  handleAddComment,
  darkMode 
}) => {
  if (!showComments) return null;
  
  return (
    <div className={`mt-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-md p-3`}>
      <h4 className={`font-medium mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comments</h4>
      <div className="max-h-40 overflow-y-auto">
        {comments && comments.length > 0 ? (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} darkMode={darkMode} />
          ))
        ) : (
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2 text-sm`}>No comments yet</p>
        )}
      </div>
      
      <form onSubmit={(e) => handleAddComment(e, postId)} className="mt-3 flex">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={`flex-grow p-2 text-sm border ${
            darkMode 
              ? 'border-gray-600 bg-gray-800 text-gray-200 focus:ring-blue-600' 
              : 'border-gray-300 focus:ring-blue-500 text-gray-800'
          } rounded-l-md focus:outline-none focus:ring-1`}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700 text-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export { Comment, CommentSection };
