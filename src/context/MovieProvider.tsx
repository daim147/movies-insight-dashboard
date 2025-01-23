import React, { ReactNode, useEffect, useState } from 'react';
import { Movie } from '../types';
import { MovieContext } from './MovieContext';
import { mockMoviesData } from '../constants/mockData';

interface MovieDataProps {
	children: ReactNode;
}

// Create the provider component
export const MovieProvider: React.FC<MovieDataProps> = ({ children }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch('/api/guK8Sdo');
				if (!response.ok) {
					throw new Error('Failed to fetch movies');
				}
				const data = await response.json();
				const uniqueMovies = Array.from(
					new Map(
						data.map((movie: Movie) => [movie.title, movie]) // Use a Map to remove duplicates by title
					).values()
				);
				setMovies(uniqueMovies as Movie[]);
			} catch (err) {
				//todo fix this
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(String(err));
				}
				console.log('🚀 ~ fetchMovies ~ mockMoviesData:', mockMoviesData);
				setMovies(mockMoviesData);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	return (
		<MovieContext.Provider value={{ movies, loading, error }}>{children}</MovieContext.Provider>
	);
};
