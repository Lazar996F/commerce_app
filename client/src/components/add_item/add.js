
import React, { Component } from 'react';
import './add.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Row, Col, Container,Alert,Toast } from 'react-bootstrap'
import { getTypes} from "../../store/actions/items";
import { connect } from "react-redux";



class Add extends Component {
  
    constructor() {
        super();
        this.state = {
          items: [],
          addSale: [],
          itemTypes:[],
          msgItem:'',
          newPrice: 0,
          typeValue: 0,
          typeName: null,
          base64TextString:'',
          image:{},
          showToast:false
        }
      }

      
      componentDidMount() {
            this.props.onGetTypes()
      }
    

    async setNewItem(e) {
      
let tempValue=this.props.itemTypes[0].id
      if(this.state.typeValue!==0){
          tempValue=this.state.typeValue
      }

      e.preventDefault()
      const imageString=`data:${this.state.image.type};base64,${this.state.base64TextString}`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.typeName, item_type_id: tempValue, price: this.state.newPrice,picture:imageString })
        };

        const response = await fetch('/api/new/item', requestOptions);
        const data = await response.json();
        
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
      console.log("file to upload:", e.target.files[0].id)
      let file = e.target.files[0]
this.setState({image:file})
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

    render() {
      return (
        <Container className="mb-5 pb-5 mt-5 pr-md-5">
        <h2 className="mb-5 border-bottom pb-3">INSERT NEW ITEM</h2>
        <Form.Row className="mb-5">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Item name</Form.Label>
            <Form.Control onChange={(event) => this.setState({ typeName: event.target.value })} type="text"/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select"  onChange={(e) => this.setState({ typeValue: e.target.value})}>
              {this.props.itemTypes.map((type, index) => (
                <option value={type.id} key={index}>{type.type_name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridZip">
            <Form.Label>Price [ $ ]</Form.Label>
            <Form.Control onChange={(event) => this.setState({ newPrice: event.target.value })}  className="w-25"/>
          </Form.Group>
        </Form.Row>

        <Form.Label className="mb-4">Click "Choose File" button to upload an image:</Form.Label>
        <form onSubmit={(e) => this.setNewItem(e)} onClick={()=> this.setState({showToast:true})} onChange={(e)=> this.onChange(e)} classNAme="mt-5 mb-5">
              <input
              type="file"
              name="image"
              id="file"
              accept="image/*"
              />
              <input type="submit"/>
        </form>
    {this.state.msgItem=='Successfully added a new item :)' && <Row className="mt-5">
      <Col xs={6}>
        <Toast onClose={()=> this.setState({showToast:false})} show={this.state.showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto"></strong>
          </Toast.Header>
          <Toast.Body ><h5 className="text-success">{this.state.msgItem}</h5></Toast.Body>
        </Toast>
      </Col>
    </Row>}
    {this.state.msgItem=='Faild to add new item :(' && <Row className="mt-5">
      <Col xs={6}>
        <Toast onClose={()=> this.setState({showToast:false})} show={this.state.showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto"></strong>
          </Toast.Header>
          <Toast.Body ><h5 className="text-danger">{this.state.msgItem}</h5></Toast.Body>
        </Toast>
      </Col>
    </Row>}
      </Container>
      ); 
    }
  }
  
  const mapStateToProps = (state) => ({
    itemTypes: state.items.itemTypes,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    onGetTypes: (payload) => dispatch(getTypes(payload)),
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(Add);