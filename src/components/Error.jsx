// This is a good way to practice drafting components!

export default function Error({ message }) {
	function validateMessage(msg) {
		if (typeof msg === "string" && 0 < msg.length) {
			return <div className="error-message">{msg}</div>;
		}
	}
	return <>{validateMessage(message)}</>;
}
