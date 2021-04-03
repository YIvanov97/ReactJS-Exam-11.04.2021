import React from 'react'
import {productParams} from './Products';
import './styles/article.scss'

class ProductSchema extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: productParams
        }
    }

    render() {
        return (
            <div className="article--Screen">
                <div className="article--Container">
                    <div className="article--Info">
                        <h1 className="article--Title">{this.state.product.name}</h1>
                        <p className="article--DescriptionTitle">Description:</p>
                        <p className="article--Description">{this.state.product.description}</p>
                        <p className="article--PriceTitle">Price:</p>
                        <p className="article--Price">{this.state.product.price}$</p>
                    </div>
                    <img className="article--Image" src={this.state.product.imageUrl} alt="article"/>
                </div>
            </div>
        ) 
    }
}

export default ProductSchema;