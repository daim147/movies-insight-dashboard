import './App.css';
import CountryLanguageInsights from './components/CountyLanguageinsight';
import Loader from './components/Loader';
import MovieDetailsPage from './components/MovieList';
import NominationAndWin from './components/NominationAndWin';
import TopPerformers from './components/TopPerformers';
import { useMoviesData } from './hooks/useMoviesData';

function App() {
	const movieData = useMoviesData();

	return (
		<>
			{movieData.loading ? (
				<Loader />
			) : (
				<main className='flex gap-5 max-lg:flex-col'>
					<section className='flex-1'>
						<NominationAndWin />
						<MovieDetailsPage />
					</section>
					<aside className='flex-[0.4] max-lg:flex-1'>
						<CountryLanguageInsights />
						<TopPerformers />
					</aside>
				</main>
			)}
		</>
	);
}

export default App;
