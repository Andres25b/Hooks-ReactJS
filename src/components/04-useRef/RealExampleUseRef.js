import React, { useState } from 'react';
import { MultipleCustomHooks } from '../03-examples/MultipleCustomHooks';

export const RealExampleUseRef = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>RealExampleUseRef</h1>
					<hr />
					<button
						className="btn btn-outline-success mb-3"
						onClick={() => setShow(!show)}
					>
						Mostrar / Ocultar
					</button>

					{show && <MultipleCustomHooks />}
				</div>
			</div>
		</>
	);
};
