import { Button } from "antd";

import { useAppSelector } from "@/app/store/hooks";
import { selectCartItemsIds, selectCartTotal } from "@/shared/store/cartSlice";
import { formatPrice } from "@/shared/utils/formatPrice";

import { CartProduct } from "../cart-product/CartProduct";
import styles from "./CartContent.module.scss";

export const CartContent = () => {
	const cartItemsIds = useAppSelector(selectCartItemsIds);
	const totalPrice = useAppSelector(selectCartTotal);

	if (cartItemsIds.length === 0) {
		return <div className={styles.cartEmpty}>Your cart is empty</div>;
	}

	return (
		<>
			<div className={styles.cardsContainer}>
				<div className={styles.cards}>
					{cartItemsIds.map(id => (
						<CartProduct productId={id} key={id} />
					))}
				</div>
			</div>
			<div className={styles.payment}>
				<div className={styles.summary}>
					<span>Total:</span>
					<span>{formatPrice(totalPrice)}</span>
				</div>
				<Button className={styles.paymentButton} type="primary" block>
					Proceed to payment
				</Button>
			</div>
		</>
	);
};
