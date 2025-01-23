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
		<div className='p-4 max-md:p-1 bg-white shadow-md rounded-lg'>
			{/* Search Input */}
			<div className='flex gap-4 max-md:p-1'>
				<div className='mb-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>Search by Title</label>
					<input
						type='text'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						placeholder='Enter movie title'
						className='w-full p-2 border rounded-md'
					/>
				</div>

				{/* Genre Filter */}
				<div className='mb-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>Filter by Genre</label>
					<select
						value={selectedGenre}
						onChange={(e) => setSelectedGenre(e.target.value)}
						className='w-full p-2 border rounded-md'
					>
						<option value=''>All Genres</option>
						{genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='flex gap-4'>
				{/* Year Filter */}
				<div className='mb-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>Filter by Year</label>
					<select
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className='w-full p-2 border rounded-md'
					>
						<option value=''>All Years</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				{/* IMDb Rating Filter */}
				<div className='mb-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Minimum IMDb Rating
					</label>
					<input
						type='number'
						value={minRating}
						onChange={(e) => setMinRating(Number(e.target.value))}
						placeholder='Enter minimum rating'
						min={0}
						max={10}
						step={0.1}
						className='w-full p-2 border rounded-md'
					/>
				</div>
			</div>
			{/* Apply Filters Button */}
			<div className='flex gap-4 mt-4'>
				<div className='flex-1 max-md:hidden'></div>
				<div className='flex gap-3 flex-1 justify-end'>
					<button
						onClick={clearFilters}
						className='w-[30%] max-lg:w-[50%] bg-warning font-medium text-white py-2 rounded-md hover:brightness-110'
					>
						Clear Filters
					</button>
					<button
						onClick={handleFilter}
						className='w-[30%] max-lg:w-[50%] bg-primary font-medium text-white py-2 rounded-md hover:brightness-110'
					>
						Apply Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchFilterPanel;
