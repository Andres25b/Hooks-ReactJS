import React, { useEffect, useState } from 'react';

export const Message = () => {
	const [stateCoors, setStateCoors] = useState({ x: 0, y: 0 });
	const { x, y } = stateCoors;

	useEffect(() => {
		const mauseMove = (e) => {
			const coors = { x: e.x, y: e.y };
			setStateCoors(coors);
		};

		window.addEventListener('mousemove', mauseMove);

		return () => {
			window.removeEventListener('mousemove', mauseMove);
			console.log('mouseMove eliminado');
		};
	}, []);

	return (
		<>
			<div className="alert alert-success">
				Estas son las cordenadas de tu mause
			</div>
			<p>
				x: {x}, y: {y}
			</p>
		</>
	);
};
