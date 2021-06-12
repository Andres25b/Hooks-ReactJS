import React from 'react';
import { useForm } from '../../hooks/useForm';

export const FormWithCustomHook = () => {
	const [formValues, handleInputChange, handleSubmit] = useForm({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formValues;

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>FormWithCustomHook</h1>
					<hr />

					<form action="" onSubmit={handleSubmit}>
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
						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input
								type="password"
								name="password"
								placeholder="******"
								autoComplete="off"
								value={password}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>

						<button type="submit" className="btn btn-success">
							Enviar
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
