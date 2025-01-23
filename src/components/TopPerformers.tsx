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
		<div className='mb-4 p-6 bg-white shadow-md rounded-md'>
			<h2 className='text-2xl max-md:text-xl font-bold mb-6'>Leaderboard Top Performers</h2>
			<div className='grid grid-cols-1  gap-8'>
				<div>
					<h3 className='text-xl font-semibold mb-4'>Top Movies by Oscar Wins</h3>
					<ul className='space-y-4'>
						{topMovies.map((movie) => (
							<li key={movie.title} className='flex items-center space-x-4'>
								<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-700'>
									{movie.oscar_winning}
								</div>
								<div>
									<h4 className='text-lg font-medium'>{movie.title}</h4>
									<p className='text-gray-500'>{movie.year}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className='text-xl font-semibold mb-4'>Top Actors by Oscar-winning Movies</h3>
					<ul className='space-y-4'>
						{topActors.map(([actor, count]) => (
							<li key={actor} className='flex items-center space-x-4'>
								<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-700'>
									{count}
								</div>
								<div>
									<h4 className='text-lg font-medium'>{actor}</h4>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TopPerformers;
