
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container,Alert,InputGroup} from 'react-bootstrap'
import EditModal from '../modalEdit';
import { getItems} from "../../store/actions/items";
import { connect } from "react-redux";




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
          IDtype:0,
          msgDelete:'',
          msgDelete:''
        }
      }

      componentDidMount() {
        this.props.onGetItems();
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
        <div>
        <h2 className="text-center mt-5 pt-5 mb-5">ALL ITEMS FOR SALE</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM NAME</th>
              <th>ITEM TYPE</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.type_name}</td>
                <td>$ {item.item_price}</td>
                <td>
                  <Button onClick={()=> this.setState({showModal:true,chosenID:item.id,IDtype:item.item_type_id,chosenName:item.name,chosenPrice:item.item_price,chosenTypeName:item.type_name})} className="mr-5" variant="outline-info">Edit</Button>
                  <Button variant="outline-danger" onClick={() => { this.deleteItem(item.id,index)}} >Delete</Button>
                </td>
              </tr>))}
          </tbody>
          {this.state.msgDelete==='Successfully deleted item :)' && (<Alert variant='success' className="w-50">
           {this.state.msgDelete}        </Alert>)}
           {this.state.msgDelete==='Faild to delete item :(' && (<Alert variant='danger' className="w-50">
         {this.state.msgDelete}
         </Alert>)}
        </Table>
        <EditModal typId={this.state.IDtype} itemId ={this.state.chosenID} itemName={this.state.chosenName} itemType={this.state.chosenTypeName} itemPrice={this.state.chosenPrice}  show={this.state.showModal} onHide={() => this.setState({showModal:false})}/>
      </div>
    ); 
  }
}

const mapStateToProps = (state) => ({
  items: state.items.itemsRedux
});
const mapDispatchToProps = (dispatch) => ({
  onGetItems: (payload) => dispatch(getItems(payload))
});

export default connect(mapStateToProps,mapDispatchToProps)(Edit_item);
