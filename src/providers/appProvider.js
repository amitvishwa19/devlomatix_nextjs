import Cookies from 'js-cookie';
import { useState, createContext } from 'react';

const AppContext = createContext({
    email:'',
    isLoggedIn: false,
    userID: '',
    setEmail: () => {},
    setIsLoggedIn: () => {},
    setUserID: () => {},
});

const AppContextProvider = (props) => {
    const [ email, setEmail ] = useState(Cookies.get('email') || null);
    const [ userID, setUserID ] = useState(Cookies.get('uid') || null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(Cookies.get('isLoggedIn') ? true : false);

    return (
        <AppContext.Provider value={{ email, setEmail, isLoggedIn, setIsLoggedIn, userID, setUserID }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
