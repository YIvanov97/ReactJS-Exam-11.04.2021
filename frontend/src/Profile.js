import React from 'react'
import './styles/profile.scss'
import {user} from './globalParams'
import profilePicture from './styles/images/blank-profile-picture-973460_640.png'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: user
        }
    }

    render() {
        return (
            <div className="profile--Container">
                <img className="profile--Picture" src={profilePicture} />
                <div className="userInfo--Container">
                    <div className="user--Name--Container">
                        <h3>Name: </h3>
                        <p>{this.state.user.name}</p>
                    </div>
                    <div className="user--userName--Container">
                        <h3>Username: </h3>
                        <p>{this.state.user.username}</p>
                    </div>
                    <div className="user--Email--Container">
                        <h3>Email: </h3>
                        <p>{this.state.user.email}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;