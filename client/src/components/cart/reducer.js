import {
  DECREASE,
  INCREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  TOGGLE_AMOUNT,
} from './action';
import cartItems from './cart-items';
import axios from 'axios';

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};
function reducer(state = initialStore, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === DECREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.toggle === 'inc') {
            return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
          }
          if (action.payload.toggle === 'dec') {
            return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
          }
        }
        return cartItem;
      }),
    };
  }
  return state;
}

// function data() {
//   try {
//     const result = axios.post('http://localhost:5000/showMyAds', {
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjg1ODEyMDkyLCJmaXJzdE5hbWUiOiJZYXNtZWVuIiwibGFzdE5hbWUiOiJBYnUgS3dhaWsiLCJpYXQiOjE1OTcyNDc0ODUsImV4cCI6MTYyODgwNDQxMX0.2bi6mlssGgpxuAMVg7O4Q5PrAo2l4xJnsZkeN5xy3No',
//     });

//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log(data());

export default reducer;

// switch (action.type) {
//   case CLEAR_CART:
//     return { ...state, cart: [] };
//   default:
//     return state;
// }