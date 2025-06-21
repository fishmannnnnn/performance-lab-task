import { Pagination } from "antd";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import useUrlSync from "@/modules/catalog/hooks/useUrlSync";
import { Loader } from "@/shared/ui/loader/Loader";

import { setPage } from "../../store/catalogSlice";
import { ProductCard } from "../product-card/ProductCard";
import styles from "./ProductsCatalog.module.scss";

interface ProductsCatalogProps {
	className?: string;
	category: string;
}

export const ProductsCatalog = ({
	className,
	category,
}: ProductsCatalogProps) => {
	const dispatch = useAppDispatch();
	const { items, loading, currentPage, totalCount } = useAppSelector(
		state => state.catalog,
	);

	useUrlSync({ category });

	const handlePageChange = (newPage: number) => {
		dispatch(setPage(newPage));
	};

	return (
		<div className={clsx(styles.ProductsCatalog, className)}>
			{!loading ? (
				<>
					<div className={styles.productsGrid}>
						{items.map(product => (
							<ProductCard product={product} key={product.id} />
						))}
					</div>
					<Pagination
						className={styles.pagination}
						total={totalCount}
						current={currentPage}
						pageSize={10}
						onChange={page => handlePageChange(page)}
						align="center"
					/>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
