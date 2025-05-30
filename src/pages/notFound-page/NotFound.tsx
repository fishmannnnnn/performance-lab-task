import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => (
	<div
		style={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		}}
	>
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Link to="/">
					<Button type="primary">Back Home</Button>
				</Link>
			}
		/>
	</div>
);

export default NotFound;
