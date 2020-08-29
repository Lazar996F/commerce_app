
import React, { Component } from 'react';
import { Row, Col, Image,ListGroup} from 'react-bootstrap'
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import image from '../../default.png';
import SwipeCore, { Navigation, Pagination } from 'swiper'

import { getItems, getTypes, setCart } from "../../store/actions/items";
import { connect } from "react-redux";




SwipeCore.use([Navigation, Pagination]);

class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      chosenType:0
    }
  }


  componentDidMount() {
    this.props.onGetItems()
    this.props.onGetTypes()
  }

  addToCart = (id, name, price) => {
    const { addedCart } = this.props;
    const newCart = addedCart;
    console.log("homaddToCartecart>", this.props.addedCart)
    let addedItem = { item_id: id, name: name, price: price };
    newCart.push(addedItem);
    this.props.onSetCart(newCart);
  }

  render() {
    
    return (
      <Row>
        <Col md={4} className="firstCol-padd">
          <h3 className="text-center mb-4">Category</h3>
          <ListGroup variant="flush" className="text-center border-0">
          {this.props.itemTypes.map( (type,index) => (
            <ListGroup.Item action variant="light" key={index} onClick={() => this.setState({chosenType:type.id})}>{type.type_name}</ListGroup.Item>
          ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          {this.props.itemTypes.map((type, index) => (
            <div key={index}>

              {this.state.chosenType===0 && <Swiper className="mt-5"
                spaceBetween={40}
                slidesPerView={3}
              >
                {this.props.items.map((item, index) => (
                    item.item_type_id === type.id &&
                  <SwiperSlide key={index} className="card">
                    <Image src={image} fluid thumbnail />
                    <p className="title-item mt-0 mb-3">{item.name}</p>
                    <p className="mb-0">Lorem ipsum dolor sit amet.</p>
                    <p class="number-font">$ {item.item_price}</p>
                    <button className="buttonX button5" onClick={() => this.addToCart(item.id, item.name, item.item_price)}>Add to Cart</button>
                  </SwiperSlide>
                ))}
              </Swiper>}
            </div>
          ))}

        <ListGroup className="form-padding">
          {this.props.items.map( (item, index) => (
            item.item_type_id === this.state.chosenType &&
            <ListGroup.Item key={index} className="border-top-0 border-right-0 border-left-0" >
              <Row>
                <Col md={2}>
                  <Image src={image} fluid className="pt-2"/>
                </Col>
                <Col md={7}>
                  <h2>{item.name}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Col>
                <Col md={3}>
                <p className="cart-fsize-padd">$ {item.item_price}</p>
                <button className="buttonX button5 mt-5" onClick={() => this.addToCart(item.id, item.name, item.item_price)}>Add to Cart</button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        

        </Col>

        <Col md={2} className="text-center">
        <button className="buttonX button5 mt-5" onClick={() => this.setState({chosenType:0})}>See all</button>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = (state) => ({
  items: state.items.itemsRedux,
  itemTypes: state.items.itemTypes,
  addedCart: state.items.addedToCart,
});

const mapDispatchToProps = (dispatch) => ({
  onGetItems: (payload) => dispatch(getItems(payload)),
  onGetTypes: (payload) => dispatch(getTypes(payload)),
  onSetCart: (payload) => dispatch(setCart(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
