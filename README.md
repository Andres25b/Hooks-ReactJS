# Profundizando en Hooks

En este proyecto aprenderemos, a como utilizar los siguientes Hooks:

<ul>
    <li>useState</li>
    <li>useCounter - Personalizado</li>
    <li>useEffect  y sus precauciones</li>
    <li>useRef</li>
    <li>useFetch - Personalizado + optimizaciones</li>
    <li>useLayoutEffect</li>
    <li>Memo</li>
    <li>useMemo</li>
    <li>useCallback</li>
</ul>

# Indice

1. [useState](#id1)
2. [useCounter - Personalizado](#id2)
3. [useEffect y sus precauciones](#id3)
4. [useRef](#id4)
5. [useFetch - Personalizado + optimizaciones](#id5)
6. [useLayoutEffect](#id6)
7. [Memo](#id7)
8. [useMemo](#id8)
9. [useCallback](#id9)

<div id='id1' />

# useState

```javascript
const [state, setState] = useState(initialState);
```

"Devuelve un valor con estado y una función para actualizarlo.

Durante el renderizado inicial, el estado devuelto (state) es el mismo que el valor pasado como primer argumento (initialState).

La función setState se usa para actualizar el estado. Acepta un nuevo valor de estado y sitúa en la cola una nueva renderización del componente."[[1]](#1)

## Ejercicio **Counter**

- Componente **Counter.js**

```javascript
import React, { useState } from 'react';

export const CounterApp = () => {
	const [state, setState] = useState({
		counter1: 10,
		counter2: 20,
	});

	const { counter1, counter2 } = state;

	return (
		<>
			<div className="container">
				<div className="bg-light p-5 rounded">
					<h1>Counter1: {counter1}</h1>
					<h1>Counter2: {counter2}</h1>
					<hr />
					<button
						className="btn btn-outline-primary"
						onClick={() => {
							setState({
								...state,
								counter1: counter1 + 1,
							});
						}}
					>
						+1
					</button>
				</div>
			</div>
		</>
	);
};
```

<div id='id2' />

# useCounter - Personalizado

- Hook **useCounter.js**

```javascript
import { useState } from 'react';

export const useCounter = (initialState = 10) => {
	const [state, setState] = useState(initialState);

	const increment = (factor = 1) => {
		setState(state + factor);
	};

	const decrement = (factor = -1) => {
		setState(state - factor);
	};

	const reset = () => {
		setState(initialState);
	};

	return {
		increment,
		decrement,
		state,
		reset,
	};
};
```

- Componente **CounterWithCustomHook.js**

```javascript
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
```

<div id='id3' />

# useEffect y sus precauciones

```javascript
useEffect(() => {
	// Suscripción
	return () => {
		// Limpiar la suscripción
	};
}, [dependencias]);
```

"Acepta una función que contiene código imperativo, posiblemente código efectivo.

Las mutaciones, suscripciones, temporizadores, registro y otros efectos secundarios no están permitidos dentro del cuerpo principal de un componente de función (denominado como render phase de React). Si lo hace, dará lugar a errores confusos e inconsistencias en la interfaz de usuario.

En su lugar, use useEffect. La función pasada a useEffect se ejecutará después de que el renderizado es confirmado en la pantalla. Piense en los efectos como una escotilla de escape de React del mundo puramente funcional al mundo imperativo.

Por defecto, los efectos se ejecutan después de cada renderizado completado, pero puede elegir ejecutarlo solo cuando ciertos valores han cambiado." [[2]](#2)

## Ejercicio 1

- componente **Message.js**

```javascript
import React, { useEffect, useState } from 'react';

export const Message = () => {
	const [stateCoors, setStateCoors] = useState({ x: 0, y: 0 });
	const { x, y } = stateCoors;

	useEffect(() => {
		const mauseMove = (e) => {
			const coors = { x: e.x, y: e.y };
			setStateCoors(coors);
		};

		window.addEventListener('mousemove', mauseMove);

		return () => {
			window.removeEventListener('mousemove', mauseMove);
			console.log('mouseMove eliminado');
		};
	}, []);

	return (
		<>
			<div className="alert alert-success">
				Estas son las cordenadas de tu mause
			</div>
			<p>
				x: {x}, y: {y}
			</p>
		</>
	);
};
```

- Componente **SimpleForm.js**

```javascript
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
```

## Ejercicio 2

- hook **useForm.js**

```javascript
import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
	};

	return [values, handleInputChange, handleSubmit];
};
```

- hook **FormWithCustomHook.js**

```javascript
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
```

<div id='id4' />

# useRef

```javascript
const refContainer = useRef(initialValue);
```

"useRef devuelve un objeto ref mutable cuya propiedad .current se inicializa con el argumento pasado (initialValue). El objeto devuelto se mantendrá persistente durante la vida completa del componente.

Un caso de uso común es para acceder a un hijo imperativamente:"[[3]](#3)

```javascript
export const TextInputWithFocusButton = () => {
	const inputEl = useRef(null);
	const onButtonClick = () => {
		// `current` apunta al elemento de entrada de texto montado
		inputEl.current.focus();
	};
	return (
		<>
			<input ref={inputEl} type="text" />
			<button onClick={onButtonClick}>Focus the input</button>
		</>
	);
};
```

## Ejercicio

- Complemento del Hook **useFetch**

```javascript
import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
	const isMounted = useRef(true);

	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		setState({
			data: null,
			loading: true,
			error: null,
		});

		fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				if (isMounted.current) setState({ data, loading: false, error: null });
			});
	}, [url]);

	return state;
};
```

<div id='id5' />

# useFetch - Personalizado + optimizaciones

## Ejercicio

- Hook **useFetch.js**

```javascript
import { useEffect, useState } from 'react';

export const useFetch = (url) => {
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		setState({
			data: null,
			loading: true,
			error: null,
		});

		fetch(url)
			.then((resp) => resp.json())
			.then((data) => setState({ data, loading: false, error: null }));
	}, [url]);

	return state;
};
```

- Hook **useCounter.js**

```javascript
import { useState } from 'react';

export const useCounter = (initialState = 1) => {
	const [counter, setCounter] = useState(initialState);

	const increment = () => {
		setCounter(counter + 1);
	};

	const decrement = () => {
		setCounter(counter - 1);
	};

	const reset = () => {
		setCounter(initialState);
	};

	return {
		increment,
		decrement,
		counter,
		reset,
	};
};
```

- Hook **MultipleCustomHooks.js**

```javascript
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
				<div className="bg-light p-5 rounded">
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
```

<div id='id6' />

# useLayoutEffect

"La firma es idéntica a useEffect, pero se dispara de forma síncrona después de todas las mutaciones de DOM. Use esto para leer el diseño del DOM y volver a renderizar de forma sincrónica. Las actualizaciones programadas dentro de useLayoutEffect se vaciarán sincrónicamente, antes de que el navegador tenga la oportunidad de pintar.

Prefiera el useEffect estándar cuando sea posible para evitar el bloqueo de actualizaciones visuales."[[4]](#4)

- Componente **LayoutEffect.js**

```javascript
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
```

<div id='id7' />

# Memo

"Si el componente renderiza el mismo resultado dadas las mismas props, se puede envolver en una llamada a React.memo para una mejora en el desempeño en algunos casos memoizando el resultado. Esto significa que React omitirá renderizar el componente y reusará el último resultado renderizado."[[5]](#5)

## Ejercicio

- componente **Small.js**

```javascript
import React, { memo } from 'react';

export const Small = memo(({ value }) => {
	console.log('Me volví a llamar :(');

	return (
		<>
			<small>{value}</small>
		</>
	);
});
```

- componente **Memorize.js**

```javascript
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
```

<div id='id8' />

# useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

"Devuelve un valor memorizado.

Pasa una función de “crear” y un arreglo de dependencias. useMemo solo volverá a calcular el valor memorizado cuando una de las dependencias haya cambiado. Esta optimización ayuda a evitar cálculos costosos en cada render.

Recuerde que la función pasada a useMemo se ejecuta durante el renderizado. No hagas nada allí que normalmente no harías al renderizar. Por ejemplo, los efectos secundarios pertenecen a useEffect, no auseMemo.

Si no se proporciona un arreglo, se calculará un nuevo valor en cada renderizado.

Puede confiar en useMemo como una optimización del rendimiento, no como una garantía semántica. En el futuro, React puede elegir “olvidar” algunos valores previamente memorizados y recalcularlos en el próximo renderizado, por ejemplo para liberar memoria para componentes fuera de pantalla. Escribe tu código para que aún funcione sin useMemo - y luego agrégalo para optimizar el rendimiento."[[6]](#6)

## Ejercicio

- Componente **MemoHook.js**

```javascript
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
```

<div id='id9' />

# useCallback

```javascript
const memoizedCallback = useCallback(() => {
	doSomething(a, b);
}, [a, b]);
```

"Devuelve un callback memorizado.

Pasa un callback en línea y un arreglo de dependencias. useCallback devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado. Esto es útil cuando se transfieren callbacks a componentes hijos optimizados que dependen de la igualdad de referencia para evitar renders innecesarias (por ejemplo, shouldComponentUpdate).

useCallback(fn, deps) es igual a useMemo(() => fn, deps)."[[7]](#7)

## Ejercicio

- Componente **ShowIncrement.js**

```javascript
import React, { memo } from 'react';

export const ShowIncrement = memo(({ increment }) => {
	console.log('Me volvi a ejecutar :(');

	return (
		<>
			<button className="btn btn-outline-success" onClick={() => increment()}>
				Incrementar
			</button>
		</>
	);
});
```

- Componente **CallbackHook.js**

```javascript
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
```

# Bibliografía

<a id="1">[1]</a>
Facebook Open Source.(2021).
Referencia de la API de los Hooks.
Recuperado 9 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#usestate

<a id="2">[2]</a>
Facebook Open Source.(2021).
Referencia de la API de los Hooks.
Recuperado 10 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#useeffect

<a id="3">[3]</a>
Facebook Open Source.(2021).
Referencia de la API de los Hooks.
Recuperado 10 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#useref

<a id="4">[4]</a>
Facebook Open Source.(2021).
Referencia de la API de los Hooks.
Recuperado 10 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#uselayouteffect

<a id="5">[5]</a>
Facebook Open Source.(2021).
API de Alto Nivel de React
Recuperado 10 de Junio de 2021, de https://es.reactjs.org/docs/react-api.html

<a id="6">[6]</a>
Facebook Open Source.(2021).
API de Alto Nivel de React
Recuperado 12 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#usememo

<a id="7">[7]</a>
Facebook Open Source.(2021).
API de Alto Nivel de React
Recuperado 12 de Junio de 2021, de https://es.reactjs.org/docs/hooks-reference.html#usecallback
