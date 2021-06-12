import React, { useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { Small } from './Small';

export const Memorize = () => {
	const { counter, increment } = useCounter(10);
	const [show, setShow] = useState(true);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>Memorize</h1>
					<hr />

					<h3 className="mb-3">
						Counter: <Small value={counter} />
					</h3>

					<button className="btn btn-outline-success me-3" onClick={increment}>
						+1
					</button>
					<button
						className="btn btn-outline-danger"
						onClick={() => setShow(!show)}
					>
						Mostrar / Ocultar {JSON.stringify(show)}
					</button>
				</div>
			</div>
		</>
	);
};
