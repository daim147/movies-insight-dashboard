import React from 'react';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { mockMoviesData } from '../constants/mockData';
import { colors } from '../constants/colors';

const MovieAttributesRadarChart: React.FC = () => {
	// Prepare data for the radar chart
	const chartData = mockMoviesData.map((movie) => ({
		title: movie.title,
		rating: movie.imdb_rating,
		nominations: movie.oscar_nominations,
		wins: movie.oscar_winning,
	}));

	return (
		<div className='max-lg:hidden p-4 max-md:p-1 bg-white shadow-md rounded-md flex-1'>
			<h2 className='text-xl max-md:text-lg mb-4 font-medium'>Movie Attributes Comparison</h2>
			<ResponsiveContainer width='100%' height={800}>
				<RadarChart cx='50%' cy='50%' outerRadius='80%' data={chartData}>
					<PolarGrid />
					<PolarAngleAxis dataKey='title' />
					<PolarRadiusAxis />
					<Tooltip />
					<Radar
						name='Rating'
						dataKey='rating'
						stroke={colors.primary}
						fill={colors.primary}
						fillOpacity={0.6}
					/>
					<Radar
						name='Nominations'
						dataKey='nominations'
						stroke={colors.secondary}
						fill={colors.secondary}
						fillOpacity={0.6}
					/>
					<Radar
						name='Wins'
						dataKey='wins'
						stroke={colors.tertiary}
						fill={colors.tertiary}
						fillOpacity={0.6}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MovieAttributesRadarChart;
