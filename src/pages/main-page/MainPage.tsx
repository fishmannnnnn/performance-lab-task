import { Navigate } from "react-router-dom";

// import styles from "./MainPage.module.scss";

export const MainPage = () => {
	// return (
	// 	<main className={styles.page}>
	// 		<Link to={"/catalog"}>Browse the catalog</Link>
	// 	</main>
	// );
	return <Navigate to="/catalog" />;
};
