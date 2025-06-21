import clsx from "clsx";
import { Link } from "react-router-dom";

import type { CategoryItem } from "@/shared/types";

import { CategoryCard } from "../category-card/CategoryCard";
import styles from "./CategoriesList.module.scss";

interface CategoriesListProps {
	className?: string;
	categories: CategoryItem[];
}

export const CategoriesList = ({
	className,
	categories,
}: CategoriesListProps) => {
	return (
		<div className={clsx(styles.CategoriesList, className)}>
			{categories.map(category => (
				<Link to={`/${category.title}`} key={category.categoryId}>
					<CategoryCard category={category} />
				</Link>
			))}
		</div>
	);
};
