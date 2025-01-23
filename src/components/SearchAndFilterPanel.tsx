import React, { useCallback, useState } from 'react';
import { Movie } from '../types';

interface SearchFilterPanelProps {
	movies: Movie[];
	onFilter: (filteredMovies: Movie[]) => void;
}

const SearchFilterPanel: React.FC<SearchFilterPanelProps> = ({ movies, onFilter }) => {
	const [searchText, setSearchText] = useState('');
	const [selectedGenre, setSelectedGenre] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string>('');
	const [minRating, setMinRating] = useState<number>(0);

	// Extract unique genres and years from movies
	const genres = Array.from(new Set(movies.flatMap((movie) => movie.genre)));
	const years = Array.from(new Set(movies.map((movie) => movie.year))).sort();

	// Handle filtering logic
	const handleFilter = () => {
		const filteredMovies = movies.filter((movie) => {
			const matchesSearch = movie.title.toLowerCase().includes(searchText.toLowerCase());
			const matchesGenre = selectedGenre ? movie.genre.includes(selectedGenre) : true;
			const matchesYear = selectedYear ? movie.year === selectedYear : true;
			const matchesRating = movie.imdb_rating >= minRating;

			return matchesSearch && matchesGenre && matchesYear && matchesRating;
		});

		onFilter(filteredMovies);
	};

	const clearFilters = useCallback(() => {
		setSearchText('');
		setSelectedGenre('');
		setSelectedYear('');
		setMinRating(0);
		onFilter(movies);
	}, [movies, onFilter]);

	return (
		<div className=' bg-white mb-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{/* Search Input */}
				<div>
					<label className='block text-gray-700 font-medium mb-2'>Search</label>
					<input
						type='text'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Search by title...'
					/>
				</div>

				{/* Genre Select */}
				<div>
					<label className='block text-gray-700 font-medium mb-2'>Genre</label>
					<select
						value={selectedGenre}
						onChange={(e) => setSelectedGenre(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option value=''>All Genres</option>
						{genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>

				{/* Year Select */}
				<div>
					<label className='block text-gray-700 font-medium mb-2'>Year</label>
					<select
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option value=''>All Years</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				{/* Minimum Rating Input */}
				<div>
					<label className='block text-gray-700 font-medium mb-2'>Minimum Rating</label>
					<input
						type='number'
						value={minRating}
						onChange={(e) => setMinRating(Number(e.target.value))}
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='0'
						min='0'
						max='10'
					/>
				</div>
			</div>

			{/* Buttons */}
			<div className='flex justify-end mt-6'>
				<button
					onClick={clearFilters}
					className=' bg-warning text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition-colors duration-300'
				>
					Clear
				</button>
				<button
					onClick={handleFilter}
					className=' bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'
				>
					Apply Filters
				</button>
			</div>
		</div>
	);
};

export default SearchFilterPanel;
