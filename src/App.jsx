import { useState } from "react";
import SignUpForm from "./components/SignUpForm.jsx";
import Authenticate from "./components/Authenticate.jsx";

function App() {
	const [token, setToken] = useState(null);

	function passToken(token) {
		setToken(token || null);
	}

	return (
		<>
			<SignUpForm onSubmit={passToken} />
			{/* We only need to pass the token we got from the signup function, but how to pass the returned value? */}
			<Authenticate token={token} />
		</>
	);
}

export default App;
