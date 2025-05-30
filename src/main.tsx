import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";

import AntdThemeProvider from "@/app/providers/antd-theme-provider/AntdThemeProvider";
import { store } from "@/app/store";

import App from "./App.tsx";
import "./globals.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AntdThemeProvider>
				<ErrorBoundary fallback={<>Error</>}>
					<App />
				</ErrorBoundary>
			</AntdThemeProvider>
		</Provider>
	</StrictMode>,
);
