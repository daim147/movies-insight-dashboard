import React from 'react';
import { Movie } from '../types';

interface MovieDetailsCardProps {
	movie: Movie | null;
}

const MovieDetailsCard: React.FC<MovieDetailsCardProps> = ({ movie }) => {
	if (!movie) {
		return (
			<div className='p-4 max-md:p-1 bg-gray-100 rounded-md text-center'>
				<p className='text-gray-500'>Select a movie to view details.</p>
			</div>
		);
	}

	return (
		<div className='p-6 max-md:p-4 bg-white shadow-lg rounded-lg flex-[0.4] max-h-max max-lg:flex-1'>
			{/* Movie Details */}
			<div className=''>
				{/* Movie Title */}
				<h2 className='text-3xl max-md:text-2xl font-bold mb-2'>{movie.title}</h2>

				{/* Year and IMDb Rating */}
				<div className='flex items-center text-gray-600 text-sm mb-4'>
					<span className='mr-4'>Year: {movie.year}</span>
					<span>IMDb Rating: ⭐ {movie.imdb_rating}</span>
				</div>

				{/* Genre */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Genre</h3>
					<p className='text-gray-700'>{movie.genre.join(', ')}</p>
				</div>

				{/* Country */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Country</h3>
					<p className='text-gray-700'>{movie.country.join(', ')}</p>
				</div>

				{/* Cast */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Cast</h3>
					<p className='text-gray-700'>{movie.cast.join(', ')}</p>
				</div>

				{/* Languages */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Languages</h3>
					<p className='text-gray-700'>{movie.language.join(', ')}</p>
				</div>

				{/* Oscars */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Oscar Nominations</h3>
					<p className='text-gray-700'>{movie.oscar_nominations}</p>

					<h3 className='text-lg font-medium mt-2'>Oscar Wins</h3>
					<p className='text-gray-700'>{movie.oscar_winning}</p>
				</div>

				{/* Oscar Nominations and Wins Lists */}
				<div className='mb-4'>
					<h3 className='text-lg font-medium'>Oscar Nominations List</h3>
					<ul className='list-disc list-inside text-gray-700'>
						{movie.oscar_nominations_list.map((nomination, index) => (
							<li key={index}>{nomination}</li>
						))}
					</ul>

					<h3 className='text-lg font-medium mt-2'>Oscar Wins List</h3>
					<ul className='list-disc list-inside text-gray-700'>
						{movie.oscar_winning_list.map((win, index) => (
							<li key={index}>{win}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsCard;
