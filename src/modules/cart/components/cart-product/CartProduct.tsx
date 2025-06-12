import { Button, InputNumber } from "antd";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
	changeQuantity,
	removeFromCart,
	selectCartItemById,
} from "@/shared/store/cartSlice";
import { formatPrice } from "@/shared/utils/formatPrice";

import styles from "./CartProduct.module.scss";

interface CartProductProps {
	className?: string;
	productId: number;
}

export const CartProduct = memo(
	({ className, productId }: CartProductProps) => {
		const dispatch = useAppDispatch();
		const product = useAppSelector(state =>
			selectCartItemById(state, productId),
		);

		function onQuantityChange(value: number | null) {
			if (value !== null) {
				console.log("changed", value);
				dispatch(changeQuantity({ id: product.id, quantity: value }));
			}
		}

		if (!product) {
			return null;
		}

		return (
			<div className={clsx(styles.CartProduct, className)}>
				<div className={styles.imgContainer}>
					<img src={product.img} alt={product.title} />
				</div>

				<div className={styles.info}>
					<div className={styles.titleContainer}>
						<p className={styles.title}>{product.title}</p>
						<Button
							type="text"
							onClick={() => {
								dispatch(removeFromCart(product.id));
							}}
						>
							<Trash size={16} />
						</Button>
					</div>
					<div className={styles.priceContainer}>
						<span className={styles.price}>
							{formatPrice(product.price * product.quantity)}
						</span>
						<InputNumber
							min={1}
							value={product.quantity}
							onChange={onQuantityChange}
						/>
					</div>
				</div>
			</div>
		);
	},
);
