import { Button, Dropdown, type MenuProps, Space } from "antd";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { CartProduct, Modal } from "@/modules/cart";
import { formatPrice } from "@/shared/utils/formatPrice";

import styles from "./navbar.module.scss";

const items: MenuProps["items"] = [
	{
		key: "1",
		label: <Link to="/groceries">Groceries</Link>,
	},
	{
		key: "2",
		label: <Link to="/clothes">Clothes</Link>,
	},
	{
		key: "3",
		label: <Link to="/electronics">Electronics</Link>,
	},
];

export const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { totalPrice, cartItems } = useAppSelector(state => state.cart);

	return (
		<>
			<header className={styles.navbar}>
				<Link to={"/"}>
					<span className={styles.logo}>Shop</span>
				</Link>
				<nav>
					<Dropdown menu={{ items }}>
						<Space>
							<Link
								to={"/catalog"}
								style={{ color: "rgb(61, 61, 61)" }}
							>
								Catalog
							</Link>
							<ChevronDown />
						</Space>
					</Dropdown>
					<Link to={"#"}>Fresh offers</Link>
					<Link to={"#"}>Last chance</Link>
				</nav>
				<div className={styles.navbarActions}>
					<Button
						type="text"
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						<ShoppingCart />
					</Button>
				</div>
			</header>
			{isModalOpen && (
				<Modal closeModal={() => setIsModalOpen(false)}>
					{cartItems.length > 0 ? (
						<div className={styles.cardsContainer}>
							<div className={styles.cards}>
								{cartItems.map(item => (
									<CartProduct product={item} key={item.id} />
								))}
							</div>
						</div>
					) : (
						<div className={styles.cartEmpty}>
							Your cart is empty
						</div>
					)}

					{cartItems && cartItems.length > 0 && (
						<div className={styles.payment}>
							<div className={styles.summary}>
								<span>Total:</span>
								<span>{formatPrice(totalPrice)}</span>
							</div>
							<Button
								className={styles.paymentButton}
								type="primary"
								block
							>
								Proceed to payment
							</Button>
						</div>
					)}
				</Modal>
			)}
		</>
	);
};
