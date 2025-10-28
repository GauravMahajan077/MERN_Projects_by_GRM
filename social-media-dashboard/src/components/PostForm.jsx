// src/components/PostForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/index.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isValid = title.length > 5 && body.length > 10;

  const handleSubmit = (e) => {
  e.preventDefault()
  if (isValid) {
    dispatch(addPost({ id: Date.now(), title, body, userId: 1 })) // Use numeric userId (e.g., 1)
    setTitle('')
    setBody('')
  }
}
  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (must be > 5 chars)"
        className="border p-2 mb-2 w-full text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind? (must be > 10 chars)"
        className="border p-2 w-full text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <button type="submit" disabled={!isValid} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 w-full">
        Post
      </button>
    </form>
  );
}