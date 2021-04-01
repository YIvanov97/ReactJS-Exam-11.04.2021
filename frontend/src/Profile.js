import React from 'react'
import './styles/profile.scss'
import {API} from './globalParams'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }

        this.getUserData = this.getUserData.bind(this)
    }

    getUserData() {
        fetch(`${API}/auth/user`, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
        .then (response => response.json())
        .then (response => {
            this.setState ({
                user: response
            })
            console.log(this.state.user)
        })
        .catch (error => {
            console.error (error);
        });
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <button onClick={this.getUserData}>click</button>
                <div className="user--name">
                {this.state.user?.email}
                </div>
            </div>
        )
    }
}

export default Profile;