import React from 'react'
import { Link } from 'react-router-dom'
import './styles/navigation.scss';

function Navigation() {
    return (
        <>
        <nav className="app--topNav--Container">
          <ul>
            <li>
              <Link className="link" to="/home">Home</Link>
            </li>
            <li>
              <Link className="link" to="/products">Products</Link>
            </li>
            <li>
              <Link className="link" to="/auth/register">Register</Link>
            </li>
            <li>
              <Link className="link" to="/auth/login">Login</Link>
            </li>
            <li>
              <Link className="link" to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
        </>
    )
}

export default Navigation;