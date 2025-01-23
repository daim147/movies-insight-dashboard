import './App.css';
import OscarStatsByGenreBarChart from './components/OscarStatsByGenreBarChart';
import Loader from './components/Loader';
import MovieAttributesRadarChart from './components/MovieAttributesRadarChart';
import MovieDetailsPage from './components/MovieList';
import MovieRatingsAreaChart from './components/MovieRatingsAreaChart';
import MoviesByCountriesPieChart from './components/MoviesByCountriesPieChart';
import OscarStatsByYearBarChart from './components/OscarStatsByYearBarChart';
import OscarWinsLineChart from './components/OscarWinsLineChart';
import TopPerformers from './components/TopPerformers';
import { useMoviesData } from './hooks/useMoviesData';
import MoviesByLanguagesPieChart from './components/MoviesByLanguagesPieChart';

function App() {
	const movieData = useMoviesData();

	return (
		<>
			{movieData.loading ? (
				<Loader />
			) : (
				<main className='w-full'>
					<h1 className='text-3xl text-center text-primary p-6 shadow-md max-md:text-xl font-bold mb-4'>
						Movie Insights Dashboard
					</h1>
					<div className='p-8 max-lg:p-2'>
						<div className='w-full flex gap-5 max-lg:flex-col'>
							<section className='flex flex-col flex-1'>
								<OscarStatsByYearBarChart />
								<OscarStatsByGenreBarChart />
								<OscarWinsLineChart />
								<MovieRatingsAreaChart />
							</section>
							<aside className='flex-[0.4] max-lg:flex-1'>
								<MoviesByCountriesPieChart />
								<MoviesByLanguagesPieChart />
								<TopPerformers />
							</aside>
						</div>
						<MovieDetailsPage />
						<MovieAttributesRadarChart />
					</div>
				</main>
			)}
		</>
	);
}

export default App;
