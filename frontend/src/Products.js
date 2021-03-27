import React from 'react';
import './styles/products.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export let productParams = '1';
export let buyedProducts = []

class Products extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount () {
    this.getProducts ();
  }

  onBuy = () => toast.success('Product added to cart!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

  getProducts () {
    fetch ('http://localhost:5000/products/', {
      method: 'GET',
    })
      .then (response => response.json())
      .then (response => {
        this.setState ({
          products: response
        });
      })
      .catch (error => {
        console.error (error);
      });
  }

  render () {
    return (
      <div className="product--Screen">
        {this.state.products.map(product => {
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
                <img src={product.imageUrl} alt="product--Img"/>
              </div>
              <div className="product--Buttons">
                  <button className="about--Button" onClick={() => {productParams = product; this.props.history.push(`/details/:${product._id}`)}}>More Info</button>
                  <button className="buy--Button" onClick={() => {buyedProducts.push(product); this.onBuy()}}>Buy</button>
              </div>
            </div>
          );
        })}
        <ToastContainer />
      </div>
    );
  }
}

export default Products;
