import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/guest/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthContextComponent, useAuth };
