import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CatalogPage } from "@/pages/catalog-page/CatalogPage";
import CategoriesPage from "@/pages/categories-page/CategoriesPage";
import NotFound from "@/pages/notFound-page/NotFound";
import axiosInstance from "@/shared/services/api-service";
import type { CategoryItem } from "@/shared/types";
import { Loader } from "@/shared/ui/loader/Loader";

export const DynamicPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const [categories, setCategories] = useState<CategoryItem[]>([]);

	useEffect(() => {
		axiosInstance
			.get("/categories")
			.then(res => setCategories(res.data))
			.catch(console.error);
	}, []);

	if (!slug || categories.length === 0) return <Loader />;

	if (slug === "catalog") {
		return <CategoriesPage categories={categories} />;
	}

	if (!categories.map(item => item.title).includes(slug)) return <NotFound />;

	return <CatalogPage slug={slug} />;
};
