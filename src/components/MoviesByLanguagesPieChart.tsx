import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMoviesData } from '../hooks/useMoviesData';
import { colors } from '../constants/colors';

const COLORS = Object.values(colors);
const MoviesByLanguagesPieChart: React.FC = () => {
	const { movies } = useMoviesData();

	// Aggregating data for languages
	const languageMap: Record<string, number> = {};
	movies.forEach((movie) => {
		movie.language.forEach((language) => {
			if (!languageMap[language]) {
				languageMap[language] = 0;
			}
			languageMap[language] += 1;
		});
	});

	const languageData = Object.entries(languageMap).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<div className='mb-4 shadow-md p-4 max-md:p-1 rounded-md w-full'>
			<h3 className='text-xl max-md:text-lg font-medium mb-4'>Movies by Language</h3>
			<ResponsiveContainer width='100%' height={400}>
				<PieChart>
					<Pie
						data={languageData}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						outerRadius={100}
						fill='#82ca9d'
					>
						{languageData.map((_, index) => (
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

export default MoviesByLanguagesPieChart;
