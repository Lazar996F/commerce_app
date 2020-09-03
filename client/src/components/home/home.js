import React, { Component } from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Carousel,Image } from "react-bootstrap";
import moment from "moment";

class Home extends Component {
  render() {
    return (
      <Container>
        <Carousel>
          <Carousel.Item interval={1000}>
          <Image rounded />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
          <Image  rounded />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <Image  rounded />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default Home;
