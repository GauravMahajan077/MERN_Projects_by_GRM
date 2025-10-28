// src/pages/Profile.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../store/index.js';
import ProfileCard from '../components/ProfileCard.jsx';
import ToDoList from '../components/ToDoList.jsx';

export default function Profile() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // Users already fetched in Feed
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2>Profile</h2>
      <ToDoList />
      <h3>Users to Follow</h3>
      <div className="grid grid-cols-3 gap-4">  {/* Changed to grid-cols-3 for better layout, adjust as needed */}
        {users.map((user) => (
          <div key={user.id}>
            <ProfileCard user={user} />
            <button
              onClick={() => dispatch(followUser(user.id))}
              className="bg-blue-500 text-white p-1 w-full mt-2 rounded disabled:opacity-50"
              disabled={user.followed}
            >
              {user.followed ? 'Followed' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}