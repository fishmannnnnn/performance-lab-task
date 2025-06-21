import type { RootState } from "@/app/store";
import type { CartItem } from "@/shared/types";
import {
	type PayloadAction,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";

type CartItemsType = Record<number, CartItem>;

interface CartState {
	showCart: boolean;
	cartItems: CartItemsType;
	totalPrice: number;
}

const initialState: CartState = {
	showCart: false,
	cartItems: {},
	totalPrice: 0,
};

function calculateTotal(cartItems: CartItemsType): number {
	return Object.values(cartItems).reduce(
		(sum, item) => Number((sum + item.price * item.quantity).toFixed(2)),
		0,
	);
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setShowCart: (state, action: PayloadAction<boolean>) => {
			state.showCart = action.payload;
		},
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const itemId = action.payload.id;

			if (state.cartItems[itemId]) {
				state.cartItems[itemId].quantity += action.payload.quantity;
			} else {
				state.cartItems[itemId] = action.payload;
			}

			state.totalPrice = calculateTotal(state.cartItems);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;

			delete state.cartItems[itemId];
			state.totalPrice = calculateTotal(state.cartItems);
		},
		changeQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>,
		) => {
			const itemId = action.payload.id;

			if (state.cartItems[itemId] && action.payload.quantity > 0) {
				state.cartItems[itemId].quantity = action.payload.quantity;
				state.totalPrice = calculateTotal(state.cartItems);
			}
		},
	},
});

export const { setShowCart, addToCart, removeFromCart, changeQuantity } =
	cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItemById = createSelector(
	[selectCartItems, (_state: RootState, id: number) => id],
	(items, id) => items[id],
);

export const selectCartItemsIds = (state: RootState) =>
	Object.keys(state.cart.cartItems).map(item => +item);
export const selectCartTotal = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
