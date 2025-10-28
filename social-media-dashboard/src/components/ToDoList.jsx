// src/components/ToDoList.jsx

import React, { useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [count, setCount] = useState(0);

  const addTask = () => {
    if (taskText) {
      setTasks([...tasks, taskText]);
      setTaskText('');
      setCount(count + 1);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50 text-black dark:bg-gray-700 dark:text-white dark:border-gray-600">
      <h4>User Goals (ToDo)</h4>
      <div className="flex mt-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add goal"
          className="border p-1 text-black flex-grow dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <button onClick={addTask} className="bg-green-500 text-white p-1 ml-2 rounded">Add</button>
      </div>
      <ul className="text-left mt-2 list-disc list-inside">
        {tasks.map((task, i) => <li key={i}>{task}</li>)}
      </ul>
      <p className="mt-2">Tasks added: {count}</p>
    </div>
  );
}