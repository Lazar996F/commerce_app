import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container, Alert, InputGroup, Modal } from 'react-bootstrap';



class EditModal extends Component {

  constructor() {
    super();
    this.state = {
      item: {},
      addSale: [],
      itemTypes: [],
      msgItem: '',
      newPrice: 0,
      typeName: null,
      chosenType: '',
      newName: '',
      id_type: 0
    }

  }

  setselectedItemData = () => {
    this.setState({
      newPrice: this.props.itemPrice,
      newName: this.props.itemName,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemName !== this.props.itemName)
      this.setselectedItemData();
  }


  componentDidMount() {
    fetch('api/types')
      .then(res => res.json())
      .then(itemTypes => {
        this.setState({ itemTypes });
      })
  }

  
  async setNewItem() {

    let tempName = this.state.chosenType;

    await this.state.itemTypes.map(type => {
      if (type.type_name == tempName) {
        this.setState({ id_type: type.id });
      }

    });

    console.log( this.state);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.newName, item_type_id: this.state.id_type, price: this.state.newPrice, id: this.props.itemId })
    };

    const response = await fetch('/api/edit', requestOptions);
    const data = await response.json();

    if (data.status == 'success') {
      this.setState({ msgItem: 'Successfully updated :)' }, () => {
        setTimeout(() => {
          this.setState({ msgItem: '' })
        }, 2000);
      })

    } else if (data.status == 'faild') {
      console.log(data)
      this.setState({ msgItem: 'Faild to update :(' })
      setTimeout(() => {
        this.setState({ msgItem: '' })
      }, 2000);
    }
  }

  render() {

    return (

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...this.props}>
        <Container fluid className="mb-5 pb-5 mt-5">
          <h2 className="text-center">EDIT ITEM</h2>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(event) => { this.setState({ newName: event.target.value }) }} value={this.state.newName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={this.state.chosenType} onChange={(e) => this.setState({ chosenType: e.target.value })} >
                {this.state.itemTypes.map((type, index) => (
                  <option value={type.type_name} key={index}>{type.type_name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Price</Form.Label>
              <Form.Control value={this.state.newPrice} onChange={(event) => { this.setState({ newPrice: event.target.value }) }} />
            </Form.Group>
          </Form.Row>
          <Button onClick={() => this.setNewItem()} variant="primary">Update</Button>
          {this.state.msgItem == 'Successfully updated :)' && (<Alert variant='success' className="w-25">
            {this.state.msgItem}
          </Alert>)}
          {this.state.msgItem == 'Faild to update :(' && (<Alert variant='danger' className="w-25">
            {this.state.msgItem}
          </Alert>)}
        </Container>
      </Modal>
    );
  }
}

export default EditModal;
