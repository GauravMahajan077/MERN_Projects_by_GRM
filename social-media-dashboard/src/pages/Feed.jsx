import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'
import { usePosts } from '../hooks/usePosts.js'
import { setUsers } from '../store/index.js'

export default function Feed() {
  const { posts, loadMorePosts } = usePosts()
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch users if not already loaded
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => dispatch(setUsers(data)))

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMorePosts()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePosts])

  return (
    <div className="p-4">
      <PostForm />
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}