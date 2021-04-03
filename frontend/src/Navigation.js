import React from 'react'
import { Link } from 'react-router-dom'
import './styles/navigation.scss'
import {user} from './globalParams'
import logo from './styles/images/horizontal_on_white_by_logaster.png'

function Navigation() {
    return (
          <div className="app--topNav--Container">
            <ul>
              <li>
                <img className="logo" src={logo} /> 
              </li>
              <li>
                <Link className="link" to="/home">Home</Link>
              </li>
              <li>
                <Link className="link" to="/products">Products</Link>
              </li>
              {!user ?
              <>
              <li>
                <Link className="link" to="/auth/register">Register</Link>
              </li>
              <li>
                <Link className="link" to="/auth/login">Login</Link>
              </li>
              </>
              :
              <>
              <li>
                <Link className="link" to="/auth/user">Profile</Link>
              </li>
              <li>
                <Link className="link" to="/cart">Cart</Link>
              </li>
              <li>
                <Link className="link" to="/auth/logout">Logout</Link>
              </li>
              </>
              }
              
            </ul>
        </div>
    )
}

export default Navigation;