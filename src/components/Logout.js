import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const [loggedIn, saveLoggedIn] = useLocalStorage("isLoggedIn");
	let navigate = useNavigate();

	saveLoggedIn("false");

	setTimeout(() => {
		navigate("/");
	}, 1000);

	return (
		<>
			<h3>Logging Out....</h3>
		</>
	);
}
