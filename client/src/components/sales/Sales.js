
import React, { Component } from 'react';
import './sales.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Col, Button, Table, Row, Container,Dropdown,ButtonGroup } from 'react-bootstrap';
import moment from 'moment'


class Sales extends Component {

  constructor() {
    super();
    this.state = {
      sold: [],
    }
  }

  componentDidMount() {
    fetch('api/sold')
      .then(res => res.json())
      .then(sold => this.setState({ sold }, () => console.log('Items fetched..', sold)))
  }

  render() {
    return (
      <div>
        <h2 class="text-center pt-5 mt-5 mb-5">ALL SOLD ITEMS</h2>
        <Container className="mb-5">
          <Row>
            <Col><Button variant="info">Bestseller</Button></Col>
            <Col><Button variant="info">The most expensive, sold 3 or more times</Button></Col>
            <Dropdown as={ButtonGroup}>
              <Button variant="success">Not sold in :</Button>

              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">January</Dropdown.Item>
                <Dropdown.Item href="#/action-2">February</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Marth</Dropdown.Item>
                <Dropdown.Item href="#/action-4">April</Dropdown.Item>
                <Dropdown.Item href="#/action-5">May</Dropdown.Item>
                <Dropdown.Item href="#/action-6">June</Dropdown.Item>
                <Dropdown.Item href="#/action-7">July</Dropdown.Item>
                <Dropdown.Item href="#/action-8">August</Dropdown.Item>
                <Dropdown.Item href="#/action-9">September</Dropdown.Item>
                <Dropdown.Item href="#/action-10">October</Dropdown.Item>
                <Dropdown.Item href="#/action-11">November</Dropdown.Item>
                <Dropdown.Item href="#/action-12">December</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Container>


        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>ITEM TYPE</th>
              <th>PRICE</th>
              <th>DATE of SALE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sold.map((sold, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{sold.name}</td>
                <td>{sold.type_name}</td>
                <td>{sold.item_price}</td>
                <td>{sold.date_sold}</td>
              </tr>))}
          </tbody>
        </Table>
      </div>
    );
  }

}

export default Sales;
