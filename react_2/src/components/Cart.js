import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartActions from '../actions/cart';
import Shelf from './Shelf';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {addToCart } = this.props.actions;

    const cartList = this.props.cart.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
    return (
      <div className="Cart">
        <Shelf addItem={addToCart} />
        <h2>Shopping Bag</h2>
        <ol>{cartList}</ol>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
