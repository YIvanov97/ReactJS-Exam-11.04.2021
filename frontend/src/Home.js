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
        {this.state.products.lenght === 0 ? <></>
        :
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
        }
        </div>
        <div className="companyDescription--Container">
            <h2>About us:</h2>
            <p>NeWaN is a leading Apple Premium Reseller in Central and Eastern Europe. Through its 22 stores and online stores, NeWaN offers a full range of Macs, iPads, iPods and iPhones, as well as a large but carefully selected range of accessories and software.</p>
            <p>NeWaN Bulgaria has been on the market since 2007 and has established itself as a leading supplier of APPLE products in the country. In our stores, we offer you the opportunity to test the latest Apple products and accessories, the opportunity for discounts for students, teachers and educational institutions, as well as funding. Whether you're a professional who wants to do more with your Mac or a student looking for the latest accessory for their iPhone, trained staff will serve you and offer you a complete solution.</p>
        </div>
      </div>
    );
  }
}

export default Home;
