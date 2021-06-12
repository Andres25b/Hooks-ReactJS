import React, { memo } from 'react';

export const ShowIncrement = memo(({ increment }) => {
	console.log('Me volvi a ejecutar :(');

	return (
		<>
			<button className="btn btn-outline-success" onClick={() => increment()}>
				Incrementar
			</button>
		</>
	);
});
