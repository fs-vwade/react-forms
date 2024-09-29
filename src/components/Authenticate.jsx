import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

/**
 * Rubric:
 * Successful deployment - The project renders without errors to the browser.
 * Form - There exists a form to submit a username and password.
 * Authenticate button - There exists a button to authenticate the app.
 * Form validity - The form submits without errors.
 * Authenticate - Clicking the "authenticate" button authenticates the token successfully.
 * Error handling - If user clicks "authenticate" before a token exists, prompt the user with a helpful message.
 * CSS styling - Application is styled with CSS.
 *
 * @param {string} param0
 * @returns HTML
 */
export default function Authenticate({ token }) {
	const [message, setMessage] = useState("");
	const [data, setData] = useState();

	async function processToken(event) {
		event.preventDefault();
		if (token) {
			try {
				const response = await fetch(`${API_URL}/authenticate`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Response did not return OK");
				}

				const result = await response.json();

				if (!result.success) {
					throw new Error("Authorization not successful");
				}

				console.log(result);
				setData(result.data);
				setMessage(result.message);
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Please submit a username and password");
		}
	}

	return (
		<div>
			<h2>Authenticate</h2>
			<form onSubmit={processToken}>
				<>
					<button>Authenticate User</button>
				</>
			</form>

			{message && (
				<>
					<div>Auth: {message}</div>
				</>
			)}
			{data && (
				<>
					<div>IAT: {data.iat}</div>
				</>
			)}
		</div>
	);
}
