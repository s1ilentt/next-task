export async function generateStaticParams() {
	const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
	const data = await response.json();
	const makes = data.Results;

	const years = Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => new Date().getFullYear() - i);

	return makes.flatMap(make =>
		years.map(year => ({
			makeId: make.MakeId.toString(),
			year: year.toString(),
		}))
	);
}

import React, { Suspense } from 'react';
import ResultPage from './ResultPage'; // Importing the ResultPage component
import Loading from '../../../../components/Loading'; // Importing the loading component

interface PageProps {
	params: {
		makeId: string;
		year: string;
	};
}

const Page = ({ params }: PageProps) => {
	return (
		<Suspense fallback={<Loading />}>
			<ResultPage params={params} />
		</Suspense>
	);
};

export default Page;
