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
					Button: {
						colorPrimary: "rgb(42, 149, 250)",
                        colorPrimaryHover: "rgba(69, 163, 250, 0.69)",
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
}
