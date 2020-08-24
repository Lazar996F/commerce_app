
import React, { Component } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

class Home extends Component {


  constructor() {
    super();
    this.state = {
      items: [],
      itemTypes:[],
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

  render() {

    return (
      <Container fluid>

        {this.state.itemTypes.map( type =>(

          <div>
            <h1 className="text-center mt-5">{type.type_name}</h1>
          <Swiper className="mt-5"
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          >

          {this.state.items.map(item =>(
            item.item_type_id===type.id &&
            <SwiperSlide className="card">
                  <h1>{item.name}</h1>
                  <p class="price">$ {item.item_price}</p>
                  <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
                  <p><button>Add to Cart</button></p>
            </SwiperSlide>
          ))}
          </Swiper>
          </div>
        ))}


      </Container>






          //     {this.state.items.map((item, index) => (
          //       <tr>
          //   <td>{index + 1}</td>
          //   <td>{item.name}</td>
          //   <td>{item.
          //     type_name}</td>
          //   <td>{item.item_price}</td>
          //   <td>
          //     <Button onClick={() => this.addToCart(item.id, item.name, item.item_price)}>Add to Cart</Button>
          //    </td>
          // </tr>))}

        );
    }
}

export default Home;
