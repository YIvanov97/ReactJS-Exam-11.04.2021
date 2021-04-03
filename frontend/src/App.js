import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './styles/App.scss'
import Authenticated from './Authenticated'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Products from './Products'
import ProductSchema from './Product'
import Cart from './Cart'
import Footer from './Footer'
import Profile from './Profile'
import Navigation from './Navigation'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Authenticated>
          <Navigation/>
        </Authenticated>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <Redirect to='/home' />
              )
            }} />
            <Route exact path="/auth/logout" render={() => {localStorage.clear(); window.location = '/'}}/>
            <Route exact path="/home" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/user" component={Profile} />
            <Route exact path="/details/:id" component={ProductSchema} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
