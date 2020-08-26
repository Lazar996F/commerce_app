
import React, { Component } from 'react';
import { Container, Row, Col,Image} from 'react-bootstrap'
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import image from '../../default.png';
import SwipeCore, {Navigation, Pagination} from 'swiper'

import {getItems,getTypes,setCart} from "../../store/actions/items";
import { connect } from "react-redux";




SwipeCore.use([Navigation,Pagination]);

class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
 
    }
  }


  componentDidMount() {
      this.props.onGetItems()
      this.props.onGetTypes()
  }

  addToCart = (id, name, price) => {
    const { addedCart } = this.props;
    const newCart = addedCart;
    console.log("homaddToCartecart>",this.props.addedCart)
    let addedItem = { item_id: id, name: name, price: price };
    newCart.push(addedItem);

    this.props.onSetCart(newCart);

  }

  render() {
    const { addedCart } = this.props;
    console.log("homecart>",addedCart)

    return (
      <Container>
        {this.props.itemTypes.map( (type, index) =>(
          <div key={index}>
            <h1 className="text-center mt-5">{type.type_name}</h1>
          <Swiper className="mt-5"
          spaceBetween={40}
          slidesPerView={3} 
          >
          {this.props.items.map((item, index) =>(
            item.item_type_id===type.id &&
            <SwiperSlide key={index} className="card">
              <Image src={image} fluid thumbnail/>
                  <h2>{item.name}</h2>
                  <p class="price">$ {item.item_price}</p>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <p><button onClick={() => this.addToCart(item.id, item.name, item.item_price)}>Add to Cart</button></p>
            </SwiperSlide>
          ))}
          </Swiper>
          </div> 
        ))}
      </Container>
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
