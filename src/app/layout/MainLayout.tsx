import { Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { CartContent, Modal } from "@/modules/cart";
import { Navbar } from "@/shared/components/navbar/Navbar";

export default function MainLayout() {
	const showCart = useAppSelector(state => state.cart.showCart);

	return (
		<>
			<Navbar />
			{showCart && (
				<Modal>
					<CartContent />
				</Modal>
			)}
			<Outlet />
		</>
	);
}
