const Loader = () => {
	return (
		<div className='fixed inset-0 bg-white flex flex-col items-center justify-center z-50'>
			<div className='w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
			<p className='mt-4 text-primary font-semibold'>Loading...</p>
		</div>
	);
};

export default Loader;
