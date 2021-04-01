import React from 'react';
import './styles/home.scss';
import {user, API} from './globalParams'

class Home extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      products: [],
      user: user
    };
    this.getProducts = this.getProducts.bind (this);
  }

  componentDidMount () {
    this.getProducts ();
  }

  getProducts () {
    fetch (`${API}/products/`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
      .then (response => response.json ())
      .then (response => {
        console.log (response);
        this.setState ({products: response});
      })
      .catch (error => {
        console.error (error);
      });
  }

  render () {
    return (
      <div className="home--Container">
        <div className="loggedInUser--Container">
        {!this.state.user ? <></> :
          <>
            <h3>Welcome:</h3>
            <p>{this.state.user.email}</p>
          </>
        }
        </div>
        <h1 className="home--Header">NeWmaN Technology</h1>
        <div>
          {this.state.products.map (product => {
            return (
              <div className="product--Container">
                <div className="product--AboutContainer">
                  <div className="product--Info">
                    <h1>{product.name}</h1>
                    <div className="product--Description">
                      <p className="description--Title">Description:</p>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <img src={product.imageUrl} alt="product--Img" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
