
// import React, { Component } from 'react';
// import {Container,Table,Button } from 'react-bootstrap'
// import './cart.css';

// class Cart extends Component {
  
//     constructor() {
//         super();
//         this.state = {
//           addedCart: [],
//           message: '',
//           newPrice: 0,
//           typeValue: 0,
//           typeName: '',
//         }
//       }


// componentDidUpdate(prevProps){

//     if(this.props.forCart.lenght !== prevProps.forCart.lenght)
//     React.cloneElement(this.state.addedCart,this.props.forCart);
// }


//       removeFromCart = (DELid) => {
//         const { addedCart } = this.state
//         let removeIndex = this.props.forCart.map(function (item) { return item.id }).indexOf(DELid);
//         this.props.forCart.splice(removeIndex, 1);
//       }



//       async addSale() {
//         console.log(this.state.addedCart);
//         const { addedCart } = this.state
//         const items = addedCart.map(x => {
//           return { item_id: x.item_id }
//         })
    
//         const requestOptions = {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ items, date_sold: new Date() })
//         };
    
//         const response = await fetch('/api/add/sale', requestOptions);
//         const data = await response.json();
    
//         if (data.status == 'success') {
//           this.setState({ addedCart: [], message: 'Successfully' }, () => {
//             setTimeout(() => {
//               this.setState({ message:''})
//             }, 5000);
//           })
//         } else if (data.status == 'faild') {
//           this.setState({ addedCart: [], message:'Faild to add'})
//         }
//       };



//       totalPrice = () => {
//         let counter = 0;
    
//         this.props.forCart.map(x => {
//           counter += x.price
//         })
//         return counter.toFixed(1);
//       }


//   render() {


//     console.log("asdasd",this.state.addedCart)
//     return (
//       <Container fluid {...this.props}>
//        <h4 className="mt-5 pl-5 mb-3">CART</h4>
//         <Table className="w-50">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>ITEM NAME</th>
//               <th>PRICE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.addedCart.map( (additem, index) => (
//               <tr>
//                 <td>{index + 1}</td>
//                 <td>{additem.name}</td>
//                 <td>{additem.price}</td>
//                 <td><button onClick={() => this.removeFromCart(additem.id)} type="button" class="close" aria-label="Close">
//                   <span aria-hidden="true">&times;</span>
//                 </button></td>
//               </tr>))}
//           </tbody>
//         </Table>
//         <div className="d-flex justify-content-between totalPadding">
//           <Button onClick={() => this.addSale()} className="ml-5 mt-3 mb-5">SUBMIT</Button>
//           <h4 className="mt-3">TOTAL: {this.totalPrice()} $</h4>
//         </div>
//         <p className="ml-5">{this.state.message}</p>
//       </Container>
//     ); 
//   }
// }

// export default Cart;


