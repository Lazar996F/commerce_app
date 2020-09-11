import React, { Component } from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Carousel, Image, Navbar,Row,Col,Button} from "react-bootstrap";
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

        <Row >
          <Col className="colHov zoom" md={4}>
          <a href="./shop">
          <img alt="computer" src={ImageComp} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Computers</div>
          </a>
          </Col>
          <Col className="colHov zoom" md={4}>
          <a href="./shop">
          <img alt="computer" src={Phone} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Cell-phones</div>
          </a>
          </Col>
          <Col className="colHov zoom" md={4}>
          <a href="./shop">
          <img alt="computer" src={Mouse} width="100" height="100" className="d-inline-block align-top" />
          <div class="overlay">Components</div>
          </a>
          </Col>
        </Row>

        <div>
        <h2>Register</h2>
        <input placeholder="username"/>
        <input placeholder="password"/>
        <button>Submit</button>
        </div>
        <div>
        <h2>Login</h2>
        <input placeholder="username"/>
        <input placeholder="password"/>
        <button>Submit</button>
        </div>
        <div>
        <h2>Get user</h2>
        <button>Submit</button>
        </div>
        

      </Container>
    );
  }
}

export default Home;
