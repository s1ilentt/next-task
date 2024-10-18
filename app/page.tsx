'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../components/Loading';

interface Make {
	MakeId: number;
	MakeName: string;
}

function FetchMakes() {
	const [makes, setMakes] = useState<Make[]>([]);
	const [selectedMake, setSelectedMake] = useState('');
	const [selectedYear, setSelectedYear] = useState('');

	useEffect(() => {
		// Fetch vehicle makes
		const fetchMakes = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_NHTSA_API_URL}/GetMakesForVehicleType/car?format=json`);
			const data = await response.json();
			setMakes(data.Results);
		};
		fetchMakes();
	}, []);

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (currentYear - i).toString());

	// Enable the Next button only when a make and year are selected
	const isNextEnabled = selectedMake && selectedYear;

	return (
		<div className="flex items-start justify-center min-h-screen bg-gray-1000">
			<div className="bg-white shadow-lg rounded-lg p-8 w-96 mt-36">
				<h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Vehicle Filter</h1>

				{/* Vehicle Makes Selector */}
				<label htmlFor="makes" className="block mb-2 text-gray-700">Select Vehicle Make:</label>
				<select
					id="makes"
					value={selectedMake}
					onChange={(e) => setSelectedMake(e.target.value)}
					className="border p-2 mb-4 w-full rounded hover:border-blue-500 cursor-pointer text-gray-800"
					style={{ zIndex: 10 }} // z-index to ensure dropdown visibility
				>
					<option value="">Select a make</option>
					{makes.map((make) => (
						<option key={make.MakeId} value={make.MakeId}>
							{make.MakeName}
						</option>
					))}
				</select>

				{/* Model Year Selector */}
				<label htmlFor="year" className="block mb-2 text-gray-700">Select Model Year:</label>
				<select
					id="year"
					value={selectedYear}
					onChange={(e) => setSelectedYear(e.target.value)}
					className="border p-2 mb-4 w-full rounded hover:border-blue-500 cursor-pointer text-gray-800"
				>
					<option value="">Select a year</option>
					{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				{/* Next Button */}
				<Link href={`/result/${selectedMake}/${selectedYear}`}>
					<button
						className={`bg-blue-500 text-white p-2 rounded w-full ${isNextEnabled ? 'hover:bg-blue-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
						disabled={!isNextEnabled}
					>
						Next
					</button>
				</Link>
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<Suspense fallback={<Loading />}>
			<FetchMakes />
		</Suspense>
	);
}
