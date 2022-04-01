import { CLEAR_CART, DECREASE, GET_TOTALS, INCREASE, REMOVE, TOGGLE_AMOUNT } from './actions.js'
import cartItems from './cart-items.js'

const initialStore = {
    cart: cartItems,
    total: 0,
    amount: 0
}

export default function reducer(state = initialStore, action) {
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] }
    }
    if (action.type === INCREASE) {
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
                return cartItem = { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }
    if (action.type === DECREASE) {
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
                cartItem = { ...cartItem, amount: cartItem.amount - 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }
    if (action.type === REMOVE) {
        return {
            ...state,
            cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id)
        }
    }
    if (action.type === GET_TOTALS) {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem
            const itemTotal = price * amount
            cartTotal.amount += amount

            cartTotal.total += itemTotal
            return cartTotal;
        },
            {
                total: 0,
                amount: 0
            }
        )
        total = parseFloat(total.toFixed(2))
        return { ...state, total, amount }
    }
    if (action.type === TOGGLE_AMOUNT) {
        return {
            ...state, cart: state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.toggle === 'inc') {
                        return cartItem = { ...cartItem, amount: cartItem.amount + 1 }
                    }
                    if (action.payload.toggle === 'dec') {
                        return cartItem = { ...cartItem, amount: cartItem.amount - 1 }
                    }
                }
                return cartItem
            })
        }
    }
    return state
}