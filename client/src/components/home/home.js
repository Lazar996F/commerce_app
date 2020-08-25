
import React, { Component } from 'react';
import { Container, Row, Col,Image} from 'react-bootstrap'
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import image from '../../default.png';
import SwipeCore, {Navigation, Pagination} from 'swiper'






SwipeCore.use([Navigation,Pagination]);

class Home extends Component {


  constructor() {
    super();
    this.state = {
      items: [],
      itemTypes:[],
      addedCart: [],
    }
  }


  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(items => this.setState({ items }, () => console.log('Items fetched..', items)))
      fetch('api/types')
      .then(res => res.json())
      .then(itemTypes => this.setState({ itemTypes }, () => console.log('Item types fetched..', itemTypes)))
  }

  addToCart = (id, name, price) => {
    const { addedCart } = this.state;
    let addedItem = { item_id: id, name: name, price: price };
    addedCart.push(addedItem);
    this.setState({addedCart});
  }


  render() {

    return (
      <Container>
        {this.state.itemTypes.map( type =>(
          <div>
            <h1 className="text-center mt-5">{type.type_name}</h1>
          <Swiper className="mt-5"
          spaceBetween={40}
          slidesPerView={3} 
          >
          {this.state.items.map(item =>(
            item.item_type_id===type.id &&
            <SwiperSlide className="card">
              <Image src={image} fluid thumbnail/>
                  <h2>{item.name}</h2>
                  <p class="price">$ {item.item_price}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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

export default Home;
