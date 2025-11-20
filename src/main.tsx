import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeProvider } from './theme/ColorModeProvider';

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ColorModeProvider>
			<App />
		</ColorModeProvider>
	</React.StrictMode>
);

