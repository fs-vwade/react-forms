import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

export default function SignUpForm() {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [message, setMessage] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		async function signUp() {
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
				const result = response.json();
				setMessage(result.message);
				setToken(result.token);
			} catch (error) {
				console.error(error);
			}
		}
		signUp();
	}, []);
	return (
		<>
			<h2>Sign Up</h2>
			{message && <div>{message}</div>}
			{token && <div>{token}</div>}
		</>
	);
}
