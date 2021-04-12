import React from 'react'
import UserContext from './globalParams'

class Authenticated extends React.Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            user: {}
        }
    }

    logIn = (user) => {
        this.setState({
            loggedIn: true,
            user: user
        })
    }

    logOut = () => {
        this.setState({
            loggedIn: false,
            user:{}
        })
    }

    render() {
        const {
            loggedIn,
            user
        } = this.state
        return (
            <UserContext.Provider value={{
                loggedIn,
                user,
                logIn: this.logIn,
                logOut: this.logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default Authenticated;