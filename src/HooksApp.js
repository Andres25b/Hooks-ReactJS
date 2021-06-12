import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navigations } from './navegation/Navigations';
import { CounterApp } from './components/01-useState/CounterApp';
import { VentanaInicial } from './components/VentanaInicial';
import { CounterWithCustomHook } from './components/01-useState/CounterWithCustomHook';
import { SimpleForm } from './components/02-useEffect/SimpleForm';
import { FormWithCustomHook } from './components/02-useEffect/FormWithCustomHook';
import { MultipleCustomHooks } from './components/03-examples/MultipleCustomHooks';
import { RealExampleUseRef } from './components/04-useRef/RealExampleUseRef';
import { LayoutEffect } from './components/05-useLayoutEffect/LayoutEffect';
import { Memorize } from './components/06-memos/Memorize';
import { MemoHook } from './components/06-memos/MemoHook';
import { CallbackHook } from './components/06-memos/CallbackHook';

export const HooksApp = () => {
	return (
		<Router>
			<Navigations />
			<Route exact path="/" component={VentanaInicial} />
			<Route path="/counterApp" component={CounterApp} />
			<Route path="/counterHookApp" component={CounterWithCustomHook} />
			<Route path="/simpleForm" component={SimpleForm} />
			<Route path="/formWithCustomHook" component={FormWithCustomHook} />
			<Route path="/multipleCustomHooks" component={MultipleCustomHooks} />
			<Route path="/realExampleUseRef" component={RealExampleUseRef} />
			<Route path="/layoutEffect" component={LayoutEffect} />
			<Route path="/memorize" component={Memorize} />
			<Route path="/memoHook" component={MemoHook} />
			<Route path="/useCallback" component={CallbackHook} />
		</Router>
	);
};
