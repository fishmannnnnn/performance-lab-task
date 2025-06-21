import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
	fetchByCategory,
	setCategory,
	setPage,
	setSort,
} from "../store/catalogSlice";

interface UseUrlSyncOptions {
	category: string;
}

export default function useUrlSync({ category }: UseUrlSyncOptions) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const { currentPage, sortBy, sortOrder, currentCategory } = useAppSelector(
		state => state.catalog,
	);

	useEffect(() => {
		const pageFromUrl = searchParams.get("page");
		const sortFromUrl = searchParams.get("sort");

		dispatch(setCategory(category));

		if (pageFromUrl && !isNaN(+pageFromUrl)) {
			dispatch(setPage(+pageFromUrl));
		}

		if (sortFromUrl && sortFromUrl.includes("_")) {
			const [sortBy, sortOrder] = sortFromUrl.split("_");
			if (
				["price", "title"].includes(sortBy) &&
				["asc", "desc"].includes(sortOrder)
			) {
				dispatch(
					setSort({
						sortBy,
						sortOrder: sortOrder as "asc" | "desc",
					}),
				);
			}
		}
	}, [category, dispatch, searchParams]);

	const updateUrl = useCallback(() => {
		const params = new URLSearchParams();

		params.set("sort", `${sortBy}_${sortOrder}`);
		params.set("page", String(currentPage));

		const query = params.toString();
		const newUrl = query ? `?${query}` : "";

		if (window.location.search !== newUrl) {
			navigate(newUrl, {
				preventScrollReset: true,
				replace: true,
			});
		}
	}, [currentPage, sortBy, sortOrder, navigate]);

	useEffect(() => {
		if (currentCategory === category) {
			updateUrl();
		}
	}, [currentPage, sortBy, sortOrder, currentCategory, category, updateUrl]);

	useEffect(() => {
		if (currentCategory === category) {
			dispatch(
				fetchByCategory({
					category,
					page: currentPage,
					sortBy,
					sortOrder,
				}),
			);
		}
	}, [category, currentCategory, currentPage, sortBy, sortOrder, dispatch]);
}
