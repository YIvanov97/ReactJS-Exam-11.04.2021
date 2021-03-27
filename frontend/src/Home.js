import React from 'react';
import './styles/home.scss';

class Home extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      products: [],
    };
    this.getProducts = this.getProducts.bind (this);
  }

  componentDidMount () {
    this.getProducts ();
  }

  getProducts () {
    fetch ('http://localhost:5000/products/', {
      method: 'GET',
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
        <h1 className="home--Header">X - Technology</h1>
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
