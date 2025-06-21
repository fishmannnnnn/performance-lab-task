import { CategoriesList } from "@/modules/categories";
import type { CategoryItem } from "@/shared/types";

import styles from "./CategoriesPage.module.scss";

interface CategoriesPageProps {
	categories: CategoryItem[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
	return (
		<main className={styles.page}>
			<h2>All categories</h2>
			<CategoriesList
				categories={categories}
				className={styles.categories}
			/>
		</main>
	);
}
