
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container,Alert,InputGroup} from 'react-bootstrap'
import EditModal from '../modalEdit';





class Edit_item extends Component {
  
    constructor() {
        super();
        this.state = {
            items:[],
          itemTypes: [],
          typeValue: 0,
          typeName: null,
          newName:'',
          showModal:false,
          chosenName:'',
          chosenPrice:0,
          chosenID:0,
          chosenTypeName:'',
          IDtype:0
        }
      }

      componentDidMount() {
        fetch('/api/items')
          .then(res => res.json())
          .then(items => this.setState({ items }, () => console.log('Items fetched..', items)))
      }

  render() {

    return (

        <div>
        <h2 className="text-center mt-5 pt-5 mb-5">ALL ITEMS FOR SALE</h2>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.type_name}</td>
                <td>{item.item_price}</td>
                <td>
                  <Button onClick={()=> this.setState({showModal:true,chosenID:item.id,IDtype:item.item_type_id,chosenName:item.name,chosenPrice:item.item_price,chosenTypeName:item.type_name})}>Edit</Button>
                </td>
              </tr>))}
          </tbody>
        </Table>
        <EditModal typId={this.state.IDtype} itemId ={this.state.chosenID} itemName={this.state.chosenName} itemType={this.state.chosenTypeName} itemPrice={this.state.chosenPrice}  show={this.state.showModal} onHide={() => this.setState({showModal:false})}/>
      </div>
    ); 
  }
}

export default Edit_item;
