import React from 'react';
import { useCounter } from '../../hooks/useCounter';

export const CounterWithCustomHook = () => {
	const { increment, decrement, state, reset } = useCounter(20);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>Counter with Hook: {state}</h1>
					<hr />

					<button
						type="button"
						className="btn btn-outline-primary btn-lg me-4"
						onClick={() => increment(2)}
					>
						+1
					</button>
					<button
						type="button"
						className="btn btn-outline-secondary btn-lg me-4"
						onClick={reset}
					>
						Reset
					</button>
					<button
						type="button"
						className="btn btn-outline-danger btn-lg"
						onClick={() => decrement(2)}
					>
						-1
					</button>
				</div>
			</div>
		</>
	);
};
