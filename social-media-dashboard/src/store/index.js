import { createStore } from 'redux';

// --- Action Creators ---
// These are helper functions to create action objects
export const setUsers = (users) => ({ type: 'setUsers', payload: users });
export const setPosts = (posts) => ({ type: 'setPosts', payload: posts });
export const addPost = (post) => ({ type: 'addPost', payload: post });
// Action creator for infinite scroll
export const addPosts = (posts) => ({ type: 'addPosts', payload: posts });
export const followUser = (userId) => ({ type: 'followUser', payload: userId });

// --- Initial State ---
// The default state of your application
const initialState = {
  posts: [],
  users: []
};

// --- The Reducer Function ---
// This function calculates the next state based on the action
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        users: action.payload.map(user => ({ ...user, followed: false })) // Add followed: false
      };
    case 'setPosts':
      return {
        ...state,
        posts: action.payload
      };
    case 'addPost':
      return {
        ...state,
        posts: [action.payload, ...state.posts] // Adds a single new post to the top
      };
    // 👇 Add your new case here, inside the switch statement
    case 'addPosts':
      return {
        ...state,
        // Add new posts from infinite scroll, filtering out any potential duplicates
        posts: [...state.posts, ...action.payload.filter(p => !state.posts.some(sp => sp.id === p.id))]
      };
    case 'followUser':
      return {
        ...state,
        users: state.users.map(user => user.id === action.payload ? { ...user, followed: true } : user)
      };
    default:
      return state; // IMPORTANT: Always have a default case
  }
};

// --- The Store ---
// This holds the global state for your app
const store = createStore(rootReducer);

export default store;