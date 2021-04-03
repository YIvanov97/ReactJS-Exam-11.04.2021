import React from 'react';
import './styles/home.scss';
import UserContext, {user, API} from './globalParams'
import ScrollMenu from 'react-horizontal-scrolling-menu';

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
        this.setState ({products: response});
      })
      .catch (error => {
        console.error (error);
      });
  }

  render () {
    const data = this.state.products.map(product => {
      return (
        <div className="products--Container">
            <div className="products--Info">
              <h1>{product.name}</h1>
              <div className="products--Description">
                <p className="description--Title">Description:</p>
                <p>{product.description}</p>
              </div>
            </div>
            <img className="products--Image" src={product.imageUrl} alt="products--Img" />
        </div>
      );
    })
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
        <h1 className="home--Header">NeWaN Technology</h1>
        <div className="homeProducts--Container">
          <ScrollMenu 
            dragging={true}
            wheel={false}
            transition={0.4}
            translate={'5px'}
            wrapperStyle={{overflow: 'hidden', userSelect: 'none'}}
            itemStyle={{outline: 'none'}}
            data={this.state.products.map(product => {
              return (
                <div className="products--Container">
                    <div className="products--Info">
                      <h1>{product.name}</h1>
                      <div className="products--Description">
                        <p className="description--Title">Description:</p>
                        <p>{product.description}</p>
                      </div>
                    </div>
                    <img className="products--Image" src={product.imageUrl} alt="products--Img" />
                    <div className="product--Price">
                      <p className="price--Title">Price:</p>
                      <p>{product.price}$</p>
                    </div>
                </div>
              );
            })}/>
        </div>
        <div className="companyDescription--Container">
            
        </div>
      </div>
    );
  }
}

export default Home;
