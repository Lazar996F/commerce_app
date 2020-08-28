
import React, { Component } from 'react';
import './add.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Row, Col, Container,Alert } from 'react-bootstrap'




class Add extends Component {
  
    constructor() {
        super();
        this.state = {
          items: [],
          addSale: [],
          itemTypes: [],
          msgItem:'',
          newPrice: 0,
          typeValue: 0,
          typeName: null,
          base64TextString:''
        }
      }

      componentDidMount () {
        fetch('api/types')
        .then(res => res.json())
        .then(itemTypes => {
          this.setState({ itemTypes });
          this.setState({ typeValue: itemTypes[0].id });
        })
      }
      
    async setNewItem() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.typeName, item_type_id: this.state.typeValue, price: this.state.newPrice  })
        };
        const response = await fetch('/api/new/item', requestOptions);
        const data = await response.json();
        
        console.log('objekat',data, this.state.newPrice )
        if (data.status == 'success') {
          this.setState({ msgItem: 'Successfully added a new item :)' }, () => {
            setTimeout(() => {
              this.setState({ msgItem: ''})
            }, 2000);
          })
        } else if (data.status == 'faild') {
          this.setState({ msgItem: 'Faild to add new item :('})
          setTimeout(() => {
            this.setState({ msgItem: '' })
          }, 2000);
        }
    }

    onChange =(e) => {
      console.log("file to upload:", e.target.files[0])
      let file = e.target.files[0]

      if(file){
        const reader = new FileReader();
        reader.onload= this._handleReaderLoaded.bind(this)
        reader.readAsBinaryString(file)
      }
    }

    _handleReaderLoaded = (readerEvt) => {
      let binaryString= readerEvt.target.result
      this.setState({
        base64TextString: btoa(binaryString)
      })
    }

    onFileSubmit = (e) => {
      e.preventDefault()
      console.log("binary string:", this.state.base64TextString);

      let payload = {image: this.state.base64TextString}
      fetch(`/api/add/${this.props.items.id}`, {
        method: "PATCH"
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      .then(resp=> resp.json())
      .then(json => console.log(json))

      preview.src= "data:image/png;base64"+ this.state.base64TextString
    }


    render() {

      return (
        <Container fluid className="mb-5 pb-5 mt-5">
        <h2 className="text-center">INSERT NEW ITEM</h2>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Item name</Form.Label>
            <Form.Control onChange={(event) => this.setState({ typeName: event.target.value })} type="text" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select"  onChange={(e) => this.setState({ typeValue: e.target.value})}>
              {this.state.itemTypes.map((type, index) => (
                <option value={type.id} key={index}>{type.type_name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridZip">
            <Form.Label>Price [ $ ]</Form.Label>
            <Form.Control onChange={(event) => this.setState({ newPrice: event.target.value })} />
          </Form.Group>
        </Form.Row>

        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e)=> this.onChange(e)}>
              <input
              type="file"
              name="image"
              id="file"
              accept=".jpeg, .png, .jpg"
              />
              <input type="submit"/>
        </form>

        <Button onClick={() => this.setNewItem()} variant="primary">Add item</Button>
    
        {this.state.msgItem=='Successfully added a new item :)' && (<Alert variant='success' className="w-25">
            {this.state.msgItem}
        </Alert>)}
            {this.state.msgItem=='Faild to add new item :(' && (<Alert variant='danger' className="w-25">
            {this.state.msgItem}
        </Alert>)}
      </Container>

      ); 
    }
  }
  

  export default Add;