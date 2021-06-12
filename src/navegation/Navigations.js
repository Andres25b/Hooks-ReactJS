import React from 'react';
import { Link } from 'react-router-dom';

export const Navigations = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
			<div className="container">
				<Link className="navbar-brand" to="/">
					HooksApp
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useState
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/counterApp">
										counterApp
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/counterHookApp">
										counterApp with Hook
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useEffect
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/simpleForm">
										SimpleForm
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/formWithCustomHook">
										FormWithCustomHook
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								Examples
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/multipleCustomHooks">
										MultipleCustomHooks
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useRef
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/realExampleUseRef">
										RealExampleUseRef
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useLayoutEffect
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/layoutEffect">
										RealExampleUseRef
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								Memo
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/memorize">
										Memorize
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useMemo
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/memoHook">
										MemoHook
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								to=""
							>
								useCallback
							</Link>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<Link className="dropdown-item" to="/useCallback">
										useCallback
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
