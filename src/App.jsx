import { useState } from "react";
import Error from "./components/Error.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import Authenticate from "./components/Authenticate.jsx";
import "./App.css";

function App() {
	const [token, setToken] = useState(null);
	const [errorState, setErrorState] = useState(null);

	function passToken(token) {
		setToken(token || null);
	}

	function passError(err) {
		setErrorState(err || null);
	}

	return (
		<>
			<SignUpForm onSubmit={passToken} onError={passError} />
			{/* We only need to pass the token we got from the signup function, but how to pass the returned value? */}
			<Authenticate token={token} onError={passError} />
			{/*<Error message={errorState} />*/}
		</>
	);
}

export default App;
