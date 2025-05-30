import clsx from "clsx";
import { useEffect } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import { ProductsCatalog } from "@/modules/catalog";
import { Sort } from "@/modules/catalog";
import { setCategory } from "@/modules/catalog/store/catalogSlice";
import { capitalize } from "@/shared/utils/capitalize";

import styles from "./CatalogPage.module.scss";

interface CatalogPageProps {
	className?: string;
	slug: string;
}

export const CatalogPage = ({ className, slug }: CatalogPageProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCategory(slug));
	}, [slug, dispatch]);

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
