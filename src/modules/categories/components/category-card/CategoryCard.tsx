import clsx from "clsx";

import type { CategoryItem } from "@/shared/types";

import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
	className?: string;
	category: CategoryItem;
}

export const CategoryCard = ({ className, category }: CategoryCardProps) => {
	return (
		<div className={clsx(styles.CategoryCard, className)}>
			<img
				src={category.img}
				alt={category.title}
				width={2000}
				height={2000}
			/>
			<p>{category.title}</p>
		</div>
	);
};
