import { useState } from "react";
import { useEffect } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com";

export default function Authenticate({ token }) {
	const [message, setMessage] = useState(null);
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

				const result = response.json();

				if (!result.success) {
					throw new Error("Authorization not successful");
				}

				setMessage(result.data);
				setMessage(result.message);
			} catch (error) {
				console.error(error);
			}
		};
		getAuth();
	}, []);

	return (
		<h2>Authenticate</h2>
		//<div>
		//	{message && (
		//		<>
		//			<div>Auth: {message}</div>
		//		</>
		//	)}
		//	{data && (
		//		<>
		//			<div>Data: {data}</div>
		//		</>
		//	)}
		//</div>
	);
}
