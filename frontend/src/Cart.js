import React, {useEffect, useState} from 'react'
import './styles/cart.scss'
import {user} from './globalParams'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = props => {

    const [products, addedProducts] = useState([])

    useEffect(() => {
        return addedProducts(user.cart)
    }, [])

    const onRemove = () => toast.error('Product removed from cart!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const handleRemove = () => {
        onRemove();
        const timer = setTimeout(() => {
            props.history.push('/cart')
        }, 500)
        return () => clearTimeout(timer)
    }

        return(
            <div className="cart--Container">
            <div>
                {products.length === 0 ? <div className="emptyCart">Cart is empty!</div> : products.map(product => {
                    return (
                      <div className="product--Container">
                        <div className="product--AboutContainer">
                          <div className="product--Info">
                            <h1>{product.name}</h1>
                              <div className="product--Description">
                                  <p className="description--Title">Description:</p>
                                  <p>{product.description}</p>
                                  <h3>Price:</h3>
                                  <p>{product.price}$</p>
                              </div>
                          </div>
                          <img src={product.imageUrl} alt="product--Img"/>
                        </div>
                        <span className="removeFromCart--Container" onClick={() => {products.splice(product, 1); handleRemove()}}>
                            <FaTrashAlt className="removeFromCart--Icon" />
                        </span>
                      </div>
                    );
                })}
                </div>
                <ToastContainer />
            </div>
        ) 
    }


export default Cart;