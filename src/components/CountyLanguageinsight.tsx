import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMoviesData } from '../hooks/useMoviesData';
import { colors } from '../constants/colors';

const COLORS = Object.values(colors);
const CountryLanguageInsights: React.FC = () => {
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

	// Converting data for charts
	const countryData = Object.entries(countryMap).map(([name, value]) => ({
		name,
		value,
	}));
	const languageData = Object.entries(languageMap).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<div className='w-full'>
			<h2 className='text-2xl max-md:text-xl font-bold mb-4'>Country and Language Insights</h2>
			{/* Country Pie Chart */}
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

			{/* Language Pie Chart */}
			<div className=' shadow-md p-4 max-md:p-1 rounded-md w-full'>
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
		</div>
	);
};

export default CountryLanguageInsights;
