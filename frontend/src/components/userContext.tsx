import React, { createContext, useContext, useState } from 'react';

// Define the shape of the user context
interface UserContextType {
    userId: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    address: string | null;
    phoneNum: string | null;
    role: string | null;
    setUserId: (id: string | null) => void;
    setName: (name: string | null) => void;
    setemail: (email: string | null) => void;
    setpassword: (password: string | null) => void;
    setAddress: (address: string | null) => void;
    setPhoneNum: (phoneNum: string | null) => void;
    setRole: (role: string | null) => void;
}

// Create a context with default values
const UserContext = createContext<UserContextType>({
    userId: null,
    name: null,
    email: null,
    password: null,
    address: null,
    phoneNum: null,
    role: null,
    setUserId: () => {},
    setName: () => {},
    setemail: () => {},
    setpassword: () => {},
    setAddress: () => {},
    setPhoneNum: () => {},
    setRole: () => {},
});

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [email, setemail] = useState<string | null>(null);
    const [password, setpassword] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [phoneNum, setPhoneNum] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ userId, name, email, password, address, phoneNum, role, setUserId, setName, setemail, setpassword, setAddress, setPhoneNum, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);