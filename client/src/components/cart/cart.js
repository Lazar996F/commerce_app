
import React, { Component } from 'react';
import {Row,Col, Button, Image, ListGroup,Badge } from 'react-bootstrap'
import './cart.css';
import { connect } from 'react-redux';
import { setCart } from "../../store/actions/items";
import image from '../../default.png';



class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        message:'',
    }
  }


  totalPrice = () => {
    const { addedCart } = this.props
    let counter = 0;

    addedCart.map(x => {
      counter += x.price
    })

    return counter.toFixed(1);
  }


  removeFromCart = (DELid) => {
    const { addedCart } = this.props
    let removeIndex = addedCart.map(function (item) { return item.id }).indexOf(DELid);
    addedCart.splice(removeIndex, 1);
    this.props.onSetCart(addedCart);
  }


  async addSale() {
    const { addedCart } = this.props
    const items = addedCart.map(x => {
      return { item_id: x.item_id }
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, date_sold: new Date()})
    };

    const response = await fetch('/api/add/sale', requestOptions);
    const data = await response.json();

    if (data.status == 'success') {
      this.setState({ addedCart: [], message: 'Successfully' }, () => {
        setTimeout(() => {
          this.setState({ message: '' })
        }, 5000);
      })
    } else if (data.status == 'faild') {
      this.setState({ addedCart: [], message: 'Faild to add' })
    }
    this.props.onSetCart([]);
  };



  render() {

    return (
  <Row>
    {this.props.addedCart.length>0 ? (<Col md={8}>
    <ListGroup className="padd-custom">
          <h2 className="mt-5">Shopping Cart</h2>
          {this.props.addedCart.map( (additem, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={2}>
                  <Image src={image} fluid/>
                </Col>
                <Col md={5}>
                  <h2>{additem.name}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Col>
                <Col md={5}>
                <button onClick={() => this.removeFromCart(additem.id)} type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <p className="fontPrice">$ {additem.price}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div class="d-flex justify-content-end pr-3">
          <h4 className="mt-3">SUBTOTAL({this.props.addedCart.length} Items): $ {this.totalPrice()} </h4>
        </div>
        <span className="">{this.state.message}</span>
    </Col>) : (<h2 className="pl-5 pt-5">Shopping Cart is empty :(</h2>) }


    <Col md={4} className="text-center">
      mozda najprodavanije ovdje prikazati 
    </Col>
    
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  addedCart: state.items.addedToCart
});

const mapDispatchToProps = (dispatch) => ({
  onSetCart: (payload) => dispatch(setCart(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);


