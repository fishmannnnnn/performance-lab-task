import clsx from "clsx";

import { ProductsCatalog } from "@/modules/catalog";
import { Sort } from "@/modules/catalog";
import capitalize from "@/shared/utils/capitalize";

import styles from "./CatalogPage.module.scss";

interface CatalogPageProps {
	className?: string;
	slug: string;
}

export const CatalogPage = ({ className, slug }: CatalogPageProps) => {
	return (
		<main className={clsx(styles.CatalogPage, className)}>
			<div className={styles.container}>
				<h2>{capitalize(slug)}</h2>
				<Sort />
			</div>
			<ProductsCatalog category={slug} />
		</main>
	);
};
