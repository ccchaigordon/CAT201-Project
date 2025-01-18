import React, { createContext, useContext, useState } from 'react';

// Define the shape of the user context
interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
}

// Create a context with default values
const UserContext = createContext<UserContextType>({
    userId: null,
    setUserId: () => {},
});

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);