export interface CategoryItem {
	categoryId: number;
	title: string;
	img: string;
	count: number;
}

export interface CatalogItem {
	category: string;
	id: number;
	title: string;
	price: number;
	img: string;
}

export interface CartItem {
	id: number;
	title: string;
	price: number;
	quantity: number;
	img: string;
}
