import React from 'react';
import { useCounter } from '../../hooks/useCounter';
import { useFetch } from '../../hooks/useFetch';
import './styles.css';
export const MultipleCustomHooks = () => {
	const { counter, increment } = useCounter();

	const { loading, data } = useFetch(
		`https://www.breakingbadapi.com/api/characters/${counter}`
	);

	const { name, img, nickname } = !!data && data[0];

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded height">
					<h1>Breaking Bad Characters</h1>
					<hr />

					{loading ? (
						<div className="text-center">
							<div className="spinner-border text-success" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className="row">
							<div className="row cards">
								<div className="card mb-3">
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
					)}
				</div>
			</div>
		</>
	);
};
