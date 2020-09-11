
import React, { Component } from 'react';
import {Row,Col, Button, Image, ListGroup,Badge,Form,Container,Alert } from 'react-bootstrap'
import './cart.css';
import { connect } from 'react-redux';
import { setCart } from "../../store/actions/items";
import image from '../../default.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        message:'',
        isSuccess:false
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
      this.setState({ addedCart: [], message: 'Successfully added item',isSuccess:true}, () => {
        setTimeout(() => {
          this.setState({ message: '' })
        }, 5000);
      })
    } else if (data.status == 'faild') {
      this.setState({ addedCart: [], message: 'Faild to add',isSuccess:false })
    }
    this.props.onSetCart([]);
  };



  render() {

    return (
      <Container fluid>
  <Row>
    {this.props.addedCart.length>0 ? (<Col md={8}>
    <ListGroup className="padd-custom border-0">
          <h2 className="mt-5">Your Cart</h2>
          {this.props.addedCart.map( (additem, index) => (
            <ListGroup.Item key={index} >
              <Row>
                <Col md={3}>
                  <Image src={additem.picture} fluid/>
                </Col>
                <Col md={4}>
                  <h3>{additem.name}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Col>
                <Col md={2}>
                <button onClick={() => this.removeFromCart(additem.id)} type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <p className="fontPrice">$ {additem.price}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <span className="">{this.state.message}</span>
    </Col>) : (<h3 className="pl-5 pt-5">Cart is empty</h3>)}
    {this.props.addedCart.length>0 && <Col md={4} className="text-center pt-5">
          <h4 className="mt-2 mb-5">SUBTOTAL({this.props.addedCart.length} Items): $ {this.totalPrice()} </h4>
    <Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Your Name</Form.Label>
    <Form.Control type="name" placeholder="your name" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Adress</Form.Label>
    <Form.Control type="adress" placeholder="adress" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Number</Form.Label>
    <Form.Control type="number" placeholder="phone number" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Notes</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
</Form>
<button type="button" className="btn btn-secondary mb-5" onClick={()=> this.addSale()}>Order</button>
    </Col>}
      </Row>
      {this.state.isSuccess && <Alert variant='success' className="w-25">
      <p>{this.state.message}</p>
  </Alert>}
  {!this.state.isSuccess && this.props.addedCart.lenght>0 && <Alert variant='danger' className="w-25">
  <p>{this.state.message}</p>
  </Alert>}
      </Container>
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


