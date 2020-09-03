import React, { Component } from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Carousel, Image, Navbar,Row,Col} from "react-bootstrap";
import moment from "moment";
import ImageComp from "./images/comp.png";
import Phone from "./images/fon.png";
import Mouse from "./images/mouseKey.png";
import SwiperCore, { Virtual } from 'swiper';



SwiperCore.use([Virtual]);

class Home extends Component {

  constructor() {
    super();
    this.state = {

    }
  }


  render() {

  
    return (
      <Container className="mt-5">

        <Row>
          <Col className="colHov zoom" md={4}>
          <img alt="computer" src={ImageComp} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Computers</div>
          </Col>
          <Col className="colHov zoom" md={4}>
          <img alt="computer" src={Phone} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Cell-phones</div>
          </Col>
          <Col className="colHov zoom" md={4}>
          <img alt="computer" src={Mouse} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Components</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
