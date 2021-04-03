import React from 'react'

const UserContext = React.createContext({
    loggedIn: false,
    user: null,
    logIn: () => {},
    logOut: () => {}
})

export default UserContext;

export let API = 'http://localhost:5000';
export let user = JSON.parse(localStorage.getItem('user'));

