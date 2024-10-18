'use client';

import React, { Suspense } from 'react';
import { ModelsList } from './ModelsList'; // Importing our component for loading models
import Loading from '../../../../components/Loading';

interface ResultPageProps {
	params: {
		makeId: string;
		year: string;
	};
}

const ResultPage = ({ params }: ResultPageProps) => {
	const { makeId, year } = params;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 p-8">
			<h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Vehicle Models</h1>

			{/* Wrapping the models loading component in Suspense */}
			<Suspense fallback={<Loading />}>
				<ModelsList makeId={makeId} year={year} />
			</Suspense>
		</div>
	);
};

export default ResultPage;
