import { Button, Dropdown, type MenuProps, Space } from "antd";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "@/app/store/hooks";
import { setShowCart } from "@/shared/store/cartSlice";

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
	const dispatch = useAppDispatch();

	return (
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
						dispatch(setShowCart(true));
					}}
				>
					<ShoppingCart />
				</Button>
			</div>
		</header>
	);
};
