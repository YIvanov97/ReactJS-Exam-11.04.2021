import React from 'react'
import './styles/login.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext, {API} from './globalParams'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    static contextType = UserContext

    onSuccess = () => toast.success('Login successfuly!', {
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

    onError = () => toast.error('Wrong Email or Password!', {
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
        .then(response => response.json())
        .then (response => {
            this.context.logIn(response.user)
            localStorage.setItem('user', JSON.stringify(response.user))
        })
        .catch (error => {
            console.error (error);
        });
    }

    handleLogin(e){
        e.preventDefault();

        let login = {
            email: this.state.email,
            password: this.state.password
        }

        if(login.email === '' || login.password === '') {
            this.onWarning()
            return;
        }

        fetch(`${API}/auth/login`,{
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
         })
         .then((response) => {
                 if(response.status === 200) {
                     this.onSuccess()
                     this.getUserData()
                     setTimeout(() => {
                         window.location = '/'
                     }, 1000)
                 } else if (response.status === 401) {
                     this.onError()
                 }
             })
             .catch((error) => {
                 console.log(error)
             })
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return(
            <div className="login--container">
                <h1 className="login--title">Login</h1>
                <form className="login--form" onSubmit={this.handleLogin}>
                    <input type="text" placeholder="Email" onChange={this.handleEmail} value={this.state.email}/>
                    <input type="password" placeholder="Password" onChange={this.handlePassword} value={this.state.password}/>
                    <input className="login--button" type="submit" value="Login" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default Login;