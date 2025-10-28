// src/components/Post.jsx

import React from 'react';
import { useSelector } from 'react-redux';

function Post({ post }) {
  const users = useSelector((state) => state.users);
  const author = users?.find((user) => user.id === post.userId);

  return (
    <div className="bg-white border rounded-lg p-4 mb-4 text-left text-black dark:bg-gray-700 dark:text-white dark:border-gray-600">
      <div className="font-bold text-lg">
        {author ? author.name : `User ID: ${post.userId}`}
      </div>
      <p className="text-gray-500 text-sm mb-2">@{author ? author.username : 'unknown'}</p>
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p>{post.body}</p>
      {/* TODO: Add Like and Comment buttons here */}
    </div>
  );
}

export default Post;