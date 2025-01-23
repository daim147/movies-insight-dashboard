import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { MovieContextData } from '../types';

export const useMoviesData = (): MovieContextData => {
	const context = useContext(MovieContext);
	if (context === undefined) {
		throw new Error('useMovieData must be used within a MovieProvider');
	}
	return context;
};
