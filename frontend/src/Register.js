import React from 'react'
import './styles/register.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API} from './globalParams'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
        }

        this.handleName = this.handleName.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    onSuccess = () => toast.success('Successful register!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    onWarning = () => toast.warn('All fields are required!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    onPasswordWarning = () => toast.warn('Password must be at least 6 signs!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    getUserData() {
        fetch(`${API}/auth/user`, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
        .then (response => response.json())
        .then (response => {
            localStorage.setItem('email', JSON.stringify(response))
        })
        .catch (error => {
            console.log(error);
        });
    }

    handleRegister(e) {
        e.preventDefault()

        const registered = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        if(registered.name === '' || registered.username === '' || registered.email === '' || registered.password === '') {
            this.onWarning()
            return;
        }

        if(registered.password.length < 6) {
            this.onPasswordWarning()
            return;
        }

        fetch(`${API}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registered)
        })
        .then((response) => {
            if (response.status === 201) {
                this.onSuccess()
                this.getUserData()
                setTimeout(() => {
                    window.location = '/auth/login'
                }, 1000)
            }
        })
        .catch(error => console.log(error.response))
    }

    handleName(e){
        this.setState({name: e.target.value})
    }

    handleUsername(e){
        this.setState({username: e.target.value})
    }

    handleEmail(e){
        this.setState({email: e.target.value})
    }

    handlePassword(e){
        this.setState({password: e.target.value})
    }

    render() {
        return(
            <div className="register--container">
                <h1 className="register--title">Register</h1>
                <form className="register--form" onSubmit={this.handleRegister}>
                    <input type="text" placeholder="Name" onChange={this.handleName} value={this.state.name}/>
                    <input type="text" placeholder="Username" onChange={this.handleUsername} value={this.state.username}/>
                    <input type="text" placeholder="Email" onChange={this.handleEmail} value={this.state.email}/>
                    <input type="password" placeholder="Password" onChange={this.handlePassword} value={this.state.password}/>
                    <input className="register--button" type="submit" value="Register"/>
                </form>
                <div className="goToLogin--Container">
                    <h3>Already have account ?</h3>
                    <button onClick={() => this.props.history.push('/auth/login')}>Go to Login</button>
                </div>
                <ToastContainer />
            </div>     
        )
    }
} 

export default Register;