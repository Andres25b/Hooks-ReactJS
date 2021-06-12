import React, { useMemo, useState } from 'react';
import { useCounter } from '../../hooks/useCounter';

export const MemoHook = () => {
	const { counter, increment } = useCounter(2000);
	const [show, setShow] = useState(true);

	const procesoPesado = (iteraciones) => {
		for (let i = 0; i < iteraciones; i++) {
			console.log('Ahi vamos');
		}

		return `${iteraciones} iteraciones realizadas.`;
	};

	const memoProcesoPesado = useMemo(() => procesoPesado(counter), [counter]);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>useMemo</h1>
					<hr />

					<h3 className="mb-3">Counter: {counter}</h3>

					<p>{memoProcesoPesado}</p>

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
