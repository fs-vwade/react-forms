import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com"

export default function SignUpForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const [token, setToken] = useState("")

	useEffect(async () =>{
		try {
			const response = await fetch(`${API_URL}/signup`, {
				method: "POST",
				headers: {
					'Content-Type': "application/json",
				}
				body: JSON.stringify({
					username: username,
					password: password
				})
			})
			const result = response.json()
			setMessage(result.message)
			setToken(result.token)
		} catch (error) {
			console.error(error)
		}
	}, [])
	return (
		<>
			<h2>Sign Up</h2>
			{message.length && <div>{message}</div>}
			{token.length && <div>{token}</div>}
		</>
	);
}
