import React from 'react';
import { useMoviesData } from '../hooks/useMoviesData';

const TopPerformers: React.FC = () => {
	const { movies } = useMoviesData();

	// Top Movies by Oscar Wins
	const topMovies = movies.sort((a, b) => b.oscar_winning - a.oscar_winning).slice(0, 5);

	// Actor Movies with Oscars Map
	const actorMoviesMap: Record<string, number> = {};

	movies.forEach((movie) => {
		if (movie.oscar_winning > 0) {
			// Increment the count for each actor in a movie that won Oscars
			movie.cast.forEach((actor) => {
				if (!actorMoviesMap[actor]) {
					actorMoviesMap[actor] = 0;
				}
				actorMoviesMap[actor] += 1;
			});
		}
	});

	// Top Actors based on Oscar-winning movies count
	const topActors = Object.entries(actorMoviesMap)
		.sort(([, aCount], [, bCount]) => bCount - aCount)
		.slice(0, 5);

	return (
		<div className='mt-8'>
			<h2 className='text-2xl max-md:text-xl  font-bold mb-4'>Leaderboard Top Performers</h2>
			<div className='p-4 max-md:p-1 bg-white shadow-md rounded-md'>
				{/* Top Movies */}
				<div className='mb-6'>
					<h3 className='text-xl max-md:text-lg font-semibold mb-4'>Top Movies by Oscar Wins</h3>
					<ol className='list-decimal pl-6'>
						{topMovies.map((movie) => (
							<li key={movie.title} className='mt-4'>
								<span className='text-lg font-medium'>{movie.title}</span> - {movie.oscar_winning}{' '}
								Oscars
							</li>
						))}
					</ol>
				</div>

				{/* Top Actors */}
				<div>
					<h3 className='text-xl max-md:text-lg font-semibold mb-4'>
						Top Actors by Oscar-Winning Movies
					</h3>
					<ol className='list-decimal pl-6'>
						{topActors.map(([actor, count]) => (
							<li key={actor} className='mt-4'>
								<span className='text-lg font-medium'>{actor}</span> - {count} Oscars
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default TopPerformers;
