import { useState } from "react";
import { useEffect } from "react";
import Error from "./Error";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

export default function SignUpForm({ onSubmit, onError }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	function changedValue(event, f) {
		f(event.target.value);
	}

	function userError(message) {
		setError(message);
		onError(message);
		return !message;
	}

	async function submitForm(event) {
		event.preventDefault();

		// error handling (User)
		if (0 < username.length && 0 < password.length) {
			userError(null);
		} else {
			console.error("No username/password");
			userError(
				`Please enter a ${["username", "password"]
					.filter((s, i) => [username, password][i].length === 0)
					.join(" and ")}`
			);
			return;
		}

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
			//setMessage(result.message || null);
			onSubmit(result.token);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div>
				<h2>Sign Up</h2>
			</div>
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
				<Error message={error} />
				<button>Submit</button>
			</form>
			{/*{message && <div>{message}</div>}
			{token && <div>{token}</div>}*/}
		</>
	);
}
