import { Outlet } from "react-router-dom";

import { Navbar } from "@/shared/components/navbar/Navbar";

export default function MainLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
