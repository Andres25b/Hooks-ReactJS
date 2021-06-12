import React, { useState } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
	});

	const { name, email } = formState;

	const handleInputChange = ({ target }) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
	};

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>SimpleForm</h1>
					<hr />

					<form action="">
						<div className="mb-3">
							<label className="form-label">Nombre</label>
							<input
								type="text"
								name="name"
								placeholder="Enter your name"
								autoComplete="off"
								value={name}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Correo</label>
							<input
								type="email"
								name="email"
								placeholder="Enter your email"
								autoComplete="off"
								value={email}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
					</form>

					{name === 'Andres' && <Message />}
				</div>
			</div>
		</>
	);
};
