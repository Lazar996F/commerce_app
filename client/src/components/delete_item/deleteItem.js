
import React, { Component } from 'react';
import './deleteItem.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container,Alert} from 'react-bootstrap'



class DeleteItem extends Component {
  
    constructor() {
        super();
        this.state = {
          items: [],
          msgDelete:'',
          msgDelete:''
        }
      }

      componentDidMount () {
        fetch('/api/items')
        .then(res => res.json())
        .then(items => this.setState({ items }, () => console.log('Items fetched..', items)))
      }
      
      async deleteItem(deleteID,index) {

  
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: deleteID })
        };
      
        const response = await fetch('/api/delete', requestOptions);
        const data = await response.json();
      

        if (data.status == 'success') {
          this.setState({ msgDelete: 'Successfully deleted item :)' }, () => {
            setTimeout(() => {
              this.setState({ msgDelete: ''})
            }, 1000);
          })
      
        } else if (data.status == 'faild') {
          this.setState({ msgDelete: 'Faild to delete item :('})
        }
        this.state.items.splice(index,1);
      }
    

  render() {

    return (
        <Container fluid>
        <h2 className="text-center mt-5 pt-5 mb-5">PUT OUT FROM SALE</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>ITEM TYPE</th>
              <th>PRICE $</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.type_name}</td>
                <td>{item.item_price}</td>
                <td>
                <Button variant="outline-danger" onClick={() => { this.deleteItem(item.id,index)}} >Delete</Button>
                </td>
              </tr>))}
          </tbody>
        </Table>
        {this.state.msgDelete=='Successfully deleted item :)' && (<Alert variant='success' className="w-25">
            {this.state.msgDelete}
        </Alert>)}
            {this.state.msgDelete=='Faild to delete item :(' && (<Alert variant='danger' className="w-25">
            {this.state.msgDelete}
        </Alert>)}
    </Container>
    ); 
  }
}

export default DeleteItem;