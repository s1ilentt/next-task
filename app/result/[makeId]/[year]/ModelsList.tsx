import React, { useState, useEffect } from 'react';

interface VehicleModel {
	Model_ID: string;
	Model_Name: string;
}

async function fetchModels(makeId: string, year: string): Promise<VehicleModel[]> {
	const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
	if (!response.ok) throw new Error('Failed to fetch vehicle models');
	const data = await response.json();
	return data.Results || [];
}

interface ModelsListProps {
	makeId: string;
	year: string;
}

export function ModelsList({ makeId, year }: ModelsListProps) {
	const [models, setModels] = useState<VehicleModel[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getModels = async () => {
			try {
				const data = await fetchModels(makeId, year);
				setModels(data);
			} catch (err) {
				setError('Failed to load models.');
			}
		};
		getModels();
	}, [makeId, year]);

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	if (models.length === 0) {
		return <p className="text-gray-600 text-center">No models available for the selected make and year.</p>;
	}

	return (
		<ul className="list-none w-full">
			{models.map((model, index) => (
				<li key={`${model.Model_ID}-${model.Model_Name}-${index}`} className="bg-gray-800 text-white border border-gray-700 rounded p-4 mb-2 shadow hover:shadow-md transition-shadow duration-200">
					{model.Model_Name}
				</li>
			))}
		</ul>
	);
}
