import React from 'react'
import {buyedProducts} from './Products'
import './styles/cart.scss'

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state={
            products: buyedProducts,
            total: 0
        }
    }
    
    render(){
        return(
            <div className="cart--Container">
            <div>
                {this.state.products.length === 0 ? <div className="emptyCart">Cart is empty!</div> : this.state.products.map(product => {
                    this.state.total += product.price
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
                        <button className="removeFromCart" onClick={() => {this.state.products.splice(product, 1)}}>Remove</button>
                      </div>
                    );
                })}
                </div>
                {this.state.products.length === 0 ? <></> :
                <div className="totalPrice--Container">
                    <h2 className="totalPrice--Title">Total Price:</h2>
                    <p className="total--Price">{this.state.total}$</p>
                </div>
                }
            </div>
        ) 
    }
}

export default Cart;