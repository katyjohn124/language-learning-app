import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // When the app loads, check for an existing token
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            // Check if token is expired
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(decodedToken);
            } else {
                localStorage.removeItem('token'); // Clear expired token
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
