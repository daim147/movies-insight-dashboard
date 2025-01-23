import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MovieProvider } from './context/MovieProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MovieProvider>
			<App />
		</MovieProvider>
	</StrictMode>
);
