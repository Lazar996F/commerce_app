
import React, { Component } from 'react';
import './items.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap'


class Items extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      sold: [],
      addSale: [],
      addedCart: [],
      itemTypes: [],
      message: '',
      newPrice: 0,
      typeValue: 0,
      typeName: '',
    }
  }

  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(items => this.setState({ items }, () => console.log('Items fetched..', items)))
    fetch('api/sold')
      .then(res => res.json())
      .then(sold => this.setState({ sold }, () => console.log('Items fetched..', sold)))
      fetch('api/types')
      .then(res => res.json())
      .then(itemTypes => this.setState({ itemTypes }, () => console.log('Item types fetched..', itemTypes)))
  }

  addToCart = (id, name, price) => {
    let { addedCart } = this.state;
    let addedItem = { item_id: id, name: name, price: price };
    addedCart.push(addedItem);
    this.setState({ addedCart });
  }

  removeFromCart = (DELid) => {
    const { addedCart } = this.state
    let removeIndex = addedCart.map(function (item) { return item.id }).indexOf(DELid);
    addedCart.splice(removeIndex, 1);
    this.setState({ addedCart });
  }

  totalPrice = () => {
    const { addedCart } = this.state
    let counter = 0;

    addedCart.map(x => {
      counter += x.price
    })
    return counter.toFixed(1);
  }

  async addSale() {
    const { addedCart } = this.state
    const items = addedCart.map(x => {
      return { item_id: x.item_id }
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, date_sold: new Date() })
    };

    const response = await fetch('/api/add/sale', requestOptions);
    const data = await response.json();

    if (data.status == 'success') {
      this.setState({ addedCart: [], message: 'Successfully' }, () => {
        setTimeout(() => {
          this.setState({ message:''})
        }, 5000);
      })
    } else if (data.status == 'faild') {
      this.setState({ addedCart: [], message:'Faild to add'})
    }
  };

  render() {
    
    return (
      <div>
        <h2 className="text-center mt-5 pt-5 mb-5">ALL ITEMS FOR SALE</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>ITEM TYPE</th>
              <th>PRICE $</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.
                  type_name}</td>
                <td>{item.item_price}</td>
                <td>
                  <Button onClick={() => this.addToCart(item.id, item.name, item.item_price)}>Add to Cart</Button>
                </td>
              </tr>))}
          </tbody>
        </Table>
        <h4 className="mt-5 pl-5 mb-3">CART</h4>
        <Table className="w-50">
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.addedCart.map((additem, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{additem.name}</td>
                <td>{additem.price}</td>
                <td><button onClick={() => this.removeFromCart(additem.id)} type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button></td>
              </tr>))}
          </tbody>
        </Table>
        <div class="d-flex justify-content-between totalPadding">
          <Button onClick={() => this.addSale()} className="ml-5 mt-3 mb-5">SUBMIT</Button>
          <h4 className="mt-3">TOTAL: {this.totalPrice()} $</h4>
        </div>
        <p className="ml-5">{this.state.message}</p>

      </div>
    );
  }
}

export default Items;
