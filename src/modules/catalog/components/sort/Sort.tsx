import { Select } from "antd";
import clsx from "clsx";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { showStoreSortValue } from "@/shared/utils/showStoreSortValue";

import { fetchByCategory, setSort } from "../../store/catalogSlice";
import styles from "./Sort.module.scss";

interface SortProps {
	className?: string;
}

const sortOptions = [
	{ value: "price_asc", label: "Price (asc)" },
	{ value: "price_desc", label: "Price (desc)" },
	{ value: "title_asc", label: "Name (asc)" },
	{ value: "title_desc", label: "Name (desc)" },
];

export const Sort = ({ className }: SortProps) => {
	const { sortBy, sortOrder, currentCategory, currentPage } = useAppSelector(
		state => state.catalog,
	);
	const dispatch = useAppDispatch();

	function handleChange(value: string) {
		const [sortby, sortorder] = value.split("_");
		dispatch(
			setSort({ sortBy: sortby, sortOrder: sortorder as "asc" | "desc" }),
		);
	}

	useEffect(() => {
		if (currentCategory) {
			dispatch(
				fetchByCategory({
					category: currentCategory,
					page: currentPage,
					sortBy,
					sortOrder,
				}),
			);
		}
	}, [sortBy, sortOrder, currentCategory, currentPage, dispatch]);

	return (
		<div className={clsx(styles.Sort, className)}>
			<span>Sort by: </span>
			<Select
				style={{ minWidth: "120px" }}
				value={showStoreSortValue(sortBy, sortOrder)}
				options={sortOptions}
				onChange={handleChange}
			/>
		</div>
	);
};
