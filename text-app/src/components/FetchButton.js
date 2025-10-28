// src/components/FetchButton.js
import React, { useState } from 'react';

function FetchButton({ fetchData }) {
    const [data, setData] = useState(null);

    const handleClick = async () => {
        const result = await fetchData();
        setData(result);
    };

    return (
        <div>
            <button onClick={handleClick}>Fetch Data</button>
            {data && <p>{data}</p>}
        </div>
    );
}

export default FetchButton;