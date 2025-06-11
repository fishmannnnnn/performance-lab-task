import axiosInstance from "@/shared/services/api-service";
import type { CatalogItem } from "@/shared/types";
import {
	type PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";

interface CatalogState {
	items: CatalogItem[];
	loading: boolean;
	currentCategory: string | null;
	currentPage: number;
	totalCount: number;
	sortBy: string;
	sortOrder: SortOrder;
}

type SortOrder = "asc" | "desc";

const initialState: CatalogState = {
	items: [],
	loading: false,
	currentCategory: "",
	currentPage: 1,
	totalCount: 1,
	sortBy: "price",
	sortOrder: "asc",
};

interface FetchByCategoryOptions {
	category: string;
	page: number;
	sortBy?: string;
	sortOrder?: SortOrder;
}

export const fetchByCategory = createAsyncThunk<
	{ data: CatalogItem[]; totalCount: number },
	FetchByCategoryOptions
>(
	"catalog/fetchByCategory",
	async ({ category, page, sortBy = "price", sortOrder = "asc" }) => {
		const params = new URLSearchParams({
			_page: page.toString(),
			_sort: sortBy,
			_order: sortOrder,
		});

		const response = await axiosInstance.get(`/${category}?${params}`);

		const totalCount = Number(response.headers["x-total-count"]);

		return { data: response.data, totalCount };
	},
);

const catalogSlice = createSlice({
	name: "catalog",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			const newCategory = action.payload;
			if (state.currentCategory !== newCategory) {
				state.currentCategory = newCategory;
				state.currentPage = 1;
			}
		},
		setSort: (
			state,
			action: PayloadAction<{
				sortBy: string;
				sortOrder: SortOrder;
			}>,
		) => {
			state.sortBy = action.payload.sortBy;
			state.sortOrder = action.payload.sortOrder;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchByCategory.pending, state => {
				state.loading = true;
			})
			.addCase(fetchByCategory.fulfilled, (state, action) => {
				state.items = action.payload.data;
				state.totalCount = action.payload.totalCount;
				state.loading = false;
			});
	},
});

export const { setPage, setCategory, setSort } = catalogSlice.actions;
export default catalogSlice.reducer;
