// src/components/ProfileCard.jsx

import React from 'react';

export default function ProfileCard({ user }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-black dark:text-gray-200">
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Email: {user.email}</p>
    </div>
  );
}