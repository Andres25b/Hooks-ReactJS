import React, { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';

export const CallbackHook = () => {
	const [counter, setCounter] = useState(10);

	const increment = useCallback(() => {
		setCounter((c) => c + 1);
	}, [setCounter]);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>useCallback</h1>
					<hr />

					<p className="mb-3">{counter}</p>

					<ShowIncrement increment={increment} />
				</div>
			</div>
		</>
	);
};
