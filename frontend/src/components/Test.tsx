import React from 'react';
import { useUser } from './userContext'; // Import the custom hook

const Test: React.FC = () => {
    const { userId } = useUser();
    console.log("User ID:", userId);

    return (
        <div>
            {userId ? (
                <p>Welcome, User ID: {userId}</p>
            ) : (
                <p>You are browsing as a guest.</p>
            )}
        </div>
    );
};

export default Test;