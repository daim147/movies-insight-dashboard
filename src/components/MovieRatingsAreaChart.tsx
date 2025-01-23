import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { mockMoviesData } from '../constants/mockData';
import { colors } from '../constants/colors';

const MovieRatingsAreaChart: React.FC = () => {
	// Aggregate average ratings by year
	const ratingsByYear = mockMoviesData.reduce(
		(acc: Record<string, { total: number; count: number }>, movie) => {
			if (!acc[movie.year]) {
				acc[movie.year] = { total: 0, count: 0 };
			}
			acc[movie.year].total += movie.imdb_rating;
			acc[movie.year].count += 1;
			return acc;
		},
		{}
	);

	// Convert aggregated data into an array for Recharts
	const chartData = Object.keys(ratingsByYear).map((year) => ({
		year,
		rating: (ratingsByYear[year].total / ratingsByYear[year].count).toFixed(2),
	}));

	return (
		<div className='mb-4 p-4 max-md:p-1 bg-white shadow-md rounded-md flex-1'>
			<h2 className='text-xl max-md:text-lg mb-4 font-medium'>Average Movie Ratings by Year</h2>
			<ResponsiveContainer width='100%' height={400}>
				<AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
					<CartesianGrid strokeOpacity={0.2} />
					<XAxis dataKey='year' />
					<YAxis />
					<Tooltip />
					<Area type='monotone' dataKey='rating' stroke={colors.secondary} fill={colors.primary} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MovieRatingsAreaChart;
