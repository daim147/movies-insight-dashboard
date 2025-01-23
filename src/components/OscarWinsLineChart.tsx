import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { mockMoviesData } from '../constants/mockData';
import { colors } from '../constants/colors';

const OscarWinsLineChart: React.FC = () => {
	// Aggregate Oscar wins by year
	const winsByYear = mockMoviesData.reduce((acc: Record<string, number>, movie) => {
		if (!acc[movie.year]) {
			acc[movie.year] = 0;
		}
		acc[movie.year] += movie.oscar_winning;
		return acc;
	}, {});

	// Convert aggregated data into an array for Recharts
	const chartData = Object.keys(winsByYear).map((year) => ({
		year,
		wins: winsByYear[year],
	}));

	return (
		<div className='mb-4 p-4 max-md:p-1 bg-white shadow-md rounded-md flex-1'>
			<h2 className='text-xl max-md:text-lg mb-4 font-medium'>Oscar Wins by Year</h2>
			<ResponsiveContainer width='100%' height={400}>
				<LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
					<CartesianGrid strokeOpacity={0.2} />
					<XAxis dataKey='year' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type='monotone' dataKey='wins' stroke={colors.primary} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OscarWinsLineChart;
