
import React, { Component } from 'react';
import './sales.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Col, Button, Table, Row, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';


class Sales extends Component {

  constructor() {
    super();
    this.state = {
      sold: [],
      bestSeller: [],
      mostExpensive: [],
      monthNotSold: [],
      isAll: false,
      isBS: false,
      isME: false,
      isMonth: false,
      selectedMonth: 0
    }
  }

  componentDidMount() {
    fetch('api/sold')
      .then(res => res.json())
      .then(sold => this.setState({ sold }, () => console.log('Items fetched..', sold)))
    fetch('api/sold/bs')
      .then(res => res.json())
      .then(bestSeller => this.setState({ bestSeller }, () => console.log('Bestseller items fetched...', bestSeller)))
    fetch('api/sold/3x')
      .then(res => res.json())
      .then(mostExpensive => this.setState({ mostExpensive }, () => console.log('Most expensive items fetched...', mostExpensive)))
  }



  setMonth() {
    this.setState({ isMonth: true, isBS: false, isME: false, isAll: false })
    fetch(`api/sold/${this.state.selectedMonth}`)
      .then(res => res.json())
      .then(monthNotSold => this.setState({ monthNotSold }, () => console.log('Month not sold items fetched...', monthNotSold)))
  }

  render() {

    return (
      <Container>
        {/* <Button onClick={() => this.setState({ isBS:false, isME:false ,isAll:true})} variant="info" size="lg" className="main-btn">
          List of sales records
        </Button> */}
        
        {/* <Container className="mb-5">
          <Row>
            <Col><Button onClick={() => this.setState({ isBS: true, isME: false,isAll:false,isMonth:false})} variant="info">Bestseller</Button></Col>
            <Col><Button onClick={() => this.setState({ isME: true, isBS: false,isAll:false,isMonth:false })} variant="info">The most expensive, sold 3 or more times</Button></Col>
            <Dropdown  onSelect={(e)=> this.setState({selectedMonth:e})}>
              <Button onClick={() => this.setMonth()} variant="success">Not sold in :(chose month and click)</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item  eventKey={1}>January</Dropdown.Item>
                <Dropdown.Item  eventKey={2} >February</Dropdown.Item>
                <Dropdown.Item  eventKey={3}>Marth</Dropdown.Item>
                <Dropdown.Item  eventKey={4}>April</Dropdown.Item>
                <Dropdown.Item  eventKey={5}>May</Dropdown.Item>
                <Dropdown.Item  eventKey={6}>June</Dropdown.Item>
                <Dropdown.Item  eventKey={7}>July</Dropdown.Item>
                <Dropdown.Item  eventKey={8}>August</Dropdown.Item>
                <Dropdown.Item  eventKey={9}>September</Dropdown.Item>
                <Dropdown.Item  eventKey={10}>October</Dropdown.Item>
                <Dropdown.Item  eventKey={11}>November</Dropdown.Item>
                <Dropdown.Item  eventKey={12}>December</Dropdown.Item>
              </Dropdown.Menu>
              
            </Dropdown>
          </Row>
        </Container> */}

        {/* ALL SOLD items */}

        <Row className="p-5 text-center">
          <Col md={4}>
            <Button variant="outline-dark" className="butt">See all</Button>
          </Col>
          <Col md={4}>
            <Button variant="outline-dark" className="butt">Bestseller</Button>
          </Col>
          <Col md={4}>
            <Button variant="outline-dark" className="butt">the most expensive</Button>
          </Col>
        </Row>

      
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>ITEM TYPE</th>
              <th>PRICE</th>
              <th>Sell date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sold.map((sold, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{sold.name}</td>
                <td>{sold.type_name}</td>
                <td>$ {sold.item_price}</td>
                <td>{moment(sold.date_sold).format('MMMM Do YYYY')}</td>
              </tr>))}
          </tbody>
        </Table>
     




        {/* BESTSELLER
        {this.state.isBS && (<Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>Bestseller</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bestSeller.map((bs, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{bs.name}</td>
                <td>{bs.item_price} $</td>
                <td>{bs.bs}</td>
              </tr>))}
          </tbody>
        </Table>)} */}

        {/* MOST EXPENSIVE solde 3>x
        {this.state.isME && (<Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>Sales counter</th>
            </tr>
          </thead>
          <tbody>
            {this.state.mostExpensive.map((mostEx, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{mostEx.name}</td>
                <td>{mostEx.item_price} $</td>
                <td>{mostEx.number}</td>
              </tr>))}
          </tbody>
        </Table>)} */}

        {/* items not sold in x month 
        {this.state.isMonth && (<Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
            </tr>
          </thead>
          <tbody>
            {this.state.monthNotSold.map((mNs, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{mNs.name}</td>
              </tr>))}
          </tbody>
        </Table>)} */}

</Container>
    );
  }
}

export default Sales;
