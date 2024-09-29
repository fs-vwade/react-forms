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

	async function submitForm(event) {
		event.preventDefault();
		const ok = 0 < username.length && 0 < password.length;
		try {
			if (!ok) {
				setError(
					`Please enter a ${["username", "password"]
						.filter((s, i) => [username, password][i].length === 0)
						.join(" and ")}`
				);
				return;
			} else setError(null);
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
			setError(error.value);
			console.log(error.messsage);
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
				{error && <div className="error-message">{error}</div>}
				<button>Submit</button>
			</form>
			{/*{message && <div>{message}</div>}
			{token && <div>{token}</div>}*/}
		</>
	);
}
