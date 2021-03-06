import './styles/app.scss';
import React from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArticlesData from './Article'

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      products: [],
    };

    this.handleProductName = this.handleProductName.bind (this);
    this.handleProductDescription = this.handleProductDescription.bind (this);
    this.handleProductImage = this.handleProductImage.bind (this);
    this.handleProductPrice = this.handleProductPrice.bind (this);
    this.createProduct = this.createProduct.bind (this);
    this.getProducts = this.getProducts.bind (this);
    this.onRemove = this.onRemove.bind (this);
  }

  onSuccess = () =>
    toast.success ('Product created successfuly!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onWarn = () =>
    toast.warn ('All fields are required!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onError = () =>
    toast.error ('Something went wrong!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onRemovedProduct = () =>
    toast.success ('Product removed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  createProduct (e) {
    e.preventDefault ();

    const product = {
      name: this.state.name,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      price: this.state.price,
    };

    if (
      product.name === '' ||
      product.description === '' ||
      product.imageUrl === ''
    ) {
      this.onWarn ();
      return;
    }

    fetch ('http://localhost:5000/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (product),
    })
      .then (response => {
        if (response.status === 201) {
          this.setState ({
            name: '',
            description: '',
            imageUrl: '',
            price: '',
          });
          this.onSuccess ();
        } else if (response.status === 500) {
          this.onError ();
        }
      })
      .then(() => this.getProducts())
      .catch (error => console.log (error.response));
  }

getProducts () {
    fetch ('http://localhost:5000/products/', {
      method: 'GET',
    })
      .then (response => response.json ())
      .then (response => {
        this.setState ({
          products: response,
        });
      })
      .catch (error => {
        console.error (error);
      });
  }

onRemove = (id) => {
    fetch(`http://localhost:5000/products/${id}/delete`, {
        method: 'POST'
    }).then(() => this.getProducts())
}

  componentDidMount() {
      this.getProducts();
  }

  handleProductName (e) {
    this.setState ({name: e.target.value});
  }

  handleProductDescription (e) {
    this.setState ({description: e.target.value});
  }

  handleProductImage (e) {
    this.setState ({imageUrl: e.target.value});
  }

  handleProductPrice (e) {
    this.setState ({price: e.target.value});
  }

  render () {
    return (
      <div className="App">
        <h1 className="employee--Title">Employee</h1>
        <h2 className="addProduct--Title">Add new product</h2>
        <form className="createProduct--form" onSubmit={this.createProduct}>
          <input
            type="text"
            placeholder="Product Name"
            onChange={this.handleProductName}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="Product Description"
            onChange={this.handleProductDescription}
            value={this.state.description}
          />
          <input
            type="text"
            placeholder="Product Image"
            onChange={this.handleProductImage}
            value={this.state.imageUrl}
          />
          <input
            type="text"
            placeholder="Product Price"
            onChange={this.handleProductPrice}
            value={this.state.price}
          />
          <input
            type="submit"
            value="Create"
            className="create--button"
          />
        </form>
        <div>
            <table className="added--Products">
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
              </tr>
              <ArticlesData products={this.state.products} remove={this.onRemove} notify={this.onRemovedProduct}/>
            </table>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
