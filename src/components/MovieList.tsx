import { useCallback, useState } from 'react';
import { Movie } from '../types';
import { useMoviesData } from '../hooks/useMoviesData';
import MovieDetailsCard from './MovieDetailsCard';
import SearchFilterPanel from './SearchAndFilterPanel';
import { colors } from '../constants/colors';

const MovieDetailsPage: React.FC = () => {
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const { movies } = useMoviesData();
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

	const handleFilter = useCallback((filterData: Movie[]) => {
		if (filterData.length > 0) {
			setFilteredMovies(filterData);
		} else {
			setFilteredMovies([]);
		}
	}, []);

	return (
		<div className='mt-6 mb-6 w-full'>
			<div className='mb-4'>
				<h1 className='text-2xl max-md:text-xl  font-bold mb-4'>All Movies</h1>
				<SearchFilterPanel movies={movies} onFilter={handleFilter} />
				<div className='flex max-md:flex-col gap-4 flex-wrap mt-4'>
					{filteredMovies.map((movie) => (
						<div
							key={movie.title}
							onClick={() => setSelectedMovie(movie)}
							className='p-2 pt-3 pb-3 shadow-md rounded cursor-pointer hover:bg-gray-100 '
						>
							<h3 className='text-lg text-medium'>{movie.title}</h3>
							<div className='flex items-center text-gray-600  mb-2 mt-1 text-sm'>
								<span className='mr-4'>Year: {movie.year}</span>
								<span>Rating: ⭐ {movie.imdb_rating}</span>
							</div>
							<div>
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
