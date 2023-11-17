export const Card = ({ header, body }) => {
	const styles = {
		width: '80%',
		margin: '10px auto',
	};

	return (
		<div className="card" style={styles}>
			<h1 className="card-header">{header}</h1>
			<div className="card-body">{body}</div>
		</div>
	);
};
