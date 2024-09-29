import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

export default function Authenticate({ token }) {
	const [message, setMessage] = useState("");
	const [data, setData] = useState();

	useEffect(() => {
		const getAuth = async () => {
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
				setMessage(result.data);
				setMessage(result.message);
			} catch (error) {
				console.error(error);
			}
		};
		getAuth();
	}, []);

	return (
		<div>
			<h2>Authenticate</h2>

			{message && (
				<>
					<div>Auth: {message}</div>
				</>
			)}
			{data && (
				<>
					<div>Data: {data}</div>
				</>
			)}
		</div>
	);
}
