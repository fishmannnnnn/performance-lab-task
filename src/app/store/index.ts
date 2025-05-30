import { CatalogReducer } from "@/modules/catalog/store";
import CartReducer from "@/shared/store/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		catalog: CatalogReducer,
		cart: CartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
