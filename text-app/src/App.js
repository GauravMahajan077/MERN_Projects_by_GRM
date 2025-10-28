import React from 'react';
import Button from './components/Button';
import FetchButton from './components/FetchButton';  // ← Fix this
import './App.css';

function App() {
    const mockFetchData = async () => {
        return "Hello, World!";
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Testing React Components</h1>
                <Button label="Click Me" onClick={() => alert("Button Clicked!")} />
                <FetchButton fetchData={mockFetchData} />
            </header>
        </div>
    );
}

export default App;