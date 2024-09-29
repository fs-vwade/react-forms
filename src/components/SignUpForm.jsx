import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

export default function SignUpForm({ onSubmit }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	function changedValue(event, f) {
		f(event.target.value);
	}

	const [message, setMessage] = useState(null);
	//const [token, setToken] = useState(null);

	//useEffect(() => {
	//	async function signUp() {
	//		try {
	//			const response = await fetch(`${API_URL}/signup`, {
	//				method: "POST",
	//				headers: {
	//					"Content-Type": "application/json",
	//				},
	//				body: JSON.stringify({
	//					username: username,
	//					password: password,
	//				}),
	//			});
	//			const result = response.json();
	//			setMessage(result.message);
	//			onSubmit(result.token);
	//		} catch (error) {
	//			setError(error);
	//			console.error(error);
	//		}
	//	}
	//	signUp();
	//}, []);

	async function submitForm(event) {
		event.preventDefault();
		try {
			const response = await fetch(`${API_URL}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});
			const result = await response.json();
			setMessage(result.message || null);
			onSubmit(result.token);
		} catch (error) {
			setError(error);
			console.error(error);
		}
	}

	return (
		<>
			<h2>Sign Up</h2>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="">
						Username:{" "}
						<input
							type="text"
							value={username}
							onChange={(e) => changedValue(e, setUsername)}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="">
						Password:{" "}
						<input
							type="password"
							value={password}
							onChange={(e) => changedValue(e, setPassword)}
						/>
					</label>
				</div>
				<button>Submit</button>
			</form>
			{/*{message && <div>{message}</div>}
			{token && <div>{token}</div>}*/}
		</>
	);
}
