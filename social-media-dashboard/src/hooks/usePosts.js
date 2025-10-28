// src/hooks/usePosts.js

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, addPosts } from '../store/index.js';

const hinglishPosts = [
  { id: 1, title: 'Bhai ek baar try karo', body: 'Yeh post bada mast hai, sabko pasand aayega yaar!' },
  { id: 2, title: 'Chalo thoda fun karte hai', body: 'Aaj mood hai party ka, koi plan hai kya bhai?' },
  { id: 3, title: 'India rocks!', body: 'Desh ka swag hai yeh, sabko proud feel hota hai!' },
  { id: 4, title: 'Kya baat hai', body: 'Bhai tune toh dil jeet liya, awesome post hai!' },
  { id: 5, title: 'Bollywood vibes', body: 'Ek song suno yaar, life mein thoda masti daalo!' },
  { id: 6, title: 'Chai pe charcha', body: 'Subah ki chai ke saath yeh post perfect hai bhai!' },
  { id: 7, title: 'Dosti forever', body: 'Bhai dosti ka ek naya level unlock kar diya!' },
  { id: 8, title: 'Desi swag on', body: 'Kurta pehen ke swag mein rehna hai yaar!' },
];

export const usePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);

  // Use mock Hinglish data instead of API fetch
  useEffect(() => {
    dispatch(setPosts(hinglishPosts.map((p) => ({ ...p, likes: 0, comments: [] }))));
  }, [dispatch]);

  const loadMorePosts = useCallback(() => {
    const nextPage = page + 1;
    // Simulate more posts by cycling through the array
    const additionalPosts = hinglishPosts.slice((nextPage - 1) * 5, nextPage * 5).map((p, i) => ({
      ...p,
      id: p.id + (nextPage * 10), // Unique IDs for new posts
      likes: 0,
      comments: [],
    }));
    if (additionalPosts.length > 0) {
      dispatch(addPosts(additionalPosts));
      setPage(nextPage);
    }
  }, [page, dispatch]);

  return { posts, loadMorePosts };
};