import React, { useEffect, useState } from 'react';
import './styles/products.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {user, API} from './globalParams'

export let productParams = '';

const Products = props => {

  const [products, loadedProducts] = useState([])

  const onBuy = () => toast.success('Product added to cart!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => { 
    fetch (`${API}/products/`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
      .then (response => response.json())
      .then (response => {
        loadedProducts(response)
      })
      .catch (error => {
        console.error (error);
      });
  },[])

    return (
      <div className="product--Screen">
        {products.lenght === 0 ? <div className="noAvailable">No available products!</div>
        :
        <>
        {products.map(product => {
          return (
            <div className="products--Container">
              <div className="product--AboutContainer">
                <div className="product--Info">
                  <h1>{product.name}</h1>
                    <div className="product--Price">
                      <p className="price--Title">Price:</p>
                      <p>{product.price}$</p>
                    </div>
                </div>
                <img src={product.imageUrl} alt="product--Img"/>
              </div>
              <div className="product--Buttons">
                  {!user ? 
                  <button className="about--Button" onClick={() => {productParams = product; props.history.push(`/details/:${product._id}`)}}>More Info</button> 
                  :
                  <>
                    <button className="about--Button" onClick={() => {productParams = product; props.history.push(`/details/:${product._id}`)}}>More Info</button>
                    <button className="buy--Button" onClick={() => {user.cart.push(product); onBuy()}}>Buy</button>
                  </>
                  }
                  
              </div>
            </div>
          );
        })}
        </>
        }
        <ToastContainer />
      </div>
    );
  }

export default Products;
