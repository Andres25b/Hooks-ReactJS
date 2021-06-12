import React, { useLayoutEffect, useRef, useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { useFetch } from '../../hooks/useFetch';

export const LayoutEffect = () => {
	const { counter, increment } = useCounter();

	const { data } = useFetch(
		`https://www.breakingbadapi.com/api/characters/${counter}`
	);

	const { name, img, nickname } = !!data && data[0];

	const cardRef = useRef();

	const [boxSixe, setBoxSixe] = useState({});

	useLayoutEffect(() => {
		setBoxSixe(cardRef.current.getBoundingClientRect());
	}, [img]);

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>LayoutEffect</h1>
					<hr />

					<div className="row">
						<div className="row cards">
							<div className="card mb-3" ref={cardRef}>
								<img src={img} className="card-img-top" alt={name} />
								<div className="card-body text-center">
									<h5 className="card-title">{name}</h5>
									<p className="card-text">{nickname}</p>
									<button className="btn btn-success" onClick={increment}>
										Siguiente
									</button>
								</div>
							</div>
						</div>
					</div>

					<pre>{JSON.stringify(boxSixe, null, 3)}</pre>
				</div>
			</div>
		</>
	);
};
