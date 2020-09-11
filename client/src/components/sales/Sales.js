
import React, { Component } from 'react';
import './sales.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Col, Button, Table, Row, Container, Dropdown, ButtonGroup ,Modal,Image} from 'react-bootstrap';
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
      selectedMonth: 0,
      showModal:false,
      info_name:'',
      info_type:'',
      info_date:'',
      info_image:'',
      info_price:0
    }
  }

  componentDidMount() {
    fetch('api/sold')
      .then(res => res.json())
      .then(sold => this.setState({ sold }, () => console.log('Items fetched..', sold)))
    fetch('api/sold/bs')
      .then(res => res.json())
      .then(bestSeller => this.setState({ bestSeller,info_bestseller:bestSeller[0].bs }, () => console.log('Bestseller items fetched...', bestSeller)))
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

  itemInfo = (name, type,date,image,price) => {
    this.setState({showModal:true,info_name:name,info_type:type,info_date:date,info_image:image,info_price:price})

  }


  render() {

    return (
      <Container fluid>

        
<Row className="pt-5 pb-5 text-center">
          <Col md={4}>
            <h4>All</h4>
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-down-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
          </Col>
          <Col md={4}>
            <h4>Bestsellers</h4>
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-down-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
          </Col>
          <Col md={4}>
            <h4>the most expensive which are sold 3 and more times</h4>
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-down-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
          </Col>
        </Row>
     <Row>

      <Col md={4}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">ITEM NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.sold.map((sold, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{sold.name}</td>

                <td><Button variant="outline-info" onClick={()=> this.itemInfo(sold.name,sold.type_name,sold.date_sold,sold.picture,sold.item_price)}>Info</Button></td>
              </tr>))}
          </tbody>
        </Table>
        </Col>
     
    <Col md={4}>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>Sold times</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bestSeller.map((bs, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{bs.name}</td>
                <td>{bs.bs}</td>
              </tr>))}
          </tbody>
        </Table>
      </Col>

    <Col md={4}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>Sales counter</th>
            </tr>
          </thead>
          <tbody>
            {this.state.mostExpensive.map((mostEx, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{mostEx.name}</td>
                <td>{mostEx.number}</td>
              </tr>))}
          </tbody>
        </Table>
    </Col>


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
       
    <Modal aria-labelledby="contained-modal-title-vcenter"  show={this.state.showModal} onHide={()=> this.setState({showModal:false})}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         About item sales
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col  md={8}>
              <Image src={this.state.info_image} thumbnail />
            </Col>
            <Col md={4}>
            <p>PRICE: $ {this.state.info_price}</p>
            </Col>
            <Col  md={12}>
              <h3>{this.state.info_name}</h3>
              <p>{this.state.info_type}</p>
            </Col>
          </Row>

          <Row>
            <p className="pl-3">This item has been sold in: {moment(this.state.info_date).format('MMMM Do YYYY')}</p>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

  </Row>
  
</Container>
    );
  }
}

export default Sales;
