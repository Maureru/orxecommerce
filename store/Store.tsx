import React, { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'



export const Store = createContext(null);

export type CartItem = {
  id: number,
  name: string,
  details: string
  price: number,
  image: string,
  size: string
  quantity: number,
  stock: number
}

export type User = {
  token: string,
  _id: string,
  name: string,
  email: string,
  isAdmin: boolean
}


const initialState: {
  cart: {
    cartItems: CartItem[],
    shippingAddress: {
      fullName: string,
      streetAddress: string,
      streetAddress2: string,
      city: string,
      state: string,
      postalCode: string,
      country: string,
      phone: number,
      email: string
    }
  },
  user: User,
} = {
    cart: {
        cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) :  [
          /* {
            id: 1,
            name: 'Shoessss',
            details: 'Shoes for men',
            price: 50,
            image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg',
            size: 'sm',
            quantity: 1,
            stock: 5
          },
          {
            id: 2,
            name: 'Shoes',
            details: 'Shoes for men',
            price: 50,
            image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg',
            size: 'md',
            quantity: 1,
            stock: 9
          }, */
          
        
        ],
        shippingAddress: Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : null
    },
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SHIPPING':
      Cookies.set('shippingAddress', JSON.stringify(action.payload))
      return {... state, shippingAddress: action.payload}
    case 'ADD_TO_CART':

      const existItem = state.cart.cartItems.find((item) => item._id === action.payload._id)

      const cartItems = existItem ? state.cart.cartItems.map((item) =>
        item._id === existItem._id ? action.payload : item
      ) : [...state.cart.cartItems, action.payload]

      
      Cookies.set('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems: cartItems}}
    case 'CLEAR_CART': 
      Cookies.remove("cartItems")
      return { ...state, cart: {...state.cart, cartItems: []}}
    case 'REMOVE_CART':
      const cartItem = state.cart.cartItems.filter((item) => item._id != action.payload._id)
      Cookies.set('cartItems', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItems: cartItem}}
    case 'INCREASE_ITEM_QUANTITY':
      return { ...state, cart: { ...state.cart, cartItems: state.cart.cartItems.map((item) => item._id === action.payload._id ? {...item, quantity: item.quantity < item.stock ? item.quantity + 1 : item.quantity} : item)}}
    case 'DECREASE_ITEM_QUANTITY':
      return { ...state, cart: { ...state.cart, cartItems: state.cart.cartItems.map((item) => item._id === action.payload._id ? {...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity} : item)}}
    case 'LOGIN':
      Cookies.set('user', JSON.stringify(action.payload))
      return {...state, user: action.payload}
    case 'LOGOUT':
      Cookies.remove('user')
      return {...state, user: null}
  }
    
    
}



function StoreProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider