import React from 'react';
import { useMoviesData } from '../hooks/useMoviesData';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Legend,
} from 'recharts';
import { colors } from '../constants/colors';

const OscarStatsByYearBarChart: React.FC = () => {
	const { movies } = useMoviesData();

	// Group nominations and wins by year
	const statsByYear = movies.reduce(
		(acc: Record<string, { nominations: number; wins: number }>, movie) => {
			if (!acc[movie.year]) {
				acc[movie.year] = { nominations: 0, wins: 0 };
			}
			acc[movie.year].nominations += movie.oscar_nominations;
			acc[movie.year].wins += movie.oscar_winning;
			return acc;
		},
		{}
	);
	console.log('🚀 ~ statsByYear:', statsByYear);

	// Convert grouped data into an array for Recharts
	const chartData = Object.keys(statsByYear).map((year) => ({
		year,
		nominations: statsByYear[year].nominations,
		wins: statsByYear[year].wins,
	}));

	return (
		<div className='mb-4 p-4 max-md:p-1 bg-white shadow-md rounded-md flex-1'>
			<h2 className='text-xl max-md:text-lg mb-4 font-medium'>Oscar Statistics by Year</h2>
			<ResponsiveContainer width='100%' height={400}>
				<BarChart margin={{ top: 20, right: 30, left: 0, bottom: 5 }} data={chartData}>
					<CartesianGrid strokeOpacity={0.2} />
					<XAxis dataKey='year' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='nominations' fill={colors.primary} name='Nominations' />
					<Bar dataKey='wins' fill={colors.secondary} name='Wins' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OscarStatsByYearBarChart;
