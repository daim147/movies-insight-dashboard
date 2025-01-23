import OscarStatsChart from './OscarStatsChart';
import GenreStatsChart from './GenreStatsChart';

const NominationAndWin = () => {
	return (
		<div className='w-full'>
			<h1 className='text-2xl max-md:text-xl  font-bold mb-4'>Nomination and Win Overview</h1>
			<div className='flex flex-col gap-4 flex-wrap w-full'>
				<OscarStatsChart />
				<GenreStatsChart />
			</div>
		</div>
	);
};

export default NominationAndWin;
