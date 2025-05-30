import { ConfigProvider } from "antd";
import React from "react";

export default function AntdThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ConfigProvider
			theme={{
				components: {
					// Dropdown: {
					// 	colorPrimary: "rgb(61, 61, 61)",
					// },
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
}
