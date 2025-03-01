import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="p-2 border-b border-gray-200">
      <p className="text-gray-800">{comment.content}</p>
      <span className="text-xs text-gray-500">
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
  handleAddComment 
}) => {
  if (!showComments) return null;
  
  return (
    <div className="mt-3 bg-gray-50 rounded-md p-3">
      <h4 className="font-medium mb-2 text-sm text-gray-600">Comments</h4>
      <div className="max-h-40 overflow-y-auto">
        {comments && comments.length > 0 ? (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-2 text-sm">No comments yet</p>
        )}
      </div>
      
      <form onSubmit={(e) => handleAddComment(e, postId)} className="mt-3 flex">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-grow p-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
