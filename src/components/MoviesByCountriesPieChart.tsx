import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMoviesData } from '../hooks/useMoviesData';
import { colors } from '../constants/colors';

const COLORS = Object.values(colors);
const MoviesByCountriesPieChart: React.FC = () => {
	const { movies } = useMoviesData();

	// Aggregating data for countries
	const countryMap: Record<string, number> = {};
	movies.forEach((movie) => {
		movie.country.forEach((country) => {
			if (!countryMap[country]) {
				countryMap[country] = 0;
			}
			countryMap[country] += 1;
		});
	});

	// Converting data for charts
	const countryData = Object.entries(countryMap).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<div className='mb-4 p-4 max-md:p-1 shadow-md rounded-md w-full'>
			<h3 className='text-xl max-md:text-lg font-medium mb-4'>Movies by Country</h3>
			<ResponsiveContainer width='100%' height={400}>
				<PieChart>
					<Pie
						data={countryData}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						outerRadius={100}
						fill='#8884d8'
					>
						{countryData.map((_, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MoviesByCountriesPieChart;
