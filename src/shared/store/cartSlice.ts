import type { CartItem } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
	cartItems: CartItem[];
	totalPrice: number;
}

const initialState: CartState = {
	cartItems: [],
	totalPrice: 0,
};

function calculateTotal(cartItems: CartItem[]): number {
	return cartItems.reduce(
		(sum, item) => Number((sum + item.price * item.quantity).toFixed(2)),
		0,
	);
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const item = state.cartItems.find(
				item => item.id === action.payload.id,
			);

			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.cartItems.push(action.payload);
			}

			state.totalPrice = calculateTotal(state.cartItems);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.cartItems = state.cartItems.filter(
				item => item.id !== action.payload,
			);
			state.totalPrice = calculateTotal(state.cartItems);
		},
		changeQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>,
		) => {
			const item = state.cartItems.find(
				item => item.id === action.payload.id,
			);

			if (item && action.payload.quantity > 0) {
				item.quantity = action.payload.quantity;
			}

			state.totalPrice = calculateTotal(state.cartItems);
		},
	},
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
