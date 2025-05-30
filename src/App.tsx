import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "@/app/layout/MainLayout";

import { DynamicPage } from "./pages/dynamic-page/DynamicPage";
import { MainPage } from "./pages/main-page/MainPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<MainPage />} />
						<Route path=":slug" element={<DynamicPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
