import { useCallback, useState } from 'react';
import { Movie } from '../types';
import { useMoviesData } from '../hooks/useMoviesData';
import MovieDetailsCard from './MovieDetailsCard';
import SearchFilterPanel from './SearchAndFilterPanel';
import { colors } from '../constants/colors';

const MovieDetailsPage: React.FC = () => {
	const { movies } = useMoviesData();
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(movies[1]);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

	const handleFilter = useCallback((filterData: Movie[]) => {
		if (filterData.length > 0) {
			setFilteredMovies(filterData);
		} else {
			setFilteredMovies([]);
		}
	}, []);

	return (
		<div className='mb-4 flex gap-5 max-lg:flex-col'>
			<div className='p-6 bg-white shadow-md rounded-md flex-1'>
				<h2 className='text-2xl max-md:text-xl font-bold mb-6'>Movie List</h2>
				<SearchFilterPanel movies={movies} onFilter={handleFilter} />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-4'>
					{filteredMovies.map((movie) => (
						<div
							key={movie.title}
							onClick={() => setSelectedMovie(movie)}
							className='cursor-pointer p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300'
						>
							<h3 className='text-xl font-semibold mb-2'>{movie.title}</h3>
							<p className='text-gray-600 mb-2'>Release Year: {movie.year}</p>
							<p className='text-gray-600 mb-2'>Rating: {movie.imdb_rating}</p>
							<p className='text-gray-600 mb-2'>Oscar Wins: {movie.oscar_winning}</p>
							<div className='flex flex-wrap gap-2 mt-4'>
								{movie.genre.map((genre, index) => (
									<span
										key={genre}
										style={{ backgroundColor: Object.values(colors)[index] }}
										className={`mr-1 p-1 text-white rounded-sm text-sm`}
									>
										{genre}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<MovieDetailsCard movie={selectedMovie} />
		</div>
	);
};
export default MovieDetailsPage;
