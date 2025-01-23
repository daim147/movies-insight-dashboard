import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useMoviesData } from '../hooks/useMoviesData';
import { colors } from '../constants/colors';

const GenreStatsChart: React.FC = () => {
	const { movies } = useMoviesData();
	// Aggregate nominations and wins by genre
	const genreStats = movies.reduce(
		(acc: Record<string, { nominations: number; wins: number }>, movie) => {
			movie.genre.forEach((g) => {
				if (!acc[g]) acc[g] = { nominations: 0, wins: 0 };
				acc[g].nominations += movie.oscar_nominations;
				acc[g].wins += movie.oscar_winning;
			});
			return acc;
		},
		{}
	);

	// Format the data for Recharts
	const data = Object.keys(genreStats).map((genre) => ({
		genre,
		nominations: genreStats[genre].nominations,
		wins: genreStats[genre].wins,
	}));

	return (
		<div className='p-4 max-md:p-1 bg-white shadow-md rounded-md flex-1'>
			<h2 className='text-xl max-md:text-lg font-medium mb-4'>Oscar Statistics by Genre</h2>
			<ResponsiveContainer width='100%' height={400}>
				<BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
					<CartesianGrid strokeOpacity={0.2} />
					<XAxis dataKey='genre' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar stroke='none' dataKey='nominations' fill={colors.primary} name='Nominations' />
					<Bar stroke='none' dataKey='wins' fill={colors.secondary} name='Wins' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GenreStatsChart;
