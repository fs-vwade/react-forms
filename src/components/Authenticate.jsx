import { useState } from "react";
import { useEffect } from "react";
import Error from "./Error";

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
 * @param {object} props
 * @returns HTML
 */
export default function Authenticate(props) {
	const { token, onError } = props; // i just like the way this syntax works
	const [message, setMessage] = useState("");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	function userError(message) {
		onError(message);
		setError(message);
	}

	async function processToken(event) {
		event.preventDefault();

		// error handling (User)
		if (token) {
			userError(null);
		} else {
			console.error("No token.");
			userError("Cannot authenticate. Please submit username and password.");
			return;
		}

		{
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
				userError(error);
				console.error(error.message);
			}
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
			<Error message={error} />

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
